import { createHash } from 'crypto';
import { getMetadata, getFile, saveFile } from './utils';

export const compute_file_hash = async (file_path: string): Promise<string> => {
	try {
		const hash = createHash('sha256');
		const input = await getFile(file_path);
		hash.update(input);
		let result = hash.digest('hex');
		return result;
	} catch (err) {
		if (err instanceof Error) {
			throw new Error(err.message);
		} else {
			throw new Error(JSON.stringify(err));
		}
	}
};

export async function compute_asset_hash(assets: any, config: any) {
	let icon_tag = 's';
	Object.values(config.image_outputs).forEach((output: any) => {
		if (output.tag == 'icon') icon_tag = output.ipfs_tag;
	});

	for (const asset of assets) {
		const original_path = `${asset.output_folder}/original/${asset.base_name}.png`;
		asset.image_hash = await compute_file_hash(original_path);
		const { size } = await getMetadata(original_path);
		asset.image_size = size;
		const icon_path = `${asset.output_folder}/icon/${asset.base_name}${icon_tag}.png`;
		asset.thumb_hash = await compute_file_hash(icon_path);
	}
	return assets;
}

export async function output_provenance_hash(all_assets: any) {
	const files = all_assets.map((asset: any) => {
		return { name: asset.batch_index + 1, hash: asset.image_hash };
	});
	files.sort(function (a: any, b: any) {
		return a.name - b.name;
	});
	let hashes = '';
	files.forEach((file: any) => {
		hashes += file.hash;
	});
	const hash = createHash('sha256');
	hash.update(hashes);
	const provenance = hash.digest('hex');
	const output = {
		files: files,
		provenance: provenance
	};
	const path = `${all_assets[0].json_folder}/provenance.json`;
	await saveFile(path, JSON.stringify(output, null, 3));
}
