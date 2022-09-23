import * as functions from 'firebase-functions';

export function validate_all_assets_for_contract(assets: any) {
	let valid = true;
	assets.forEach((asset: any) => {
		valid = valid && validate_asset_for_contract(asset);
	});

	if (!valid) {
		functions.logger.error(`invalid asset detected, aborting contract`);
	}

	return valid;
}

export function validate_asset_for_contract(asset: any): boolean {
	const h = asset.image_hash;
	if (asset.images_cid.length < 11) {
		functions.logger.warn(`asset ${h} CID missing.`);
	}
	return asset.images_cid.length > 10;
}
