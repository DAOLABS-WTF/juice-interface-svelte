import { readdirSync } from 'fs';
import { Trait } from '../interfaces';

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

export function get_trait_arrays(population: any, total_populations_size: number) {
	const traits_arrays: Trait[][] = [];
	const USE_FULL_FILENAME = true;
	const ordering = population.config.layer_order;

	for (let p = 0; p < ordering.length; p++) {
		const trait = ordering[p];
		traits_arrays[p] = [];
		try {
			const filenames = readdirSync(`${population.traits_folder}/${trait}`);
			filenames.map((name) => {
				const value = USE_FULL_FILENAME ? `${name}` : `${name.split('.')[0]}`;
				const unique_re = new RegExp('_u[0-9]+.');
				const unique = unique_re.test(name);
				const percent_rarity = get_rarity_percent_from_trait_filename(name, total_populations_size);
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
			throw new Error(`error in locating ${population.traits_folder}/${trait}`);
		}
	}
	// false && log_traits_arrays(ordering, traits_arrays); ?????
	return traits_arrays;
}
