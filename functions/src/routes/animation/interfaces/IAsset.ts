import { ITrait } from './ITrait';

export interface IAsset {
	traits: ITrait[];
	batch_index: number;
	base_name: string;
	output_folder: string;
	image_folder: string;
	json_folder: string;
	json_path: string;
	trait_dir: string;
	image_ready: boolean;
	image_hash: string;
	image_size: number;
	thumb_hash: string;
	images_cid: string;
	image_url: string;
	thumb_url: string;
	metadata_cid: string;
	metadata_url: string;
	rotation: number;
	original_folder: string;
}
