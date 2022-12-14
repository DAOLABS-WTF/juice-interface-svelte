import { IHash } from '../utils';
import { strip_rarity } from '../csv';
import { replace_underscores, strip_extension } from './metadata';
import { Trait } from '../interfaces';
import * as functions from 'firebase-functions';

export function generate_tezos_metadata(asset: any, config: any) {
	console.info(`generating metadata for ${asset.base_name}`);
	const attributes: {}[] = [];
	const tags: string[] = [];
	asset.traits.forEach((trait: Trait) => {
		if (config.excluded_layers_from_metadata.indexOf(trait.trait_type) !== -1) return;
		functions.logger.log(trait.trait_type);
		attributes.push({
			name: trait.trait_type,
			value: replace_underscores(strip_rarity(strip_extension(trait.value)))
		});
		tags.push(trait.trait_type);
	});
	asset.traits.forEach((trait: Trait) => {
		if (config.xcluded_layers_from_metadata.indexOf(trait.trait_type) !== -1) return;
		tags.push(replace_underscores(strip_rarity(strip_extension(trait.value))));
	});
	const i = config.metadata_input;
	const name = i.include_total_population_in_name
		? `${i.name} ${asset.base_name}/${config.total_populations_size}`
		: `${i.name} ${asset.base_name}`;
	const md: IHash = {
		identifier: asset.batch_index + 1, // `0..n`
		name: name,
		symbol: `${i.symbol}${asset.base_name}`,
		shouldPreferSymbol: false,
		isBooleanAmount: true,
		isTransferable: true,
		artifactUri: asset.image_url,
		displayUri: asset.image_url,
		thumbnailUri: asset.thumb_url,
		uri: asset.image_url,
		externalUri: i.more_info_link,
		hash: asset.image_hash,
		description: i.description,
		minter: i.minter,
		decimals: i.decimals,
		generation: i.generation,
		edition: i.edition,
		id: asset.batch_index + 1,
		attributes: attributes,
		creators: i.creators,
		publishers: i.publishers,
		genre: i.genres,
		date: i.drop_date,
		type: `Image`,
		tags: tags,
		language: `en`,
		mimeType: `image/png`,
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
		md.royalties = i.royalties;
	}
	if (!!i.rights) {
		md.rights = i.rights;
	}

	return md;
}
