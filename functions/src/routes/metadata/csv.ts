import { dynamic, saveFile } from './utils';
import { replace_underscores } from './metadata/metadata';
import { stringify } from 'csv-stringify/sync';

const onlyUnique = (value: string, index: number, self: any[]) => {
	return self.indexOf(value) === index;
};

export const strip_rarity = (input: string) => {
	let ret = input;
	if (input.lastIndexOf('_r') > -1) {
		ret = ret.slice(0, ret.lastIndexOf('_r'));
	}
	if (ret.lastIndexOf('_u') > -1) {
		ret = ret.slice(0, ret.lastIndexOf('_u'));
	}
	return ret;
};

export const output_contract_csv = async (
	assets: any[], // TODO: Set correct type
	dest_path: string,
	config: any
) => {
	if (assets.length) {
		const header_entries = ['token_id', 'symbol', 'name', 'url'];

		const records: {}[] = [];
		assets.forEach((asset) => {
			const rec: dynamic = {};
			rec.token_id = `${asset.batch_index + 1}`; // 1
			rec.symbol = `${config.metadata_input.symbol}${asset.base_name}`; // GLO0001
			rec.name = `${config.metadata_input.name} No. ${asset.base_name}`; // GloGang No. 1
			rec.url = asset.metadata_url;
			records.push(rec);
		});
		const csvString = [
			header_entries,
			...records.map((item: any) => [item.token_id, item.symbol, item.name, item.url])
		];
		await saveFile(dest_path, stringify(csvString));
	} else {
		console.warn(`image/metadata minting returning nothing`);
	}
};

export async function output_rarity_report_csv(
	assets: any[], // TODO: Set correct type
	all_trait_names: string[],
	dest_path: string
) {
	if (assets.length) {
		const header_entries = [
			'Trait Type',
			'Trait Value',
			'Enforced Rarity',
			'Count',
			'Actual Rarity'
		];

		const traits = all_trait_names.filter(onlyUnique);

		const countsObj: {
			[k: string]: {
				count: number;
				trait_type: string;
				value: string;
				rarity: number;
			};
		} = {};
		const records: {}[] = [];
		assets.forEach((asset) => {
			Object.values(asset.traits).forEach((trait: any) => {
				const key = `${trait.trait_type}-${trait.value}`;
				if (!countsObj[key])
					countsObj[key] = {
						count: 1,
						trait_type: trait.trait_type,
						value: trait.value,
						rarity: trait.percent_rarity
					};
				else countsObj[key].count++;
			});
		});

		for (const trait of traits) {
			for (const countsKey in countsObj) {
				const obj = countsObj[countsKey];
				if (obj.trait_type === trait) {
					const rec: dynamic = {};
					rec.type = replace_underscores(obj.trait_type);
					rec.value = replace_underscores(strip_rarity(strip_extension(obj.value)));
					rec.enforcedRarity = obj.rarity;
					rec.count = obj.count;
					rec.rarity = (obj.count / assets.length) * 100;
					records.push(rec);
				}
			}
		}
		const csvString = [
			header_entries,
			...records.map((item: any) => [
				item.trait_type,
				item.value,
				item.enforcedRarity,
				item.count,
				item.rarity
			])
		];

		await saveFile(dest_path, stringify(csvString));
	} else {
		console.warn(`image/metadata minting returning nothing`);
	}
}

export const output_csv = async (
	assets: any[], // TODO: Set correct type
	all_trait_names: string[],
	dest_path: string,
	config: any
) => {
	console.warn(`generating csv`);
	const hide_rarity_names = config.hide_rarity_names;
	if (assets.length) {
		const header_entries = [
			{ id: 'index', title: 'Index' },
			{ id: 'filename', title: 'File Name' },
			{ id: 'hash', title: 'Image Hash' },
			{ id: 'imageUrl', title: 'Image URL' },
			{ id: 'imageCid', title: 'CID' },
			{ id: 'metaUrl', title: 'Metadata URL ' },
			{ id: 'metaCid', title: 'Metadata CID' },
			{ id: 'tokenTier', title: 'Token Tier' }
		];

		const traits = all_trait_names.filter(onlyUnique);
		traits.forEach((trait) => {
			// 'Shirt'
			header_entries.push({ id: trait, title: trait });
			// 'Num Shirts Like This'
			header_entries.push({
				id: 'num' + trait,
				title: 'Number ' + trait + ' Like Mine'
			});
			// 'Pct Shirts Like This'
			header_entries.push({
				id: 'pct' + trait,
				title: 'Percent ' + trait + ' Like Mine'
			});
			// 'Shirt Rarity'
			if (!hide_rarity_names) {
				header_entries.push({ id: trait + 'rarity', title: trait + ' Rarity' });
			}
		});

		const records: {}[] = [];
		assets.forEach((asset) => {
			const rec: dynamic = {};
			rec.filename = `${asset.base_name}.png`; // TODO: nice to have the asset know all the filenames :cry:
			rec.index = asset.batch_index + 1;
			rec.hash = asset.image_hash;
			rec.imageUrl = asset.image_url;
			rec.imageCid = asset.images_cid;
			rec.metaUrl = asset.metadata_url;
			rec.metaCid = asset.metadata_cid;
			Object.values(asset.traits).forEach((trait: any) => {
				if (config.excluded_layers_from_metadata) {
					if (config.excluded_layers_from_metadata.indexOf(trait.trait_type) !== -1) return;
				}
				rec[trait.trait_type] = replace_underscores(strip_rarity(strip_extension(trait.value)));
				rec['num' + trait.trait_type] = trait.count_like_it;
				rec['pct' + trait.trait_type] = trait.percent_like_it;
				if (!hide_rarity_names) {
					rec[trait.trait_type + 'rarity'] = trait.rarity_name;
				}
			});
			records.push(rec);
		});
		const csvString = [
			[
				'Index',
				'File Name',
				'Image Hash',
				'Image URL',
				'Image URL',
				'CID',
				'Metadata URL ',
				'Metadata CID',
				'Token Tier'
			],
			...records.map((item: any) => [
				item.trait_type,
				item.value,
				item.enforcedRarity,
				item.count,
				item.rarity
			])
		];

		await saveFile(dest_path, stringify(csvString));
	} else {
		console.warn(`image/metadata minting returning nothing`);
	}
};

const strip_extension = (value: string): string => {
	return value.slice(0, value.lastIndexOf('.'));
};
