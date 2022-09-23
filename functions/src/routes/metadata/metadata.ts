import * as functions from 'firebase-functions';
import * as firebase from 'firebase-admin';
import cors from 'cors';

import { output_contract_csv, output_csv, output_rarity_report_csv } from './csv';
import { compute_asset_hash, output_provenance_hash } from './hash';
import { generate_metadata } from './metadata/metadata';
import { ARTIFACTS, nft_storage } from './nft';
import { calculate_stats } from './utils/stats';
import { saveFile } from './utils';

const inputHtml = (images: any) => `
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Preview page</title>
    <style>
        body,
        html {
            padding: 0;
            margin: 0;
            text-align: center;
        }

        a.lightbox img {
            height: 350px;
            border: 3px solid white;
            box-shadow: 0px 0px 8px rgba(0, 0, 0, .3);
            margin: 94px 20px 20px 20px;
        }

        .lightbox-target {
            position: fixed;
            top: -100%;
            width: 100%;
            background: rgba(0, 0, 0, .7);
            width: 100%;
            opacity: 0;
            -webkit-transition: opacity .5s ease-in-out;
            -moz-transition: opacity .5s ease-in-out;
            -o-transition: opacity .5s ease-in-out;
            transition: opacity .5s ease-in-out;
            overflow: hidden;

        }

        .lightbox-target img {
            margin: auto;
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            max-height: 0%;
            max-width: 0%;
            border: 3px solid white;
            box-shadow: 0px 0px 8px rgba(0, 0, 0, .3);
            box-sizing: border-box;
            -webkit-transition: .5s ease-in-out;
            -moz-transition: .5s ease-in-out;
            -o-transition: .5s ease-in-out;
            transition: .5s ease-in-out;

        }

        a.lightbox-close {
            display: block;
            width: 50px;
            height: 50px;
            box-sizing: border-box;
            background: white;
            color: black;
            text-decoration: none;
            position: absolute;
            top: -80px;
            right: 0;
            -webkit-transition: .5s ease-in-out;
            -moz-transition: .5s ease-in-out;
            -o-transition: .5s ease-in-out;
            transition: .5s ease-in-out;
        }

        a.lightbox-close:before {
            content: "";
            display: block;
            height: 30px;
            width: 1px;
            background: black;
            position: absolute;
            left: 26px;
            top: 10px;
            -webkit-transform: rotate(45deg);
            -moz-transform: rotate(45deg);
            -o-transform: rotate(45deg);
            transform: rotate(45deg);
        }

        a.lightbox-close:after {
            content: "";
            display: block;
            height: 30px;
            width: 1px;
            background: black;
            position: absolute;
            left: 26px;
            top: 10px;
            -webkit-transform: rotate(-45deg);
            -moz-transform: rotate(-45deg);
            -o-transform: rotate(-45deg);
            transform: rotate(-45deg);
        }

        .lightbox-target:target {
            opacity: 1;
            top: 0;
            bottom: 0;
            overflow: scroll;
        }

        .lightbox-target:target img {
            max-height: 100%;
            max-width: 100%;
        }

        .lightbox-target:target a.lightbox-close {
            top: 0;
        }
    </style>
</head>

<body id="main">
    <script>
        const images = ${JSON.stringify(images)};

        const container = document.getElementById('container');
        const main = document.getElementById('main');

        for (const key in images) {
            if (Object.hasOwnProperty.call(images, key)) {
                const element = images[key];

                const lightbox = document.createElement('a');
                lightbox.classList.add('lightbox');

                const lightbox_target = document.createElement('div');
                lightbox_target.classList.add('lightbox-target');

                const lightbox_img = document.createElement('img');
                const lightbox_a = document.createElement('a');
                lightbox_a.classList.add('lightbox-close');
                lightbox_a.href = '#';

                const image = document.createElement('img');

                lightbox.href = "#" + key;
                image.src = 'https://ipfs.io/ipfs/' + element.thumbnailUri;
                lightbox.append(image);

                lightbox_target.id = key;
                lightbox_img.src = 'https://ipfs.io/ipfs/' + element.displayUri;
                lightbox_target.append(lightbox_img);
                lightbox_target.append(lightbox_a);

                main.append(lightbox);

                main.append(lightbox_target);
            }
        }
    </script>
</body>

</html>
`;

export const metadataFunc = (request: functions.Request, response: functions.Response) => {
	cors({ origin: true })(request, response, async () => {
		const { account, projectID, buildName } = request.body;

		const configSnapshot = await firebase
			.database()
			.ref(`users/${account}/projects/${projectID}`)
			.get();

		const config: any = configSnapshot.toJSON();
		nft_storage.set_config(config.config);

		const assetsSnapshot = await firebase
			.database()
			.ref(`users/${account}/projects/${projectID}/builds/${buildName}/assets`)
			.get();

		//@ts-ignore
		let assets: any = Object.values(assetsSnapshot.toJSON());

		assets = await compute_asset_hash(assets, config.config);

		if (config.config.upload_images_to_ipfs) {
			assets = await nft_storage.upload_artifacts(ARTIFACTS.IMAGES, assets);
		}

		for (const asset of assets) {
			await generate_metadata(asset, config.config);
			await output_csv(
				assets,
				Object.values(asset.traits)
					.filter((trait: any) => {
						if (config.config.excluded_layers_from_metadata) {
							return config.config.excluded_layers_from_metadata.indexOf(trait.trait_type) === -1;
						}
						return false;
					})
					.map((trait: any) => trait.trait_type),
				buildName,
				config.config
			);
		}

		if (config.config.upload_metadata_to_ipfs) {
			assets = await nft_storage.upload_artifacts(ARTIFACTS.METADATA, assets);
		}

		assets = calculate_stats(assets);

		const path = `${config.config.output_folder}/${buildName}/${config.config.name}.contract.csv`;
		await output_contract_csv(assets, path, config.config);
		const rarity_path = `${config.config.output_folder}/${buildName}/${config.config.name}.rarity.csv`;
		await output_rarity_report_csv(
			assets,
			assets.map(
				(asset: any) => Object.values(asset.traits).map((trait: any) => trait.trait_type)[0]
			),
			rarity_path
		);

		await output_provenance_hash(assets);

		const images: any = {};

		for (let index = 0; index < assets.length; index++) {
			const element: any = assets[index];
			images[element.base_name] = {
				displayUri: element.image_url.replace('ipfs://', ''),
				thumbnailUri: element.thumb_url.replace('ipfs://', '')
			};
		}

		await firebase
			.database()
			.ref(`users/${account}/projects/${projectID}/builds/${buildName}/assets`)
			.set(assets);

		await saveFile(
			`v1/${account}/projects/${projectID}/build/${buildName}/index.html`,
			inputHtml(images)
		);

		const r = await nft_storage.upload_file(
			`v1/${account}/projects/${projectID}/build/${buildName}/index.html`
		);
		response.json(r);
	});
};
