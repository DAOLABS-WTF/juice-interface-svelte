import sharp from 'sharp';
import sizeOf from 'image-size';
import * as firebase from 'firebase-admin';

import { IAsset } from '../interfaces/IAsset';
import { ITrait } from '../interfaces/ITrait';

async function check_image_dimensions(background_path: string, input_path: string) {
	const [input] = await firebase.storage().bucket().file(input_path).download();

	const backgroundImage = await firebase.storage().bucket().file(background_path).download();

	const input_dimensions = sizeOf(input);
	const background_dimensions = sizeOf(backgroundImage[0]);

	if (
		input_dimensions.width &&
		input_dimensions.height &&
		background_dimensions.width &&
		background_dimensions.height
	) {
		if (
			input_dimensions.width > background_dimensions.width ||
			input_dimensions.height > background_dimensions.height
		) {
			const data = await sharp(input)
				.resize(background_dimensions.width, background_dimensions.height, {
					fit: 'contain'
				})
				.toBuffer();
			return data;
		} else {
			return input;
		}
	}
	return input;
}

async function get_static_image_inputs(
	traits: ITrait[],
	background_path: string,
	trait_dir: string
) {
	return Promise.all(
		traits.map(async ({ trait_type, value }: ITrait) => {
			const input_path = `${trait_dir}/${trait_type}/${value}`;
			const input = await check_image_dimensions(background_path, input_path);
			return {
				input,
				gravity: 'southeast'
			};
		})
	);
}

export async function generate_static_images(asset: IAsset): Promise<IAsset> {
	const { traits, trait_dir } = asset;
	const background_path = `${asset.trait_dir}/${asset.traits[0].trait_type}/${asset.traits[0].value}`;

	const [background] = await firebase.storage().bucket().file(background_path).download();

	const inputs = await get_static_image_inputs(traits, background_path, trait_dir);

	try {
		const savePath = `${asset.output_folder}/original/${asset.base_name}.png`;
		const buffer = await sharp(background)
			.composite(inputs)
			.sharpen()
			.withMetadata()
			.png({ quality: 90 })
			.toBuffer();

		await firebase.storage().bucket().file(savePath).save(buffer);

		return asset;
	} catch (e: any) {
		throw new Error(e);
	}
}
