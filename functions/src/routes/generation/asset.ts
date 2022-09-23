import { IAsset } from './interfaces/IAsset';
import { IPopulation } from './interfaces/IPopulation';
import { IProjectConfig } from './interfaces/IProjectConfig';
import { ITrait } from './interfaces/ITrait';
import { BLANK } from './utils/constants';
import { zero_pad } from './utils/filenames';

class Asset implements IAsset {
	image_folder: string;
	image_ready = false;
	json_path: string;
	json_folder: string;
	trait_dir: string;
	output_folder: string = BLANK;
	original_folder = BLANK;
	image_hash: string = BLANK;
	image_size: number = 0;
	thumb_hash: string = BLANK;
	batch_index: number;
	base_name: string;
	images_cid = BLANK;
	image_url = BLANK;
	thumb_url = BLANK;
	metadata_cid = BLANK;
	metadata_url = BLANK;
	traits: ITrait[];
	rotation = 0;
	constructor(
		batch_index: number,
		traits: ITrait[],
		layered_assets_dir: string,
		output_dir: string,
		config: IProjectConfig
	) {
		if (!config.total_populations_size) {
			throw new Error('Empty total_population_size.');
		}
		if (!output_dir) {
			throw new Error('Empty output dir.');
		}
		const population_digits = config.total_populations_size.toString().length;
		this.traits = traits;
		this.batch_index = batch_index;
		this.base_name = zero_pad(this.batch_index + 1, population_digits);

		this.output_folder = output_dir;
		this.image_folder = `${output_dir}`;
		this.json_folder = `${output_dir}/metadata`;
		this.original_folder = `${output_dir}/original`;
		this.json_path = `${this.json_folder}/${this.base_name}.json`;
		this.trait_dir = `${layered_assets_dir}`;
	}
}

export function create_assets(
	config: IProjectConfig,
	population: IPopulation,
	combinations: ITrait[][],
	asset_index_origin: number,
	shuffled_ordering: number[]
): IAsset[] {
	try {
		let i = asset_index_origin;
		const assets: IAsset[] = [];
		for (const combo of combinations) {
			assets.push(
				new Asset(
					shuffled_ordering[i++],
					combo,
					`${population.traits_folder}`,
					config.output_folder,
					config
				)
			);
		}
		return assets;
	} catch (e: any) {
		throw new Error(e);
	}
}
