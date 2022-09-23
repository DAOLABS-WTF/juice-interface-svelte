export interface ITrait {
	trait_type: string;
	value: string;
	count_like_it: number;
	percent_like_it: number;
	unique: boolean;
	percent_rarity: number; // the percent of the population allowed to possess this.
	rarity_name: string; // epic
}

export interface ITraitStat {
	count: number;
	percent: number;
	rarity: string;
}
