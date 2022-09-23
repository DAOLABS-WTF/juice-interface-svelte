import sharp from 'sharp';
import * as firebase from 'firebase-admin';
import { IAsset } from '../interfaces/IAsset';

export async function resize_static_images(asset: IAsset, { config }: any) {
	const original_folder = `${asset.output_folder}/original`;
	const original_path = `${original_folder}/${asset.base_name}.png`;

	const [original] = await firebase.storage().bucket().file(original_path).download();

	const outputs: {
		tag: string;
		ipfs_tag: string;
		width: number;
		height: number;
	}[] = Object.values(config.image_outputs);

	for (const output of outputs) {
		const output_folder = `${asset.output_folder}/${output.tag}`;
		const path = `${output_folder}/${asset.base_name}${output.ipfs_tag}.png`;

		const buffer = await sharp(original)
			.resize(output.width, output.height)
			.sharpen()
			.withMetadata()
			.png({ quality: 90 })
			.toBuffer();

		await firebase.storage().bucket().file(path).save(buffer);

		// if (output.tag === "icon") {
		//   asset.thumb_hash = await compute_file_hash(path);
		// }
	}
	asset.image_ready = true;
	return asset;
}
