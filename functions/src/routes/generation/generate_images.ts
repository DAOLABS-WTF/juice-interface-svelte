import { IAsset } from './interfaces/IAsset';
import { IProjectConfig } from './interfaces/IProjectConfig';
import { generate_all_images, mirror_all_images, resize_all_images } from './layering/leader';

export async function generate_all_outputs(assets: IAsset[], config: IProjectConfig) {
	const result_generated_images = await generate_all_images(assets);
	await mirror_all_images(result_generated_images, config);
	const result_resized_images = await resize_all_images(result_generated_images, config);
	return result_resized_images;
}
