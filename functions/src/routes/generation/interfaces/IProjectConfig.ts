import { IAnimOutput } from './IAnimOutput';
import { ICollageOutput } from './ICollageOuptput';
import { IImageOutput } from './IImageOutput';
import { IMetadata } from './IMetadata';
import { IPopulationConfig } from './IPopulation';
import { IStackedGifOutput } from './IStackedGifOutput';

export interface IProjectConfig {
	name: string;
	metadata_input: IMetadata;
	metadata_outputs: string[];
	populations: IPopulationConfig[];
	image_outputs: IImageOutput[];
	anim_outputs: IAnimOutput[];
	collage_outputs: ICollageOutput[];
	stacked_gif_outputs: IStackedGifOutput[];
	upload_images_to_ipfs: boolean;
	upload_metadata_to_ipfs: boolean;
	resume_folder: string;
	re_generate_collages: boolean;
	metadata_file_extension: boolean;
	stunt_populations_to?: number;
	hide_rarity_names?: boolean;
	rotated_images_allowed: number;
	mirror_images_allowed: number;
	shuffle_assets: boolean;
	excluded_layers_from_metadata: string[];
	re_generate_metadata_cid: boolean;
	output_folder: string;
	total_populations_size: number;
}
