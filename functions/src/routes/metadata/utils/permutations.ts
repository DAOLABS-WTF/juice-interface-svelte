import { number_with_commas } from './index';
import { IHash, Trait } from '../interfaces';

export function get_possible_permutation_count(priorities: any[], traits_arrays: any[][]): number {
	let p: number = 1;
	traits_arrays.map((traits, index) => {
		// what was the plan with process.stdout, can we trim it all out.
		false && process.stdout.write(`${priorities[index]} ${traits.length} `);
		p *= traits.length;
		false && process.stdout.write(`${p}` + `\n`);
	});
	console.info(`total possible permutations ${number_with_commas(p)}`);
	return p;
}

const rand_array_index = (arr: Array<any>) => {
	return Math.round(Math.random() * (arr.length - 1));
};

const initNsizeArrayWith = <T>(n: number, t: () => T) => {
	const array = [];
	let i = n;
	while (i > 0) {
		array.push(t());
		i--;
	}
	return array;
};

const return_first_rand_array_index_that_passes = <T>(array: T[], f: (param: T) => boolean) => {
	const aux = (n: number, offset = 0): number => {
		const i = rand_array_index(Array(n));
		if (f(array[i + offset])) return i + offset;
		if (n === 1) return -1;
		if (i + 1 <= n / 2) {
			const right = aux(n - (i + 1), offset + i + 1);
			return right >= 0 ? right : i === 0 ? -1 : aux(i, offset);
		} else {
			const left = aux(i, offset);
			return left >= 0 ? left : i === n - 1 ? -1 : aux(n - (i + 1), offset + i + 1);
		}
	};
	return aux(array.length);
};

/* 
  randomly select members from the input set, 
  hashing to make sure we only emit novel combinations.
  diamond_hands_r#1.png - absolute, only generate n images
  unicorn_horn_r#1%.png - percentage of total, generate n images
*/
export function sample_permutations_from_many_with_priority(
	arrays: Array<Array<Trait>>,
	max: number
): any[][] {
	let total_permutations = 1;
	arrays.forEach((a) => {
		total_permutations *= a.length;
	});
	console.info(
		`sampling ${max} individuals from ${number_with_commas(total_permutations)} possibilities`
	);
	//   randomly fill in unique count traits to a result set first
	const results_set: number[][] = initNsizeArrayWith(max, () => []);
	arrays.forEach((traits, index) => {
		traits.forEach((trait, trait_index) => {
			if (trait.unique === false) return;
			let count = Math.floor((trait.percent_rarity * max) / 100);
			if (count < 1) count = 1;
			while (count > 0) {
				const idx = return_first_rand_array_index_that_passes(
					results_set,
					(a) => a[index] === undefined
				);
				if (idx < 0) throw Error('more traits then ');
				results_set[idx][index] = trait_index;
				--count;
			}
		});
	});

	const fingerprints: IHash = {};
	const results = [];
	while (true) {
		const fingerprint: Array<number> = [];
		const result_count = results.length;
		arrays.map((array, index) => {
			const res = results_set[result_count][index];
			let idx: number;
			// if there already exist a choice in the result set choose that index
			if (res !== undefined) {
				idx = res;
			} else {
				idx = return_first_rand_array_index_that_passes(array, (trait) => {
					if (trait.unique) return false;
					let allowed = Math.floor((trait.percent_rarity * max) / 100);
					if (allowed < 1) allowed = 1;
					return trait?.count_like_it < allowed;
				});
			}
			array[idx].count_like_it++;
			fingerprint[index] = idx;
		});

		const k = JSON.stringify(fingerprint);
		if (!fingerprints[k]) {
			fingerprints[k] = '1';
			const result = [];
			for (let i = 0; i < arrays.length; i++) result.push({ ...arrays[i][fingerprint[i]] });
			let print = '';
			for (let i = 0; i < arrays.length; i++) {
				if (i > 0) print += ' ';
				print += `${fingerprint[i]}`;
			}
			false && console.debug(print);
			results.push(result);
		} else {
			console.info(`meh boring (seen before)`);
		}
		if (results.length >= max) return results;
	}
}
/* 
  randomly select members from the input set, 
  hashing to make sure we only emit novel combinations.
  diamond_hands_r#1.png - absolute, only generate n images
  unicorn_horn_r#1%.png - percentage of total, generate n images
*/
export function sample_permutations_from_many_with_new_optimization(
	arrays: Array<Array<Trait>>,
	max: number
): any[][] {
	let total_permutations = 1;
	arrays.forEach((a) => {
		total_permutations *= a.length;
	});
	console.info(
		`sampling ${max} individuals from ${number_with_commas(total_permutations)} possibilities`
	);
	const fingerprints: IHash = {};
	const results = [];
	while (true) {
		const fingerprint: Array<number> = [];
		arrays.map((array, index) => {
			const idx = return_first_rand_array_index_that_passes(array, (trait) => {
				let allowed = Math.floor((trait.percent_rarity * max) / 100);
				if (allowed < 1) allowed = 1;
				return trait.count_like_it < allowed;
			});
			if (array[idx].count_like_it == undefined) array[idx].count_like_it++;
			fingerprint[index] = idx;
		});

		const k = JSON.stringify(fingerprint);
		if (!fingerprints[k]) {
			fingerprints[k] = '1';
			const result = [];
			for (let i = 0; i < arrays.length; i++) result.push({ ...arrays[i][fingerprint[i]] });
			let print = '';
			for (let i = 0; i < arrays.length; i++) {
				if (i > 0) print += ' ';
				print += `${fingerprint[i]}`;
			}
			false && console.debug(print);
			results.push(result);
		} else {
			console.info(`meh boring (seen before)`);
		}
		if (results.length >= max) return results;
	}
}

