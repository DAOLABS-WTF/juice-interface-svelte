import { IAsset } from './IAsset';

export interface IPopulationConfig {
	name: string;
	population_size: number;
	layer_order: string[];
	background_animation?: string;
}

export interface IPopulation {
	config: IPopulationConfig;
	input_folder: string;
	traits_folder: string;
	assets?: IAsset[];
}
