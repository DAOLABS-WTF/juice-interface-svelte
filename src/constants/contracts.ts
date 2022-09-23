const ADDRESSES = {
	ETHEREUM: {
		1: {
			TOKEN: '0X0000000000000000000000000000000000000000',
			CLAIM: '0X0000000000000000000000000000000000000000',
			STACKING: '0X0000000000000000000000000000000000000000',
			BRIDGE: '0X0000000000000000000000000000000000000000'
		},
		4: {
			TOKEN: '0xEeb17f6C4AC1EBB6DBf8A28af786c0c93Ff37962',
			CLAIM: '0xdBfBa38E4B34C3115451a3629caeDAb17C6492B7',
			STACKING: '0x7BBDB35F96482b3fa63eFAf49d45f5B05eF07B94',
			BRIDGE: '0X0000000000000000000000000000000000000000'
		}
	},
	TEZOS: {}
};

export default ADDRESSES;

export const CURRENCY_METADATA = {
	MATIC: {
		name: 'MATIC',
		symbol: 'MATIC',
		style: {
			fontFamily: 'sans-serif'
		}
	},
	USD: {
		name: 'USD',
		symbol: 'US$'
	}
};
