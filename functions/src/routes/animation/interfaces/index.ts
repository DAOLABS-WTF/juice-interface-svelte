import { ITrait } from './ITrait';

export interface IHash {
	[k: string]: string;
}

export interface Resolution {
	type: string;
	width: number;
	height: number;
}

export interface Edition {
	edition_size: number;
	resolutions: Resolution[];
	layers_order: ITrait[];
}

export interface Base_Configuration {
	instance: Edition;
	input_path: string;
	output_path: string;
	token_urls: string;
	traits_directories: string[];
}
