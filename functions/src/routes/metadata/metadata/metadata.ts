import { Dynamic, saveFile } from '../utils';
import { Trait } from '../interfaces';
import { Stat } from './stats';
import { generate_tezos_metadata } from './tezos-metadata';
import { generate_ethereum_metadata } from './eth-metadata';
import * as functions from 'firebase-functions';

export async function generate_metadata(asset: any, config: any) {
	const { metadata_outputs, metadata_file_extension } = config;
	const extension = metadata_file_extension ? '.json' : '';
	for (const mo of Object.values(metadata_outputs)) {
		switch (mo) {
			case 'tezos': {
				const md = generate_tezos_metadata(asset, config);
				await write_metadata_to_file(asset, extension, md, 'tezos');
				break;
			}
			case 'ethereum': {
				const md = generate_ethereum_metadata(asset, config);
				await write_metadata_to_file(asset, extension, md, 'ethereum');
				break;
			}
			default: {
				throw Error(`metadata kind ${mo} unsupported`);
			}
		}
	}
}

export const strip_extension = (value: string): string => {
	return value.slice(0, value.lastIndexOf('.'));
};

async function write_metadata_to_file(
	asset: any,
	extension: string,
	md: Dynamic,
	sub_folder: string
) {
	const folder = `${asset.json_folder}/${sub_folder}`;
	const p = `${folder}/${asset.batch_index + 1}${extension}`;
	try {
		await saveFile(p, JSON.stringify(md, null, 3));
	} catch (err) {
		functions.logger.error(`error writing json to ${p} ${JSON.stringify(err)}`);
	}
}

export function replace_underscores(input: string) {
	return input.replace(/_/g, ' ');
}

export function change_to_sentence_case(input: string) {
	return input.toLowerCase().replace(/^\w/, (c) => c.toUpperCase());
}

export function trait_boost(trait: Trait, stats: Stat[]): any {
	for (const boost of stats) {
		for (const keyword of boost.max_keywords) {
			if (trait.value.toLowerCase().indexOf(keyword) > -1) {
				return {
					stat_name: boost.stat_name,
					maxxed: true
				};
			}
		}
		for (const keyword of boost.trigger_keywords) {
			if (trait.value.toLowerCase().indexOf(keyword) > -1) {
				return {
					stat_name: boost.stat_name,
					maxxed: false
				};
			}
		}
	}
}
