import { BigNumber } from 'ethers';

export const networks = {
	1: 'mainnet',
	4: 'rinkeby'
};

export function getRpcUrl(chainId: number) {
	const networkName = networks[Number(chainId)];
	return `https://${networkName}.infura.io/v3/${process.env.INFURA_ID}`;
}

export function parseContractResponse(data) {
	if (['string', 'boolean', 'number'].includes(typeof data)) {
		return data;
	} else if (Array.isArray(data)) {
		const isObject = Object.keys(data).find((key) => key.match(/[^\d]/));
		if (isObject) {
			return parseContractResponse({ ...data });
		}
		return data.map(parseContractResponse);
	} else if (data instanceof BigNumber || data._isBigNumber) {
		return BigNumber.from(data.hex || data._hex);
	} else if (typeof data === 'object') {
		return Object.keys(data).reduce((acc, key) => {
			acc[key] = parseContractResponse(data[key]);
			return acc;
		}, {});
	}
	return data;
}