export function sample_permutations_from_many(arrays: Array<Array<Trait>>, max: number): any[][] {
	let total_permutations = 1;
	arrays.forEach((a) => {
		total_permutations *= a.length;
	});
	console.info(
		`sampling ${max} individuals from ${number_with_commas(total_permutations)} possibilities`
	);
	const fingerprints: IHash = {};
	const results = [];
	while (true) {
		const fingerprint: Array<number> = [];
		arrays.map((array, index) => {
			let idx = rand_array_index(array);
			let allowed = Math.floor((array[idx].percent_rarity * max) / 100);
			if (allowed < 1) allowed = 1;

			let depth = 0;
			while (array[idx].count_like_it >= allowed) {
				depth++;
				console.debug(
					`(${results.length}) ${array[idx].value} already has ${array[idx].count_like_it} and ${allowed} allowed`
				);
				idx = rand_array_index(array);
				allowed = Math.floor((array[idx].percent_rarity * max) / 100);
				if (allowed < 1) allowed = 1;
				// TODO : fall back on just scanning for availables in order.
				if (depth > 300) {
					console.error(`ran out of ${array[idx].trait_type}`);
					process.exit();
				}
			}
			array[idx].count_like_it++;
			fingerprint[index] = idx;
		});

		const k = JSON.stringify(fingerprint);
		if (!fingerprints[k]) {
			fingerprints[k] = '1';
			const result = [];
			for (let i = 0; i < arrays.length; i++) result.push({ ...arrays[i][fingerprint[i]] });
			let print = '';
			for (let i = 0; i < arrays.length; i++) {
				if (i > 0) print += ' ';
				print += `${fingerprint[i]}`;
			}
			false && console.debug(print);
			results.push(result);
		} else {
			console.info(`meh boring (seen before)`);
		}
		if (results.length >= max) return results;
	}
}

function write_combinations_to_std_out(combinations: any[][]) {
	const write = (s: string) => {
		process.stdout.write(s);
	};

	combinations.map((dna) => {
		write(`${JSON.stringify(dna)}`);
		for (let t of dna) {
			const lower = t.value.toLowerCase();
			write(`${lower}, `);
			write(`${lower.split('-')[0]}, `); // remove extension
		}
		write(`\n`);
	});
}

export async function get_permutations(n: number, traits_arrays: any[][]) {
	let combinations: any[][];
	combinations = sample_permutations_from_many_with_new_optimization(traits_arrays, n);
	false && console.debug(combinations);
	false && write_combinations_to_std_out(combinations);
	console.info(`computed ${combinations.length} total unique attribute permutations.`);
	const fraction = 1000;
	console.warn(
		`minting ${combinations.length} permutations, fractional test disabled, test mint volume ${
			combinations.length / fraction
		}`
	);
	return combinations;
}
