import sharp from 'sharp';
import { IAsset } from '../interfaces/IAsset';
import * as firebase from 'firebase-admin';

export async function mirror_static_images(asset: IAsset, config: any) {
	const original_folder = `${asset.output_folder}/original`;
	const original_path = `${original_folder}/${asset.base_name}.png`;

	let mirror_images_allowed = config?.mirror_images_allowed || 0;

	const [original] = await firebase.storage().bucket().file(original_path).download();

	if (mirror_images_allowed > 0) {
		if (Math.random() < Math.random()) {
			const buffer = await sharp(original).flop(true).png({ quality: 90 }).toBuffer();

			await firebase.storage().bucket().file(original_path).save(buffer);
			mirror_images_allowed--;
		}
	}
	return true;
}
