import { Dynamic, IHash, random } from '../utils';
import { Stat } from './stats';
/*
  TODO: remove dependance on specific trait stats instead define stats
*/
import { meow_stats } from './meow-stats';
import { test_stats } from './test-stats';
import {
	change_to_sentence_case,
	replace_underscores,
	strip_extension,
	trait_boost
} from './metadata';
import { strip_rarity } from '../csv';

export function generate_ethereum_metadata(asset: any, config: any) {
	const traits: IHash[] = [];
	const asset_boosts: { stat_name: string; maxxed: boolean }[] = [];
	const tags: string[] = [];

	let stats: Stat[];
	switch (config.name) {
		case 'glo-gang': {
			throw new Error(`glo-gang not configured for ethereum metadata`);
		}
		case 'meowsdao': {
			stats = meow_stats;
			break;
		}
		default: {
			// test
			stats = test_stats;
			break;
		}
	}

	Object.values(asset.traits).forEach((trait: any) => {
		tags.push(trait.trait_type);
	});

	Object.values(asset.traits).forEach((trait: any) => {
		let stripped_value = replace_underscores(strip_rarity(strip_extension(trait.value)));
		if (trait.trait_type !== 'Signature') {
			stripped_value = change_to_sentence_case(stripped_value);
		}
		const boost = trait_boost(trait, stats);
		if (!!boost) {
			asset_boosts.push(boost);
		}
		traits.push({ trait_type: trait.trait_type, value: stripped_value });
		tags.push(stripped_value);
	});

	const my_stats: Dynamic = {};
	stats.forEach((stat) => {
		my_stats[stat.stat_name] = 3 + Math.random() * 15; // 3-18
	});

	const boost_attributes = [];
	for (const b of asset_boosts) {
		let range = 0.6;
		if (b.maxxed) range = 1;
		let boost_rate = 1.2 + Math.random() * range; // between 1.2 and 1.8 multiplier (20%-80% increase)
		my_stats[b.stat_name] *= boost_rate;
		const percent_increase = Math.floor((boost_rate - 1) * 100);
		boost_attributes.push({
			trait_type: b.stat_name,
			display_type: 'boost_percentage',
			value: percent_increase
		});
	}

	const base_stat_attributes = [];
	let stats_sum = 0;
	for (const stat_name in my_stats) {
		const val = Math.floor(my_stats[stat_name]);
		stats_sum += val;
		base_stat_attributes.push({ trait_type: stat_name, value: val });
	}

	const level = Math.floor(stats_sum / stats.length / 2);
	const level_attribute = { trait_type: 'Level', value: level };

	// const birthday_ms = random_birthday(0.5, 3);
	const birthday_attribute = {
		trait_type: 'Birthday',
		display_type: 'date',
		value: Number(config.metadata_input.birthdate)
	};

	const all_attributes = [
		...traits,
		...base_stat_attributes,
		...boost_attributes,
		level_attribute,
		birthday_attribute
	];

	const i = config.metadata_input;
	const name = `${i.name} No. ${asset.base_name}`;

	let md: IHash = {
		identifier: asset.batch_index + 1, // `0..n`
		edition: i.edition,
		isBooleanAmount: true,
		name: name,
		attributes: all_attributes,
		symbol: `${i.symbol}${asset.base_name}`,
		shouldPreferSymbol: false,
		description: i.description,
		minter: i.minter,
		decimals: i.decimals,
		creators: i.creators,
		publishers: i.publishers,
		genre: i.genres,
		date: i.drop_date,
		tags: tags,
		background_color:
			i.background_colors !== undefined
				? i.background_colors[random(i.background_colors.length)]
				: 'FFFFFF',
		language: `en`,
		mimeType: `image/png`,
		artifactUri: asset.image_url,
		displayUri: asset.image_url,
		thumbnailUri: asset.thumb_url,
		externalUri: i.more_info_link,
		uri: asset.image_url,
		image: asset.image_url,
		imageSize: asset.image_size,
		formats: [
			{
				uri: asset.thumb_url,
				hash: asset.thumb_hash,
				mimeType: `image/png`,
				dimensions: {
					value: `350x350`,
					unit: `px`
				}
			},
			{
				uri: asset.image_url,
				hash: asset.image_hash,
				mimeType: `image/png`,
				dimensions: {
					value: i.native_size,
					unit: `px`
				}
			}
		]
	};
	if (!!i.royalties) {
		md.royalty_info = i.royalties;
	}
	if (!!i.rights) {
		md.rights = i.rights;
	}
	return md;
}
