//@ts-nocheck
import * as functions from 'firebase-functions';
import { NFTStorage, File } from 'nft.storage';
import { basename } from 'path';
import { delay, getFile } from './utils';

export enum ARTIFACTS {
	IMAGES,
	METADATA
}

class Nft {
	private MAX_BATCH_ASSETS = 20;
	private nft_storage: NFTStorage;
	private config: any;
	private ipfs_base_url: string;

	constructor(token: string, ipfs_base_url: string) {
		this.ipfs_base_url = ipfs_base_url;
		this.nft_storage = new NFTStorage({ token });
	}

	set_config(config: any) {
		this.config = config;
	}

	async time_track<A>(asyncFn: () => Promise<A>, id: string | undefined = undefined) {
		const starttime = new Date().getTime();
		const res = await asyncFn();
		const time = (new Date().getTime() - starttime) / 1000;
		const id_str = id ? `<${id}>` : '';
		functions.logger.log(`ipfs upload directory Promise ${id_str}`);
		functions.logger.log(`upload ${time} seconds`);
		return res;
	}

	checker(type: ARTIFACTS, asset: any) {
		switch (type) {
			case ARTIFACTS.IMAGES:
				return asset.images_cid.length > 0;
			case ARTIFACTS.METADATA:
				return asset.metadata_cid.length > 0;
			default:
				return true;
		}
	}

	path_selector(type: ARTIFACTS, asset: any) {
		switch (type) {
			case ARTIFACTS.IMAGES:
				const paths = [];
				paths.push(`${asset.image_folder}/original/${asset.base_name}.png`);
				for (const output of Object.values(this.config.image_outputs)) {
					if (output.ipfs_tag.length > 0) {
						paths.push(
							`${asset.image_folder}/${output.tag}/${asset.base_name}${output.ipfs_tag}.png`
						);
					}
				}
				return paths;
			case ARTIFACTS.METADATA:
				return [`${asset.json_folder}/ethereum/${asset.base_name.replace(/^0+/, '')}`];
			default:
				return [];
		}
	}

	cid_distributor(type: ARTIFACTS, asset: any, cid: string, thumb_tag: string) {
		switch (type) {
			case ARTIFACTS.IMAGES:
				asset.images_cid = cid;
				asset.image_url = `${this.ipfs_base_url}${cid}/${asset.base_name}.png`;
				asset.thumb_url = `${this.ipfs_base_url}${cid}/${asset.base_name}${thumb_tag}.png`;
				return asset;
			case ARTIFACTS.METADATA:
				asset.metadata_cid = cid;
				asset.metadata_url = `${this.ipfs_base_url}${cid}/${asset.base_name.replace(/^0+/, '')}`;
				return asset;
			default:
				return asset;
		}
	}

	async upload_artifacts(type: ARTIFACTS, assets: any) {
		const new_assets: any = [];
		let thumb_tag: string;
		for (const output of Object.values(this.config.image_outputs)) {
			if (output.tag === 'icon') {
				thumb_tag = output.ipfs_tag;
			}
		}

		let chunked_assets = [];
		for (let i = 0; i < Math.ceil(assets.length / this.MAX_BATCH_ASSETS); i++) {
			chunked_assets[i] = assets.slice(
				i * this.MAX_BATCH_ASSETS,
				i * this.MAX_BATCH_ASSETS + this.MAX_BATCH_ASSETS
			);
		}

		for (let index = 0; index < chunked_assets.length; index++) {
			const chunk_assets = chunked_assets[index];
			for (let j = 0; j < chunk_assets.length; j++) {
				let asset = chunk_assets[j];
				if (this.checker(type, asset)) continue;
				console.info(
					`uploading ${chunk_assets.length} assets, ${chunk_assets.length - j} remaining`
				);
				const paths = [];
				paths.push(...this.path_selector(type, asset));
				const result = await this.upload_files(paths);
				await delay(1000);
				if (result.cid) {
					asset = this.cid_distributor(type, asset, result.cid, thumb_tag);
				}
				new_assets.push(asset);
			}
		}
		return new_assets;
	}

	async upload_files(paths: string[]) {
		const files_with_contents: File[] = [];
		let filenames = '';
		try {
			for (const path of paths) {
				const filename = basename(path);
				filenames += `${filename},  `;
				files_with_contents.push(new File([await getFile(path)], filename));
			}

			const result = await this.time_track(
				() => this.nft_storage.storeDirectory(files_with_contents),
				filenames
			);

			const status = await this.nft_storage.status(result);

			functions.logger.log(`nft_storage status => `);
			functions.logger.log(status);
			return {
				cid: status.cid,
				success: true
			};
		} catch (e) {
			functions.logger.error(e);
			functions.logger.error(`error loading to ipfs: ${JSON.stringify(e)}`);
			return {
				success: false,
				cid: undefined
			};
		}
	}

	async upload_file(path: string) {
		try {
			const filename = basename(path);
			const file = new File([await getFile(path)], filename);

			const result = await this.time_track(() => this.nft_storage.storeDirectory([file]), filename);
			const status = await this.nft_storage.status(result);

			functions.logger.log(`nft_storage status => `);
			functions.logger.log(status);
			return {
				cid: status.cid,
				success: true
			};
		} catch (e) {
			functions.logger.error(e);
			functions.logger.error(`error loading to ipfs: ${JSON.stringify(e)}`);
			return {
				success: false,
				cid: null
			};
		}
	}
}

export const nft_storage = new Nft(process.env.NFT_STORAGE_API_KEY || '', 'ipfs://');
