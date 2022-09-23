export interface IMetadata {
	name: string;
	symbol: string;
	description: string;
	birthdate?: string;
	background_colors?: string[];
	minter: string;
	creators: Array<string>;
	publishers: Array<string>;
	genres: Array<string>;
	tags: Array<string>;
	drop_date: string;
	native_size: string;
	more_info_link: string;
	include_total_population_in_name: boolean;
	royalties?: {};
	rights?: string;
	decimals: number;
	generation: number;
	edition: number;
}
