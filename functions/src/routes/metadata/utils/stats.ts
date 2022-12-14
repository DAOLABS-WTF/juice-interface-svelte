import { dynamic } from '../utils';

export function calculate_stats(assets: any) {
	const trait_key = (trait: { trait_type: string; value: string }) => {
		return `${trait.trait_type}-${trait.value}`;
	};
	const trait_counts: dynamic = {};
	const n = assets.length;
	assets.forEach((asset: any) => {
		Object.values(asset.traits).forEach((trait: any) => {
			if (!trait_counts[trait_key(trait)]) trait_counts[trait_key(trait)] = 0;
			trait_counts[trait_key(trait)]++;
		});
	});

	assets.forEach((asset: any) => {
		Object.values(asset.traits).forEach((trait: any) => {
			const c = trait_counts[trait_key(trait)];
			const pct = (c * 100) / n;
			trait.count_like_it = c;
			trait.percent_like_it = pct;
			// TODO:
			let r = 'Common';
			if (pct < 0.2) {
				// .045 b/c if less than 2.0 are allowed, we floor it to just 1 allowed.
				r = 'Super'; // unique, but unique doesn't sound very exciting
			} else if (pct < 2.5) {
				r = 'Rare';
			} else if (pct < 7) {
				r = 'Uncommon';
			}
			trait.rarity_name = r;
		});
	});

	return assets;
}
