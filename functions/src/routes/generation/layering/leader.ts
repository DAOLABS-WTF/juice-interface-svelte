import { IAsset } from '../interfaces/IAsset';
import { generate_static_images } from './generate_static_image';
import { mirror_static_images } from './mirror_all_images';
import { resize_static_images } from './resize_static_images';

export async function generate_all_images(assets: IAsset[]) {
	const result = await Promise.all(assets.map((item: any) => generate_static_images(item)));
	return result;
}

export async function mirror_all_images(assets: IAsset[], config: any) {
	await Promise.all(assets.map((asset: any) => mirror_static_images(asset, config)));
}

export async function resize_all_images(assets: IAsset[], config: any) {
	const result = await Promise.all(assets.map((asset: any) => resize_static_images(asset, config)));
	return result;
}
