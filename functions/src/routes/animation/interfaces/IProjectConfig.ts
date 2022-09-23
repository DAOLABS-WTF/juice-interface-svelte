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

// Temporary solution for animation config based on
// https://github.com/atsignhandle/example-nft-tool-packages/blob/project-config-proposal/p5.js-videos/project-config.json
export type AnimationProjectConfig = {
	collections: [
		{
			name: 'buildings';
			type: 'p5.js';
			project: '@videos';
			description: 'buildings';
			collection_logo: '';
			default_image: '';
			banner_logo: '';
			category: 'Art';
			twitter: '@meowsdao';
			external_link: 'https://yoursite.io/stuff/111';
			discord: 'https://discord.gg/meowsdao';
			instagram: '@instagram_name';
			medium: '@medium_handle';
			royalty: 5;
			default_color: '#57fcd5';
			custom_layout: '';
			folder: 'buildings';
		},
		{
			name: 'city-builder';
			type: 'p5.js';
			project: '@cooler';
			description: 'city builder';
			collection_logo: '';
			default_image: '';
			banner_logo: '';
			category: 'Art';
			twitter: '@meowsdao';
			external_link: 'https://yoursite.io/stuff/111';
			discord: 'https://discord.gg/meowsdao';
			instagram: '@instagram_name';
			medium: '@medium_handle';
			royalty: 5;
			default_color: '#57fcd5';
			custom_layout: '';
			folder: 'city-builder';
		},
		{
			name: 'noisy-dashed-lines';
			type: 'p5.js';
			project: '@cooler';
			description: 'noisy dashed lines';
			collection_logo: '';
			default_image: '';
			banner_logo: '';
			category: 'Art';
			twitter: '@meowsdao';
			external_link: 'https://yoursite.io/stuff/111';
			discord: 'https://discord.gg/meowsdao';
			instagram: '@instagram_name';
			medium: '@medium_handle';
			royalty: 5;
			default_color: '#57fcd5';
			custom_layout: '';
			folder: 'noisy-dashed-lines';
		},
		{
			name: 'rorschach-rainbow.p5';
			type: 'p5.js';
			project: '@cooler';
			description: 'square packing study';
			collection_logo: '';
			default_image: '';
			banner_logo: '';
			category: 'Art';
			twitter: '@meowsdao';
			external_link: 'https://yoursite.io/stuff/111';
			discord: 'https://discord.gg/meowsdao';
			instagram: '@instagram_name';
			medium: '@medium_handle';
			royalty: 5;
			default_color: '#57fcd5';
			custom_layout: '';
			folder: 'rorschach-rainbow.p5';
		}
	];
	output_folder: string;
	resume_folder: '';
	upload_images_to_ipfs: true;
	upload_metadata_to_ipfs: true;
	excluded_layers_from_metadata: [];
	shuffle_assets: false;
	re_generate_collages: false;
	re_generate_metadata_cid: true;
	metadata_file_extension: false;
	hide_rarity_names: true;
	rotated_images_allowed: 0;
	mirror_images_allowed: 0;
	name: '';
	symbol: 'JBX-';
	total_supply: 10;
	metadata_outputs: [
		{
			type: 'ethereum';
			mint_pricing: {
				type: 'fixed';
				value: 1;
			};
		}
	];
	include_total_population_in_name: true;
	birthdate: '';
	minter: 'tankbottoms.eth';
	creators: ['@WagmiStudios'];
	publishers: ['@WagmiStudios'];
	genres: ['Banny', 'banana'];
	tags: ['ETH'];
	drop_date: '';
	rights: '© 2022 JuiceBox DAO, WAGMI Studios.xyz, All rights reserved.';
	decimals: 0;
	generation: 0;
	edition: 0;
	items: [
		{
			name: 'buildings';
			description: 'buildings';
			external_link: 'https://yoursite.io/stuff/111';
			collection: 'buildings';
			file_name: 'buildings.p5.js';
			output_resolution: '1000x1000';
			properties: [];
			levels: [];
			stats: [];
			unlockable_content: false;
			explicit_content: false;
			freeze_metadata: false;
			capture_timing: {
				type: 'delay';
				value: 10;
			};
		},
		{
			name: 'city-builder';
			description: 'city builder';
			external_link: 'https://yoursite.io/stuff/111';
			collection: 'city-builder';
			file_name: 'city-builder.p5.js';
			output_resolution: '1000x1000';
			properties: [];
			levels: [];
			stats: [];
			unlockable_content: false;
			explicit_content: false;
			freeze_metadata: false;
			capture_timing: {
				type: 'delay';
				value: 10;
			};
		},
		{
			name: 'noisy-dashed-lines';
			description: 'noisy dashed lines';
			external_link: 'https://yoursite.io/stuff/111';
			collection: 'noisy-dashed-lines';
			file_name: 'noisy-dashed-lines.p5.js';
			output_resolution: '1000x1000';
			properties: [];
			levels: [];
			stats: [];
			unlockable_content: false;
			explicit_content: false;
			freeze_metadata: false;
			capture_timing: {
				type: 'delay-and-repeat';
				value: [10, 3];
			};
		},
		{
			name: 'rorschach-rainbow.p5';
			description: 'rorschach rainbow';
			external_link: 'https://yoursite.io/stuff/111';
			collection: 'rorschach-rainbow.p5';
			file_name: 'rorschach-rainbow.p5.js';
			output_resolution: '1000x1000';
			properties: [];
			levels: [];
			stats: [];
			unlockable_content: false;
			explicit_content: false;
			freeze_metadata: false;
			capture_timing: {
				type: 'delay';
				value: 10;
			};
		}
	];
	items_file: '';
};
