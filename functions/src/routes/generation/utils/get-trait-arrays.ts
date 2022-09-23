import { ITrait } from '../interfaces/ITrait';
import { IPopulation } from '../interfaces/IPopulation';
import * as firebase from 'firebase-admin';

function get_rarity_percent_from_trait_filename(filename: string, total_populations_size: number) {
	const rare_re = new RegExp('_r[0-9]+.');
	const has_rare = rare_re.test(filename);
	const unique_re = new RegExp('_u[0-9]+.');
	const has_unique = unique_re.test(filename);

	if (has_rare) {
		const rare_marker_index = filename.lastIndexOf('_r');
		const until = filename.lastIndexOf('.');
		if (rare_marker_index > 0 && until > 0 && rare_marker_index + 2 < until) {
			const numeric = filename.slice(rare_marker_index + 2, until);
			let rarity: number;
			if (numeric[0] === '0') {
				rarity = parseFloat('.' + numeric);
			} else {
				rarity = parseInt(numeric);
			}
			return rarity;
		}
	} else if (has_unique) {
		const rare_marker_index = filename.lastIndexOf('_u');
		const until = filename.lastIndexOf('.');
		if (rare_marker_index > 0 && until > 0 && rare_marker_index + 2 < until) {
			const numeric = filename.slice(rare_marker_index + 2, until);
			let rarity: number;
			if (numeric[0] === '0') {
				rarity = (1 / total_populations_size) * 100;
			} else {
				rarity = (parseInt(numeric) / total_populations_size) * 100;
			}
			return rarity;
		}
	}
	return 100;
}

export async function get_trait_arrays(
	population: IPopulation,
	total_populations_size: number
): Promise<ITrait[][]> {
	const traits_arrays: ITrait[][] = [];
	const USE_FULL_FILENAME = true;
	const ordering = population.config.layer_order;
	for (let p = 0; p < Object.values(ordering).length; p++) {
		const trait = ordering[p];
		traits_arrays[p] = [];
		try {
			const filenames = await firebase
				.storage()
				.bucket()
				.getFiles({
					directory: `${population.traits_folder}/${trait}`
				});
			filenames[0].forEach(({ name }) => {
				const filename = name.substring(name.lastIndexOf('/') + 1);
				if (!filename) return;
				const value = USE_FULL_FILENAME ? `${filename}` : `${filename.split('.')[0]}`;
				const unique_re = new RegExp('_u[0-9]+.');
				const unique = unique_re.test(filename);
				const percent_rarity = get_rarity_percent_from_trait_filename(
					filename,
					total_populations_size
				);
				traits_arrays[p].push({
					trait_type: trait,
					value,
					rarity_name: '',
					count_like_it: 0,
					percent_like_it: 0,
					unique,
					percent_rarity
				});
			});
		} catch (e) {
			throw new Error(
				`error in locating ${population.traits_folder}/${population.config.name}/Traits/${trait}`
			);
		}
	}
	return traits_arrays;
}
