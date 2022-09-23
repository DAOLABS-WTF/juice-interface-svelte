export default {
	address: '0xCDE93bdA2a706Fc652F7e75241bA949aCB9f4Fe5',
	abi: [
		{
			inputs: [
				{
					internalType: 'address',
					name: '_owner',
					type: 'address'
				}
			],
			stateMutability: 'nonpayable',
			type: 'constructor'
		},
		{
			inputs: [
				{
					internalType: 'uint256',
					name: 'prod1',
					type: 'uint256'
				},
				{
					internalType: 'uint256',
					name: 'denominator',
					type: 'uint256'
				}
			],
			name: 'PRBMath__MulDivOverflow',
			type: 'error'
		},
		{
			inputs: [],
			name: 'PRICE_FEED_ALREADY_EXISTS',
			type: 'error'
		},
		{
			inputs: [],
			name: 'PRICE_FEED_NOT_FOUND',
			type: 'error'
		},
		{
			anonymous: false,
			inputs: [
				{
					indexed: true,
					internalType: 'uint256',
					name: 'currency',
					type: 'uint256'
				},
				{
					indexed: true,
					internalType: 'uint256',
					name: 'base',
					type: 'uint256'
				},
				{
					indexed: false,
					internalType: 'contract IJBPriceFeed',
					name: 'feed',
					type: 'address'
				}
			],
			name: 'AddFeed',
			type: 'event'
		},
		{
			anonymous: false,
			inputs: [
				{
					indexed: true,
					internalType: 'address',
					name: 'previousOwner',
					type: 'address'
				},
				{
					indexed: true,
					internalType: 'address',
					name: 'newOwner',
					type: 'address'
				}
			],
			name: 'OwnershipTransferred',
			type: 'event'
		},
		{
			inputs: [
				{
					internalType: 'uint256',
					name: '_currency',
					type: 'uint256'
				},
				{
					internalType: 'uint256',
					name: '_base',
					type: 'uint256'
				},
				{
					internalType: 'contract IJBPriceFeed',
					name: '_feed',
					type: 'address'
				}
			],
			name: 'addFeedFor',
			outputs: [],
			stateMutability: 'nonpayable',
			type: 'function'
		},
		{
			inputs: [
				{
					internalType: 'uint256',
					name: '',
					type: 'uint256'
				},
				{
					internalType: 'uint256',
					name: '',
					type: 'uint256'
				}
			],
			name: 'feedFor',
			outputs: [
				{
					internalType: 'contract IJBPriceFeed',
					name: '',
					type: 'address'
				}
			],
			stateMutability: 'view',
			type: 'function'
		},
		{
			inputs: [],
			name: 'owner',
			outputs: [
				{
					internalType: 'address',
					name: '',
					type: 'address'
				}
			],
			stateMutability: 'view',
			type: 'function'
		},
		{
			inputs: [
				{
					internalType: 'uint256',
					name: '_currency',
					type: 'uint256'
				},
				{
					internalType: 'uint256',
					name: '_base',
					type: 'uint256'
				},
				{
					internalType: 'uint256',
					name: '_decimals',
					type: 'uint256'
				}
			],
			name: 'priceFor',
			outputs: [
				{
					internalType: 'uint256',
					name: '',
					type: 'uint256'
				}
			],
			stateMutability: 'view',
			type: 'function'
		},
		{
			inputs: [],
			name: 'renounceOwnership',
			outputs: [],
			stateMutability: 'nonpayable',
			type: 'function'
		},
		{
			inputs: [
				{
					internalType: 'address',
					name: 'newOwner',
					type: 'address'
				}
			],
			name: 'transferOwnership',
			outputs: [],
			stateMutability: 'nonpayable',
			type: 'function'
		}
	],
	transactionHash: '0x6ac93dd605943523128ca3ddfe93994c830637f6d57926d649c568796378e1ad',
	receipt: {
		to: null,
		from: '0xE9bE6df23C7f9CaBa3005DA2fa2d8714d340D0aF',
		contractAddress: '0xCDE93bdA2a706Fc652F7e75241bA949aCB9f4Fe5',
		transactionIndex: 84,
		gasUsed: '677580',
		logsBloom:
			'0x00000000000000000000000000000000000000000000000000800000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000001000000000000000000000000000000000000020000000000000000000800040000000000000000000000000000400000000000000000000000000000000000000000000000010000000000000000000000000000000000000800000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002060000000000000000000000000000000000000000000000000000000000000000000',
		blockHash: '0xb79df72dd2dd77f472174fd2472e0f74eec0c69781b815693377e8f66a20d48f',
		transactionHash: '0x6ac93dd605943523128ca3ddfe93994c830637f6d57926d649c568796378e1ad',
		logs: [
			{
				transactionIndex: 84,
				blockNumber: 14730691,
				transactionHash: '0x6ac93dd605943523128ca3ddfe93994c830637f6d57926d649c568796378e1ad',
				address: '0xCDE93bdA2a706Fc652F7e75241bA949aCB9f4Fe5',
				topics: [
					'0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0',
					'0x0000000000000000000000000000000000000000000000000000000000000000',
					'0x000000000000000000000000e9be6df23c7f9caba3005da2fa2d8714d340d0af'
				],
				data: '0x',
				logIndex: 57,
				blockHash: '0xb79df72dd2dd77f472174fd2472e0f74eec0c69781b815693377e8f66a20d48f'
			},
			{
				transactionIndex: 84,
				blockNumber: 14730691,
				transactionHash: '0x6ac93dd605943523128ca3ddfe93994c830637f6d57926d649c568796378e1ad',
				address: '0xCDE93bdA2a706Fc652F7e75241bA949aCB9f4Fe5',
				topics: [
					'0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0',
					'0x000000000000000000000000e9be6df23c7f9caba3005da2fa2d8714d340d0af',
					'0x000000000000000000000000e9be6df23c7f9caba3005da2fa2d8714d340d0af'
				],
				data: '0x',
				logIndex: 58,
				blockHash: '0xb79df72dd2dd77f472174fd2472e0f74eec0c69781b815693377e8f66a20d48f'
			}
		],
		blockNumber: 14730691,
		cumulativeGasUsed: '4318868',
		status: 1,
		byzantium: true
	},
	args: ['0xE9bE6df23C7f9CaBa3005DA2fa2d8714d340D0aF'],
	numDeployments: 1,
	solcInputHash: '87acdcf5deeaa43ae3ecf62f45455645',
	metadata:
		'{"compiler":{"version":"0.8.6+commit.11564f7e"},"language":"Solidity","output":{"abi":[{"inputs":[{"internalType":"address","name":"_owner","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"uint256","name":"prod1","type":"uint256"},{"internalType":"uint256","name":"denominator","type":"uint256"}],"name":"PRBMath__MulDivOverflow","type":"error"},{"inputs":[],"name":"PRICE_FEED_ALREADY_EXISTS","type":"error"},{"inputs":[],"name":"PRICE_FEED_NOT_FOUND","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"currency","type":"uint256"},{"indexed":true,"internalType":"uint256","name":"base","type":"uint256"},{"indexed":false,"internalType":"contract IJBPriceFeed","name":"feed","type":"address"}],"name":"AddFeed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"inputs":[{"internalType":"uint256","name":"_currency","type":"uint256"},{"internalType":"uint256","name":"_base","type":"uint256"},{"internalType":"contract IJBPriceFeed","name":"_feed","type":"address"}],"name":"addFeedFor","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"feedFor","outputs":[{"internalType":"contract IJBPriceFeed","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_currency","type":"uint256"},{"internalType":"uint256","name":"_base","type":"uint256"},{"internalType":"uint256","name":"_decimals","type":"uint256"}],"name":"priceFor","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"}],"devdoc":{"details":"Adheres to - IJBPrices: General interface for the methods in this contract that interact with the blockchain\'s state according to the protocol\'s rules.Inherits from - Ownable: Includes convenience functionality for checking a message sender\'s permissions before executing certain transactions.","kind":"dev","methods":{"addFeedFor(uint256,uint256,address)":{"details":"Current feeds can\'t be modified.","params":{"_base":"The base currency unit being priced by the feed.","_currency":"The currency units the feed\'s resulting price is in terms of.","_feed":"The price feed being added."}},"constructor":{"params":{"_owner":"The address that will own the contract."}},"owner()":{"details":"Returns the address of the current owner."},"priceFor(uint256,uint256,uint256)":{"params":{"_base":"The base currency unit being priced.","_currency":"The currency units the resulting price is in terms of.","_decimals":"The number of decimals the returned fixed point price should include."},"returns":{"_0":"The price of the currency in terms of the base, as a fixed point number with the specified number of decimals."}},"renounceOwnership()":{"details":"Leaves the contract without owner. It will not be possible to call `onlyOwner` functions anymore. Can only be called by the current owner. NOTE: Renouncing ownership will leave the contract without an owner, thereby removing any functionality that is only available to the owner."},"transferOwnership(address)":{"details":"Transfers ownership of the contract to a new account (`newOwner`). Can only be called by the current owner."}},"stateVariables":{"feedFor":{"details":"The feed returns the number of `_currency` units that can be converted to 1 `_base` unit. _currency The currency units the feed\'s resulting price is in terms of. _base The base currency unit being priced by the feed."}},"version":1},"userdoc":{"errors":{"PRBMath__MulDivOverflow(uint256,uint256)":[{"notice":"Emitted when the result overflows uint256."}]},"kind":"user","methods":{"addFeedFor(uint256,uint256,address)":{"notice":" Add a price feed for a currency in terms of the provided base currency."},"feedFor(uint256,uint256)":{"notice":" The available price feeds."},"priceFor(uint256,uint256,uint256)":{"notice":"Gets the number of `_currency` units that can be converted to 1 `_base` unit."}},"notice":" Manages and normalizes price feeds.","version":1}},"settings":{"compilationTarget":{"contracts/JBPrices.sol":"JBPrices"},"evmVersion":"berlin","libraries":{},"metadata":{"bytecodeHash":"ipfs","useLiteralContent":true},"optimizer":{"enabled":true,"runs":10000},"remappings":[]},"sources":{"@openzeppelin/contracts/access/Ownable.sol":{"content":"// SPDX-License-Identifier: MIT\\n// OpenZeppelin Contracts v4.4.1 (access/Ownable.sol)\\n\\npragma solidity ^0.8.0;\\n\\nimport \\"../utils/Context.sol\\";\\n\\n/**\\n * @dev Contract module which provides a basic access control mechanism, where\\n * there is an account (an owner) that can be granted exclusive access to\\n * specific functions.\\n *\\n * By default, the owner account will be the one that deploys the contract. This\\n * can later be changed with {transferOwnership}.\\n *\\n * This module is used through inheritance. It will make available the modifier\\n * `onlyOwner`, which can be applied to your functions to restrict their use to\\n * the owner.\\n */\\nabstract contract Ownable is Context {\\n    address private _owner;\\n\\n    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);\\n\\n    /**\\n     * @dev Initializes the contract setting the deployer as the initial owner.\\n     */\\n    constructor() {\\n        _transferOwnership(_msgSender());\\n    }\\n\\n    /**\\n     * @dev Returns the address of the current owner.\\n     */\\n    function owner() public view virtual returns (address) {\\n        return _owner;\\n    }\\n\\n    /**\\n     * @dev Throws if called by any account other than the owner.\\n     */\\n    modifier onlyOwner() {\\n        require(owner() == _msgSender(), \\"Ownable: caller is not the owner\\");\\n        _;\\n    }\\n\\n    /**\\n     * @dev Leaves the contract without owner. It will not be possible to call\\n     * `onlyOwner` functions anymore. Can only be called by the current owner.\\n     *\\n     * NOTE: Renouncing ownership will leave the contract without an owner,\\n     * thereby removing any functionality that is only available to the owner.\\n     */\\n    function renounceOwnership() public virtual onlyOwner {\\n        _transferOwnership(address(0));\\n    }\\n\\n    /**\\n     * @dev Transfers ownership of the contract to a new account (`newOwner`).\\n     * Can only be called by the current owner.\\n     */\\n    function transferOwnership(address newOwner) public virtual onlyOwner {\\n        require(newOwner != address(0), \\"Ownable: new owner is the zero address\\");\\n        _transferOwnership(newOwner);\\n    }\\n\\n    /**\\n     * @dev Transfers ownership of the contract to a new account (`newOwner`).\\n     * Internal function without access restriction.\\n     */\\n    function _transferOwnership(address newOwner) internal virtual {\\n        address oldOwner = _owner;\\n        _owner = newOwner;\\n        emit OwnershipTransferred(oldOwner, newOwner);\\n    }\\n}\\n","keccak256":"0x24e0364e503a9bbde94c715d26573a76f14cd2a202d45f96f52134ab806b67b9","license":"MIT"},"@openzeppelin/contracts/utils/Context.sol":{"content":"// SPDX-License-Identifier: MIT\\n// OpenZeppelin Contracts v4.4.1 (utils/Context.sol)\\n\\npragma solidity ^0.8.0;\\n\\n/**\\n * @dev Provides information about the current execution context, including the\\n * sender of the transaction and its data. While these are generally available\\n * via msg.sender and msg.data, they should not be accessed in such a direct\\n * manner, since when dealing with meta-transactions the account sending and\\n * paying for execution may not be the actual sender (as far as an application\\n * is concerned).\\n *\\n * This contract is only required for intermediate, library-like contracts.\\n */\\nabstract contract Context {\\n    function _msgSender() internal view virtual returns (address) {\\n        return msg.sender;\\n    }\\n\\n    function _msgData() internal view virtual returns (bytes calldata) {\\n        return msg.data;\\n    }\\n}\\n","keccak256":"0xe2e337e6dde9ef6b680e07338c493ebea1b5fd09b43424112868e9cc1706bca7","license":"MIT"},"@paulrberg/contracts/math/PRBMath.sol":{"content":"// SPDX-License-Identifier: Unlicense\\npragma solidity >=0.8.4;\\n\\nimport \\"prb-math/contracts/PRBMath.sol\\";\\n","keccak256":"0x42821345981bc0434a90ba2268a2f5278dfe9e38166981d72fc7f3b776a29495","license":"Unlicense"},"contracts/JBPrices.sol":{"content":"// SPDX-License-Identifier: MIT\\npragma solidity 0.8.6;\\n\\nimport \'@openzeppelin/contracts/access/Ownable.sol\';\\nimport \'@paulrberg/contracts/math/PRBMath.sol\';\\nimport \'./interfaces/IJBPrices.sol\';\\n\\n/** \\n  @notice \\n  Manages and normalizes price feeds.\\n\\n  @dev\\n  Adheres to -\\n  IJBPrices: General interface for the methods in this contract that interact with the blockchain\'s state according to the protocol\'s rules.\\n\\n  @dev\\n  Inherits from -\\n  Ownable: Includes convenience functionality for checking a message sender\'s permissions before executing certain transactions.\\n*/\\ncontract JBPrices is IJBPrices, Ownable {\\n  //*********************************************************************//\\n  // --------------------------- custom errors ------------------------- //\\n  //*********************************************************************//\\n  error PRICE_FEED_ALREADY_EXISTS();\\n  error PRICE_FEED_NOT_FOUND();\\n\\n  //*********************************************************************//\\n  // --------------------- public stored properties -------------------- //\\n  //*********************************************************************//\\n\\n  /** \\n    @notice \\n    The available price feeds.\\n\\n    @dev\\n    The feed returns the number of `_currency` units that can be converted to 1 `_base` unit.\\n\\n    _currency The currency units the feed\'s resulting price is in terms of.\\n    _base The base currency unit being priced by the feed.\\n  */\\n  mapping(uint256 => mapping(uint256 => IJBPriceFeed)) public override feedFor;\\n\\n  //*********************************************************************//\\n  // ------------------------- external views -------------------------- //\\n  //*********************************************************************//\\n\\n  /** \\n    @notice\\n    Gets the number of `_currency` units that can be converted to 1 `_base` unit.\\n\\n    @param _currency The currency units the resulting price is in terms of.\\n    @param _base The base currency unit being priced.\\n    @param _decimals The number of decimals the returned fixed point price should include.\\n    \\n    @return The price of the currency in terms of the base, as a fixed point number with the specified number of decimals.\\n  */\\n  function priceFor(\\n    uint256 _currency,\\n    uint256 _base,\\n    uint256 _decimals\\n  ) external view override returns (uint256) {\\n    // If the currency is the base, return 1 since they are priced the same. Include the desired number of decimals.\\n    if (_currency == _base) return 10**_decimals;\\n\\n    // Get a reference to the feed.\\n    IJBPriceFeed _feed = feedFor[_currency][_base];\\n\\n    // If it exists, return the price.\\n    if (_feed != IJBPriceFeed(address(0))) return _feed.currentPrice(_decimals);\\n\\n    // Get the inverse feed.\\n    _feed = feedFor[_base][_currency];\\n\\n    // If it exists, return the inverse price.\\n    if (_feed != IJBPriceFeed(address(0)))\\n      return PRBMath.mulDiv(10**_decimals, 10**_decimals, _feed.currentPrice(_decimals));\\n\\n    // No price feed available, revert.\\n    revert PRICE_FEED_NOT_FOUND();\\n  }\\n\\n  //*********************************************************************//\\n  // ---------------------------- constructor -------------------------- //\\n  //*********************************************************************//\\n\\n  /** \\n    @param _owner The address that will own the contract.\\n  */\\n  constructor(address _owner) {\\n    // Transfer the ownership.\\n    transferOwnership(_owner);\\n  }\\n\\n  //*********************************************************************//\\n  // ---------------------- external transactions ---------------------- //\\n  //*********************************************************************//\\n\\n  /** \\n    @notice \\n    Add a price feed for a currency in terms of the provided base currency.\\n\\n    @dev\\n    Current feeds can\'t be modified.\\n\\n    @param _currency The currency units the feed\'s resulting price is in terms of.\\n    @param _base The base currency unit being priced by the feed.\\n    @param _feed The price feed being added.\\n  */\\n  function addFeedFor(\\n    uint256 _currency,\\n    uint256 _base,\\n    IJBPriceFeed _feed\\n  ) external override onlyOwner {\\n    // There can\'t already be a feed for the specified currency.\\n    if (feedFor[_currency][_base] != IJBPriceFeed(address(0))) revert PRICE_FEED_ALREADY_EXISTS();\\n\\n    // Store the feed.\\n    feedFor[_currency][_base] = _feed;\\n\\n    emit AddFeed(_currency, _base, _feed);\\n  }\\n}\\n","keccak256":"0xe5afab5f2e10b87bb113df7781c9917ad820b0c67db1e98d2303eb5cfe52741f","license":"MIT"},"contracts/interfaces/IJBPriceFeed.sol":{"content":"// SPDX-License-Identifier: MIT\\npragma solidity 0.8.6;\\n\\ninterface IJBPriceFeed {\\n  function currentPrice(uint256 _targetDecimals) external view returns (uint256);\\n}\\n","keccak256":"0xac22ef5e35cdd64b1467416fd142801856ce867ecde41582f3aa437c955c9be2","license":"MIT"},"contracts/interfaces/IJBPrices.sol":{"content":"// SPDX-License-Identifier: MIT\\npragma solidity 0.8.6;\\n\\nimport \'./IJBPriceFeed.sol\';\\n\\ninterface IJBPrices {\\n  event AddFeed(uint256 indexed currency, uint256 indexed base, IJBPriceFeed feed);\\n\\n  function feedFor(uint256 _currency, uint256 _base) external view returns (IJBPriceFeed);\\n\\n  function priceFor(\\n    uint256 _currency,\\n    uint256 _base,\\n    uint256 _decimals\\n  ) external view returns (uint256);\\n\\n  function addFeedFor(\\n    uint256 _currency,\\n    uint256 _base,\\n    IJBPriceFeed _priceFeed\\n  ) external;\\n}\\n","keccak256":"0x0d9c3fce264953aaeca00db1f8d8a3cf99876fa63366f5a2148f7966967b39b7","license":"MIT"},"prb-math/contracts/PRBMath.sol":{"content":"// SPDX-License-Identifier: Unlicense\\npragma solidity >=0.8.4;\\n\\n/// @notice Emitted when the result overflows uint256.\\nerror PRBMath__MulDivFixedPointOverflow(uint256 prod1);\\n\\n/// @notice Emitted when the result overflows uint256.\\nerror PRBMath__MulDivOverflow(uint256 prod1, uint256 denominator);\\n\\n/// @notice Emitted when one of the inputs is type(int256).min.\\nerror PRBMath__MulDivSignedInputTooSmall();\\n\\n/// @notice Emitted when the intermediary absolute result overflows int256.\\nerror PRBMath__MulDivSignedOverflow(uint256 rAbs);\\n\\n/// @notice Emitted when the input is MIN_SD59x18.\\nerror PRBMathSD59x18__AbsInputTooSmall();\\n\\n/// @notice Emitted when ceiling a number overflows SD59x18.\\nerror PRBMathSD59x18__CeilOverflow(int256 x);\\n\\n/// @notice Emitted when one of the inputs is MIN_SD59x18.\\nerror PRBMathSD59x18__DivInputTooSmall();\\n\\n/// @notice Emitted when one of the intermediary unsigned results overflows SD59x18.\\nerror PRBMathSD59x18__DivOverflow(uint256 rAbs);\\n\\n/// @notice Emitted when the input is greater than 133.084258667509499441.\\nerror PRBMathSD59x18__ExpInputTooBig(int256 x);\\n\\n/// @notice Emitted when the input is greater than 192.\\nerror PRBMathSD59x18__Exp2InputTooBig(int256 x);\\n\\n/// @notice Emitted when flooring a number underflows SD59x18.\\nerror PRBMathSD59x18__FloorUnderflow(int256 x);\\n\\n/// @notice Emitted when converting a basic integer to the fixed-point format overflows SD59x18.\\nerror PRBMathSD59x18__FromIntOverflow(int256 x);\\n\\n/// @notice Emitted when converting a basic integer to the fixed-point format underflows SD59x18.\\nerror PRBMathSD59x18__FromIntUnderflow(int256 x);\\n\\n/// @notice Emitted when the product of the inputs is negative.\\nerror PRBMathSD59x18__GmNegativeProduct(int256 x, int256 y);\\n\\n/// @notice Emitted when multiplying the inputs overflows SD59x18.\\nerror PRBMathSD59x18__GmOverflow(int256 x, int256 y);\\n\\n/// @notice Emitted when the input is less than or equal to zero.\\nerror PRBMathSD59x18__LogInputTooSmall(int256 x);\\n\\n/// @notice Emitted when one of the inputs is MIN_SD59x18.\\nerror PRBMathSD59x18__MulInputTooSmall();\\n\\n/// @notice Emitted when the intermediary absolute result overflows SD59x18.\\nerror PRBMathSD59x18__MulOverflow(uint256 rAbs);\\n\\n/// @notice Emitted when the intermediary absolute result overflows SD59x18.\\nerror PRBMathSD59x18__PowuOverflow(uint256 rAbs);\\n\\n/// @notice Emitted when the input is negative.\\nerror PRBMathSD59x18__SqrtNegativeInput(int256 x);\\n\\n/// @notice Emitted when the calculating the square root overflows SD59x18.\\nerror PRBMathSD59x18__SqrtOverflow(int256 x);\\n\\n/// @notice Emitted when addition overflows UD60x18.\\nerror PRBMathUD60x18__AddOverflow(uint256 x, uint256 y);\\n\\n/// @notice Emitted when ceiling a number overflows UD60x18.\\nerror PRBMathUD60x18__CeilOverflow(uint256 x);\\n\\n/// @notice Emitted when the input is greater than 133.084258667509499441.\\nerror PRBMathUD60x18__ExpInputTooBig(uint256 x);\\n\\n/// @notice Emitted when the input is greater than 192.\\nerror PRBMathUD60x18__Exp2InputTooBig(uint256 x);\\n\\n/// @notice Emitted when converting a basic integer to the fixed-point format format overflows UD60x18.\\nerror PRBMathUD60x18__FromUintOverflow(uint256 x);\\n\\n/// @notice Emitted when multiplying the inputs overflows UD60x18.\\nerror PRBMathUD60x18__GmOverflow(uint256 x, uint256 y);\\n\\n/// @notice Emitted when the input is less than 1.\\nerror PRBMathUD60x18__LogInputTooSmall(uint256 x);\\n\\n/// @notice Emitted when the calculating the square root overflows UD60x18.\\nerror PRBMathUD60x18__SqrtOverflow(uint256 x);\\n\\n/// @notice Emitted when subtraction underflows UD60x18.\\nerror PRBMathUD60x18__SubUnderflow(uint256 x, uint256 y);\\n\\n/// @dev Common mathematical functions used in both PRBMathSD59x18 and PRBMathUD60x18. Note that this shared library\\n/// does not always assume the signed 59.18-decimal fixed-point or the unsigned 60.18-decimal fixed-point\\n/// representation. When it does not, it is explicitly mentioned in the NatSpec documentation.\\nlibrary PRBMath {\\n    /// STRUCTS ///\\n\\n    struct SD59x18 {\\n        int256 value;\\n    }\\n\\n    struct UD60x18 {\\n        uint256 value;\\n    }\\n\\n    /// STORAGE ///\\n\\n    /// @dev How many trailing decimals can be represented.\\n    uint256 internal constant SCALE = 1e18;\\n\\n    /// @dev Largest power of two divisor of SCALE.\\n    uint256 internal constant SCALE_LPOTD = 262144;\\n\\n    /// @dev SCALE inverted mod 2^256.\\n    uint256 internal constant SCALE_INVERSE =\\n        78156646155174841979727994598816262306175212592076161876661_508869554232690281;\\n\\n    /// FUNCTIONS ///\\n\\n    /// @notice Calculates the binary exponent of x using the binary fraction method.\\n    /// @dev Has to use 192.64-bit fixed-point numbers.\\n    /// See https://ethereum.stackexchange.com/a/96594/24693.\\n    /// @param x The exponent as an unsigned 192.64-bit fixed-point number.\\n    /// @return result The result as an unsigned 60.18-decimal fixed-point number.\\n    function exp2(uint256 x) internal pure returns (uint256 result) {\\n        unchecked {\\n            // Start from 0.5 in the 192.64-bit fixed-point format.\\n            result = 0x800000000000000000000000000000000000000000000000;\\n\\n            // Multiply the result by root(2, 2^-i) when the bit at position i is 1. None of the intermediary results overflows\\n            // because the initial result is 2^191 and all magic factors are less than 2^65.\\n            if (x & 0x8000000000000000 > 0) {\\n                result = (result * 0x16A09E667F3BCC909) >> 64;\\n            }\\n            if (x & 0x4000000000000000 > 0) {\\n                result = (result * 0x1306FE0A31B7152DF) >> 64;\\n            }\\n            if (x & 0x2000000000000000 > 0) {\\n                result = (result * 0x1172B83C7D517ADCE) >> 64;\\n            }\\n            if (x & 0x1000000000000000 > 0) {\\n                result = (result * 0x10B5586CF9890F62A) >> 64;\\n            }\\n            if (x & 0x800000000000000 > 0) {\\n                result = (result * 0x1059B0D31585743AE) >> 64;\\n            }\\n            if (x & 0x400000000000000 > 0) {\\n                result = (result * 0x102C9A3E778060EE7) >> 64;\\n            }\\n            if (x & 0x200000000000000 > 0) {\\n                result = (result * 0x10163DA9FB33356D8) >> 64;\\n            }\\n            if (x & 0x100000000000000 > 0) {\\n                result = (result * 0x100B1AFA5ABCBED61) >> 64;\\n            }\\n            if (x & 0x80000000000000 > 0) {\\n                result = (result * 0x10058C86DA1C09EA2) >> 64;\\n            }\\n            if (x & 0x40000000000000 > 0) {\\n                result = (result * 0x1002C605E2E8CEC50) >> 64;\\n            }\\n            if (x & 0x20000000000000 > 0) {\\n                result = (result * 0x100162F3904051FA1) >> 64;\\n            }\\n            if (x & 0x10000000000000 > 0) {\\n                result = (result * 0x1000B175EFFDC76BA) >> 64;\\n            }\\n            if (x & 0x8000000000000 > 0) {\\n                result = (result * 0x100058BA01FB9F96D) >> 64;\\n            }\\n            if (x & 0x4000000000000 > 0) {\\n                result = (result * 0x10002C5CC37DA9492) >> 64;\\n            }\\n            if (x & 0x2000000000000 > 0) {\\n                result = (result * 0x1000162E525EE0547) >> 64;\\n            }\\n            if (x & 0x1000000000000 > 0) {\\n                result = (result * 0x10000B17255775C04) >> 64;\\n            }\\n            if (x & 0x800000000000 > 0) {\\n                result = (result * 0x1000058B91B5BC9AE) >> 64;\\n            }\\n            if (x & 0x400000000000 > 0) {\\n                result = (result * 0x100002C5C89D5EC6D) >> 64;\\n            }\\n            if (x & 0x200000000000 > 0) {\\n                result = (result * 0x10000162E43F4F831) >> 64;\\n            }\\n            if (x & 0x100000000000 > 0) {\\n                result = (result * 0x100000B1721BCFC9A) >> 64;\\n            }\\n            if (x & 0x80000000000 > 0) {\\n                result = (result * 0x10000058B90CF1E6E) >> 64;\\n            }\\n            if (x & 0x40000000000 > 0) {\\n                result = (result * 0x1000002C5C863B73F) >> 64;\\n            }\\n            if (x & 0x20000000000 > 0) {\\n                result = (result * 0x100000162E430E5A2) >> 64;\\n            }\\n            if (x & 0x10000000000 > 0) {\\n                result = (result * 0x1000000B172183551) >> 64;\\n            }\\n            if (x & 0x8000000000 > 0) {\\n                result = (result * 0x100000058B90C0B49) >> 64;\\n            }\\n            if (x & 0x4000000000 > 0) {\\n                result = (result * 0x10000002C5C8601CC) >> 64;\\n            }\\n            if (x & 0x2000000000 > 0) {\\n                result = (result * 0x1000000162E42FFF0) >> 64;\\n            }\\n            if (x & 0x1000000000 > 0) {\\n                result = (result * 0x10000000B17217FBB) >> 64;\\n            }\\n            if (x & 0x800000000 > 0) {\\n                result = (result * 0x1000000058B90BFCE) >> 64;\\n            }\\n            if (x & 0x400000000 > 0) {\\n                result = (result * 0x100000002C5C85FE3) >> 64;\\n            }\\n            if (x & 0x200000000 > 0) {\\n                result = (result * 0x10000000162E42FF1) >> 64;\\n            }\\n            if (x & 0x100000000 > 0) {\\n                result = (result * 0x100000000B17217F8) >> 64;\\n            }\\n            if (x & 0x80000000 > 0) {\\n                result = (result * 0x10000000058B90BFC) >> 64;\\n            }\\n            if (x & 0x40000000 > 0) {\\n                result = (result * 0x1000000002C5C85FE) >> 64;\\n            }\\n            if (x & 0x20000000 > 0) {\\n                result = (result * 0x100000000162E42FF) >> 64;\\n            }\\n            if (x & 0x10000000 > 0) {\\n                result = (result * 0x1000000000B17217F) >> 64;\\n            }\\n            if (x & 0x8000000 > 0) {\\n                result = (result * 0x100000000058B90C0) >> 64;\\n            }\\n            if (x & 0x4000000 > 0) {\\n                result = (result * 0x10000000002C5C860) >> 64;\\n            }\\n            if (x & 0x2000000 > 0) {\\n                result = (result * 0x1000000000162E430) >> 64;\\n            }\\n            if (x & 0x1000000 > 0) {\\n                result = (result * 0x10000000000B17218) >> 64;\\n            }\\n            if (x & 0x800000 > 0) {\\n                result = (result * 0x1000000000058B90C) >> 64;\\n            }\\n            if (x & 0x400000 > 0) {\\n                result = (result * 0x100000000002C5C86) >> 64;\\n            }\\n            if (x & 0x200000 > 0) {\\n                result = (result * 0x10000000000162E43) >> 64;\\n            }\\n            if (x & 0x100000 > 0) {\\n                result = (result * 0x100000000000B1721) >> 64;\\n            }\\n            if (x & 0x80000 > 0) {\\n                result = (result * 0x10000000000058B91) >> 64;\\n            }\\n            if (x & 0x40000 > 0) {\\n                result = (result * 0x1000000000002C5C8) >> 64;\\n            }\\n            if (x & 0x20000 > 0) {\\n                result = (result * 0x100000000000162E4) >> 64;\\n            }\\n            if (x & 0x10000 > 0) {\\n                result = (result * 0x1000000000000B172) >> 64;\\n            }\\n            if (x & 0x8000 > 0) {\\n                result = (result * 0x100000000000058B9) >> 64;\\n            }\\n            if (x & 0x4000 > 0) {\\n                result = (result * 0x10000000000002C5D) >> 64;\\n            }\\n            if (x & 0x2000 > 0) {\\n                result = (result * 0x1000000000000162E) >> 64;\\n            }\\n            if (x & 0x1000 > 0) {\\n                result = (result * 0x10000000000000B17) >> 64;\\n            }\\n            if (x & 0x800 > 0) {\\n                result = (result * 0x1000000000000058C) >> 64;\\n            }\\n            if (x & 0x400 > 0) {\\n                result = (result * 0x100000000000002C6) >> 64;\\n            }\\n            if (x & 0x200 > 0) {\\n                result = (result * 0x10000000000000163) >> 64;\\n            }\\n            if (x & 0x100 > 0) {\\n                result = (result * 0x100000000000000B1) >> 64;\\n            }\\n            if (x & 0x80 > 0) {\\n                result = (result * 0x10000000000000059) >> 64;\\n            }\\n            if (x & 0x40 > 0) {\\n                result = (result * 0x1000000000000002C) >> 64;\\n            }\\n            if (x & 0x20 > 0) {\\n                result = (result * 0x10000000000000016) >> 64;\\n            }\\n            if (x & 0x10 > 0) {\\n                result = (result * 0x1000000000000000B) >> 64;\\n            }\\n            if (x & 0x8 > 0) {\\n                result = (result * 0x10000000000000006) >> 64;\\n            }\\n            if (x & 0x4 > 0) {\\n                result = (result * 0x10000000000000003) >> 64;\\n            }\\n            if (x & 0x2 > 0) {\\n                result = (result * 0x10000000000000001) >> 64;\\n            }\\n            if (x & 0x1 > 0) {\\n                result = (result * 0x10000000000000001) >> 64;\\n            }\\n\\n            // We\'re doing two things at the same time:\\n            //\\n            //   1. Multiply the result by 2^n + 1, where \\"2^n\\" is the integer part and the one is added to account for\\n            //      the fact that we initially set the result to 0.5. This is accomplished by subtracting from 191\\n            //      rather than 192.\\n            //   2. Convert the result to the unsigned 60.18-decimal fixed-point format.\\n            //\\n            // This works because 2^(191-ip) = 2^ip / 2^191, where \\"ip\\" is the integer part \\"2^n\\".\\n            result *= SCALE;\\n            result >>= (191 - (x >> 64));\\n        }\\n    }\\n\\n    /// @notice Finds the zero-based index of the first one in the binary representation of x.\\n    /// @dev See the note on msb in the \\"Find First Set\\" Wikipedia article https://en.wikipedia.org/wiki/Find_first_set\\n    /// @param x The uint256 number for which to find the index of the most significant bit.\\n    /// @return msb The index of the most significant bit as an uint256.\\n    function mostSignificantBit(uint256 x) internal pure returns (uint256 msb) {\\n        if (x >= 2**128) {\\n            x >>= 128;\\n            msb += 128;\\n        }\\n        if (x >= 2**64) {\\n            x >>= 64;\\n            msb += 64;\\n        }\\n        if (x >= 2**32) {\\n            x >>= 32;\\n            msb += 32;\\n        }\\n        if (x >= 2**16) {\\n            x >>= 16;\\n            msb += 16;\\n        }\\n        if (x >= 2**8) {\\n            x >>= 8;\\n            msb += 8;\\n        }\\n        if (x >= 2**4) {\\n            x >>= 4;\\n            msb += 4;\\n        }\\n        if (x >= 2**2) {\\n            x >>= 2;\\n            msb += 2;\\n        }\\n        if (x >= 2**1) {\\n            // No need to shift x any more.\\n            msb += 1;\\n        }\\n    }\\n\\n    /// @notice Calculates floor(x*y\\u00f7denominator) with full precision.\\n    ///\\n    /// @dev Credit to Remco Bloemen under MIT license https://xn--2-umb.com/21/muldiv.\\n    ///\\n    /// Requirements:\\n    /// - The denominator cannot be zero.\\n    /// - The result must fit within uint256.\\n    ///\\n    /// Caveats:\\n    /// - This function does not work with fixed-point numbers.\\n    ///\\n    /// @param x The multiplicand as an uint256.\\n    /// @param y The multiplier as an uint256.\\n    /// @param denominator The divisor as an uint256.\\n    /// @return result The result as an uint256.\\n    function mulDiv(\\n        uint256 x,\\n        uint256 y,\\n        uint256 denominator\\n    ) internal pure returns (uint256 result) {\\n        // 512-bit multiply [prod1 prod0] = x * y. Compute the product mod 2^256 and mod 2^256 - 1, then use\\n        // use the Chinese Remainder Theorem to reconstruct the 512 bit result. The result is stored in two 256\\n        // variables such that product = prod1 * 2^256 + prod0.\\n        uint256 prod0; // Least significant 256 bits of the product\\n        uint256 prod1; // Most significant 256 bits of the product\\n        assembly {\\n            let mm := mulmod(x, y, not(0))\\n            prod0 := mul(x, y)\\n            prod1 := sub(sub(mm, prod0), lt(mm, prod0))\\n        }\\n\\n        // Handle non-overflow cases, 256 by 256 division.\\n        if (prod1 == 0) {\\n            unchecked {\\n                result = prod0 / denominator;\\n            }\\n            return result;\\n        }\\n\\n        // Make sure the result is less than 2^256. Also prevents denominator == 0.\\n        if (prod1 >= denominator) {\\n            revert PRBMath__MulDivOverflow(prod1, denominator);\\n        }\\n\\n        ///////////////////////////////////////////////\\n        // 512 by 256 division.\\n        ///////////////////////////////////////////////\\n\\n        // Make division exact by subtracting the remainder from [prod1 prod0].\\n        uint256 remainder;\\n        assembly {\\n            // Compute remainder using mulmod.\\n            remainder := mulmod(x, y, denominator)\\n\\n            // Subtract 256 bit number from 512 bit number.\\n            prod1 := sub(prod1, gt(remainder, prod0))\\n            prod0 := sub(prod0, remainder)\\n        }\\n\\n        // Factor powers of two out of denominator and compute largest power of two divisor of denominator. Always >= 1.\\n        // See https://cs.stackexchange.com/q/138556/92363.\\n        unchecked {\\n            // Does not overflow because the denominator cannot be zero at this stage in the function.\\n            uint256 lpotdod = denominator & (~denominator + 1);\\n            assembly {\\n                // Divide denominator by lpotdod.\\n                denominator := div(denominator, lpotdod)\\n\\n                // Divide [prod1 prod0] by lpotdod.\\n                prod0 := div(prod0, lpotdod)\\n\\n                // Flip lpotdod such that it is 2^256 / lpotdod. If lpotdod is zero, then it becomes one.\\n                lpotdod := add(div(sub(0, lpotdod), lpotdod), 1)\\n            }\\n\\n            // Shift in bits from prod1 into prod0.\\n            prod0 |= prod1 * lpotdod;\\n\\n            // Invert denominator mod 2^256. Now that denominator is an odd number, it has an inverse modulo 2^256 such\\n            // that denominator * inv = 1 mod 2^256. Compute the inverse by starting with a seed that is correct for\\n            // four bits. That is, denominator * inv = 1 mod 2^4.\\n            uint256 inverse = (3 * denominator) ^ 2;\\n\\n            // Use the Newton-Raphson iteration to improve the precision. Thanks to Hensel\'s lifting lemma, this also works\\n            // in modular arithmetic, doubling the correct bits in each step.\\n            inverse *= 2 - denominator * inverse; // inverse mod 2^8\\n            inverse *= 2 - denominator * inverse; // inverse mod 2^16\\n            inverse *= 2 - denominator * inverse; // inverse mod 2^32\\n            inverse *= 2 - denominator * inverse; // inverse mod 2^64\\n            inverse *= 2 - denominator * inverse; // inverse mod 2^128\\n            inverse *= 2 - denominator * inverse; // inverse mod 2^256\\n\\n            // Because the division is now exact we can divide by multiplying with the modular inverse of denominator.\\n            // This will give us the correct result modulo 2^256. Since the preconditions guarantee that the outcome is\\n            // less than 2^256, this is the final result. We don\'t need to compute the high bits of the result and prod1\\n            // is no longer required.\\n            result = prod0 * inverse;\\n            return result;\\n        }\\n    }\\n\\n    /// @notice Calculates floor(x*y\\u00f71e18) with full precision.\\n    ///\\n    /// @dev Variant of \\"mulDiv\\" with constant folding, i.e. in which the denominator is always 1e18. Before returning the\\n    /// final result, we add 1 if (x * y) % SCALE >= HALF_SCALE. Without this, 6.6e-19 would be truncated to 0 instead of\\n    /// being rounded to 1e-18.  See \\"Listing 6\\" and text above it at https://accu.org/index.php/journals/1717.\\n    ///\\n    /// Requirements:\\n    /// - The result must fit within uint256.\\n    ///\\n    /// Caveats:\\n    /// - The body is purposely left uncommented; see the NatSpec comments in \\"PRBMath.mulDiv\\" to understand how this works.\\n    /// - It is assumed that the result can never be type(uint256).max when x and y solve the following two equations:\\n    ///     1. x * y = type(uint256).max * SCALE\\n    ///     2. (x * y) % SCALE >= SCALE / 2\\n    ///\\n    /// @param x The multiplicand as an unsigned 60.18-decimal fixed-point number.\\n    /// @param y The multiplier as an unsigned 60.18-decimal fixed-point number.\\n    /// @return result The result as an unsigned 60.18-decimal fixed-point number.\\n    function mulDivFixedPoint(uint256 x, uint256 y) internal pure returns (uint256 result) {\\n        uint256 prod0;\\n        uint256 prod1;\\n        assembly {\\n            let mm := mulmod(x, y, not(0))\\n            prod0 := mul(x, y)\\n            prod1 := sub(sub(mm, prod0), lt(mm, prod0))\\n        }\\n\\n        if (prod1 >= SCALE) {\\n            revert PRBMath__MulDivFixedPointOverflow(prod1);\\n        }\\n\\n        uint256 remainder;\\n        uint256 roundUpUnit;\\n        assembly {\\n            remainder := mulmod(x, y, SCALE)\\n            roundUpUnit := gt(remainder, 499999999999999999)\\n        }\\n\\n        if (prod1 == 0) {\\n            unchecked {\\n                result = (prod0 / SCALE) + roundUpUnit;\\n                return result;\\n            }\\n        }\\n\\n        assembly {\\n            result := add(\\n                mul(\\n                    or(\\n                        div(sub(prod0, remainder), SCALE_LPOTD),\\n                        mul(sub(prod1, gt(remainder, prod0)), add(div(sub(0, SCALE_LPOTD), SCALE_LPOTD), 1))\\n                    ),\\n                    SCALE_INVERSE\\n                ),\\n                roundUpUnit\\n            )\\n        }\\n    }\\n\\n    /// @notice Calculates floor(x*y\\u00f7denominator) with full precision.\\n    ///\\n    /// @dev An extension of \\"mulDiv\\" for signed numbers. Works by computing the signs and the absolute values separately.\\n    ///\\n    /// Requirements:\\n    /// - None of the inputs can be type(int256).min.\\n    /// - The result must fit within int256.\\n    ///\\n    /// @param x The multiplicand as an int256.\\n    /// @param y The multiplier as an int256.\\n    /// @param denominator The divisor as an int256.\\n    /// @return result The result as an int256.\\n    function mulDivSigned(\\n        int256 x,\\n        int256 y,\\n        int256 denominator\\n    ) internal pure returns (int256 result) {\\n        if (x == type(int256).min || y == type(int256).min || denominator == type(int256).min) {\\n            revert PRBMath__MulDivSignedInputTooSmall();\\n        }\\n\\n        // Get hold of the absolute values of x, y and the denominator.\\n        uint256 ax;\\n        uint256 ay;\\n        uint256 ad;\\n        unchecked {\\n            ax = x < 0 ? uint256(-x) : uint256(x);\\n            ay = y < 0 ? uint256(-y) : uint256(y);\\n            ad = denominator < 0 ? uint256(-denominator) : uint256(denominator);\\n        }\\n\\n        // Compute the absolute value of (x*y)\\u00f7denominator. The result must fit within int256.\\n        uint256 rAbs = mulDiv(ax, ay, ad);\\n        if (rAbs > uint256(type(int256).max)) {\\n            revert PRBMath__MulDivSignedOverflow(rAbs);\\n        }\\n\\n        // Get the signs of x, y and the denominator.\\n        uint256 sx;\\n        uint256 sy;\\n        uint256 sd;\\n        assembly {\\n            sx := sgt(x, sub(0, 1))\\n            sy := sgt(y, sub(0, 1))\\n            sd := sgt(denominator, sub(0, 1))\\n        }\\n\\n        // XOR over sx, sy and sd. This is checking whether there are one or three negative signs in the inputs.\\n        // If yes, the result should be negative.\\n        result = sx ^ sy ^ sd == 0 ? -int256(rAbs) : int256(rAbs);\\n    }\\n\\n    /// @notice Calculates the square root of x, rounding down.\\n    /// @dev Uses the Babylonian method https://en.wikipedia.org/wiki/Methods_of_computing_square_roots#Babylonian_method.\\n    ///\\n    /// Caveats:\\n    /// - This function does not work with fixed-point numbers.\\n    ///\\n    /// @param x The uint256 number for which to calculate the square root.\\n    /// @return result The result as an uint256.\\n    function sqrt(uint256 x) internal pure returns (uint256 result) {\\n        if (x == 0) {\\n            return 0;\\n        }\\n\\n        // Set the initial guess to the closest power of two that is higher than x.\\n        uint256 xAux = uint256(x);\\n        result = 1;\\n        if (xAux >= 0x100000000000000000000000000000000) {\\n            xAux >>= 128;\\n            result <<= 64;\\n        }\\n        if (xAux >= 0x10000000000000000) {\\n            xAux >>= 64;\\n            result <<= 32;\\n        }\\n        if (xAux >= 0x100000000) {\\n            xAux >>= 32;\\n            result <<= 16;\\n        }\\n        if (xAux >= 0x10000) {\\n            xAux >>= 16;\\n            result <<= 8;\\n        }\\n        if (xAux >= 0x100) {\\n            xAux >>= 8;\\n            result <<= 4;\\n        }\\n        if (xAux >= 0x10) {\\n            xAux >>= 4;\\n            result <<= 2;\\n        }\\n        if (xAux >= 0x8) {\\n            result <<= 1;\\n        }\\n\\n        // The operations can never overflow because the result is max 2^127 when it enters this block.\\n        unchecked {\\n            result = (result + x / result) >> 1;\\n            result = (result + x / result) >> 1;\\n            result = (result + x / result) >> 1;\\n            result = (result + x / result) >> 1;\\n            result = (result + x / result) >> 1;\\n            result = (result + x / result) >> 1;\\n            result = (result + x / result) >> 1; // Seven iterations should be enough\\n            uint256 roundedDownResult = x / result;\\n            return result >= roundedDownResult ? roundedDownResult : result;\\n        }\\n    }\\n}\\n","keccak256":"0x62cbabae4910e168e99b9c2c3e3b5c9c7ad5e7abd961dcc63b7ea3d83d8ea87e","license":"Unlicense"}},"version":1}',
	bytecode:
		'0x608060405234801561001057600080fd5b50604051610c6f380380610c6f83398101604081905261002f91610167565b61003833610047565b61004181610097565b50610197565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b6000546001600160a01b031633146100f65760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657260448201526064015b60405180910390fd5b6001600160a01b03811661015b5760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b60648201526084016100ed565b61016481610047565b50565b60006020828403121561017957600080fd5b81516001600160a01b038116811461019057600080fd5b9392505050565b610ac9806101a66000396000f3fe608060405234801561001057600080fd5b50600436106100725760003560e01c806396364e6d1161005057806396364e6d1461010a578063a4d0caf21461011d578063f2fde38b1461013e57600080fd5b806315d63a9114610077578063715018a6146100e25780638da5cb5b146100ec575b600080fd5b6100b8610085366004610863565b600160209081526000928352604080842090915290825290205473ffffffffffffffffffffffffffffffffffffffff1681565b60405173ffffffffffffffffffffffffffffffffffffffff90911681526020015b60405180910390f35b6100ea610151565b005b60005473ffffffffffffffffffffffffffffffffffffffff166100b8565b6100ea610118366004610885565b6101e3565b61013061012b3660046108be565b61035f565b6040519081526020016100d9565b6100ea61014c36600461082d565b610583565b60005473ffffffffffffffffffffffffffffffffffffffff1633146101d7576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657260448201526064015b60405180910390fd5b6101e160006106b3565b565b60005473ffffffffffffffffffffffffffffffffffffffff163314610264576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657260448201526064016101ce565b600083815260016020908152604080832085845290915290205473ffffffffffffffffffffffffffffffffffffffff16156102cb576040517fd28d564f00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b600083815260016020908152604080832085845282529182902080547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff85169081179091559151918252839185917f2809ef679fa4c20b88a6467f2660840ad173b5205fef76c270c5d7ba44cb7057910160405180910390a3505050565b60008284141561037b5761037482600a61094b565b905061057c565b600084815260016020908152604080832086845290915290205473ffffffffffffffffffffffffffffffffffffffff168015610457576040517f7a3c4c170000000000000000000000000000000000000000000000000000000081526004810184905273ffffffffffffffffffffffffffffffffffffffff821690637a3c4c179060240160206040518083038186803b15801561041757600080fd5b505afa15801561042b573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061044f919061084a565b91505061057c565b50600083815260016020908152604080832087845290915290205473ffffffffffffffffffffffffffffffffffffffff16801561054a5761044f61049c84600a61094b565b6104a785600a61094b565b6040517f7a3c4c170000000000000000000000000000000000000000000000000000000081526004810187905273ffffffffffffffffffffffffffffffffffffffff851690637a3c4c179060240160206040518083038186803b15801561050d57600080fd5b505afa158015610521573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610545919061084a565b610728565b6040517f75c9d5ca00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b9392505050565b60005473ffffffffffffffffffffffffffffffffffffffff163314610604576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657260448201526064016101ce565b73ffffffffffffffffffffffffffffffffffffffff81166106a7576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201527f646472657373000000000000000000000000000000000000000000000000000060648201526084016101ce565b6106b0816106b3565b50565b6000805473ffffffffffffffffffffffffffffffffffffffff8381167fffffffffffffffffffffffff0000000000000000000000000000000000000000831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b600080807fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff85870985870292508281108382030391505080600014156107815783828161077757610777610a42565b049250505061057c565b8381106107c4576040517f773cc18c00000000000000000000000000000000000000000000000000000000815260048101829052602481018590526044016101ce565b60008486880960026001871981018816978890046003810283188082028403028082028403028082028403028082028403028082028403029081029092039091026000889003889004909101858311909403939093029303949094049190911702949350505050565b60006020828403121561083f57600080fd5b813561057c81610a71565b60006020828403121561085c57600080fd5b5051919050565b6000806040838503121561087657600080fd5b50508035926020909101359150565b60008060006060848603121561089a57600080fd5b833592506020840135915060408401356108b381610a71565b809150509250925092565b6000806000606084860312156108d357600080fd5b505081359360208301359350604090920135919050565b600181815b8085111561094357817fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0482111561092957610929610a13565b8085161561093657918102915b93841c93908002906108ef565b509250929050565b600061057c838360008261096157506001610a0d565b8161096e57506000610a0d565b8160018114610984576002811461098e576109aa565b6001915050610a0d565b60ff84111561099f5761099f610a13565b50506001821b610a0d565b5060208310610133831016604e8410600b84101617156109cd575081810a610a0d565b6109d783836108ea565b807fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff04821115610a0957610a09610a13565b0290505b92915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b73ffffffffffffffffffffffffffffffffffffffff811681146106b057600080fdfea264697066735822122001c1579e287d6aff7e85c92dd8ba4781c9bb0fea899df13298f74e9a32f8d3cf64736f6c63430008060033',
	deployedBytecode:
		'0x608060405234801561001057600080fd5b50600436106100725760003560e01c806396364e6d1161005057806396364e6d1461010a578063a4d0caf21461011d578063f2fde38b1461013e57600080fd5b806315d63a9114610077578063715018a6146100e25780638da5cb5b146100ec575b600080fd5b6100b8610085366004610863565b600160209081526000928352604080842090915290825290205473ffffffffffffffffffffffffffffffffffffffff1681565b60405173ffffffffffffffffffffffffffffffffffffffff90911681526020015b60405180910390f35b6100ea610151565b005b60005473ffffffffffffffffffffffffffffffffffffffff166100b8565b6100ea610118366004610885565b6101e3565b61013061012b3660046108be565b61035f565b6040519081526020016100d9565b6100ea61014c36600461082d565b610583565b60005473ffffffffffffffffffffffffffffffffffffffff1633146101d7576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657260448201526064015b60405180910390fd5b6101e160006106b3565b565b60005473ffffffffffffffffffffffffffffffffffffffff163314610264576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657260448201526064016101ce565b600083815260016020908152604080832085845290915290205473ffffffffffffffffffffffffffffffffffffffff16156102cb576040517fd28d564f00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b600083815260016020908152604080832085845282529182902080547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff85169081179091559151918252839185917f2809ef679fa4c20b88a6467f2660840ad173b5205fef76c270c5d7ba44cb7057910160405180910390a3505050565b60008284141561037b5761037482600a61094b565b905061057c565b600084815260016020908152604080832086845290915290205473ffffffffffffffffffffffffffffffffffffffff168015610457576040517f7a3c4c170000000000000000000000000000000000000000000000000000000081526004810184905273ffffffffffffffffffffffffffffffffffffffff821690637a3c4c179060240160206040518083038186803b15801561041757600080fd5b505afa15801561042b573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061044f919061084a565b91505061057c565b50600083815260016020908152604080832087845290915290205473ffffffffffffffffffffffffffffffffffffffff16801561054a5761044f61049c84600a61094b565b6104a785600a61094b565b6040517f7a3c4c170000000000000000000000000000000000000000000000000000000081526004810187905273ffffffffffffffffffffffffffffffffffffffff851690637a3c4c179060240160206040518083038186803b15801561050d57600080fd5b505afa158015610521573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610545919061084a565b610728565b6040517f75c9d5ca00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b9392505050565b60005473ffffffffffffffffffffffffffffffffffffffff163314610604576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657260448201526064016101ce565b73ffffffffffffffffffffffffffffffffffffffff81166106a7576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201527f646472657373000000000000000000000000000000000000000000000000000060648201526084016101ce565b6106b0816106b3565b50565b6000805473ffffffffffffffffffffffffffffffffffffffff8381167fffffffffffffffffffffffff0000000000000000000000000000000000000000831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b600080807fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff85870985870292508281108382030391505080600014156107815783828161077757610777610a42565b049250505061057c565b8381106107c4576040517f773cc18c00000000000000000000000000000000000000000000000000000000815260048101829052602481018590526044016101ce565b60008486880960026001871981018816978890046003810283188082028403028082028403028082028403028082028403028082028403029081029092039091026000889003889004909101858311909403939093029303949094049190911702949350505050565b60006020828403121561083f57600080fd5b813561057c81610a71565b60006020828403121561085c57600080fd5b5051919050565b6000806040838503121561087657600080fd5b50508035926020909101359150565b60008060006060848603121561089a57600080fd5b833592506020840135915060408401356108b381610a71565b809150509250925092565b6000806000606084860312156108d357600080fd5b505081359360208301359350604090920135919050565b600181815b8085111561094357817fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0482111561092957610929610a13565b8085161561093657918102915b93841c93908002906108ef565b509250929050565b600061057c838360008261096157506001610a0d565b8161096e57506000610a0d565b8160018114610984576002811461098e576109aa565b6001915050610a0d565b60ff84111561099f5761099f610a13565b50506001821b610a0d565b5060208310610133831016604e8410600b84101617156109cd575081810a610a0d565b6109d783836108ea565b807fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff04821115610a0957610a09610a13565b0290505b92915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b73ffffffffffffffffffffffffffffffffffffffff811681146106b057600080fdfea264697066735822122001c1579e287d6aff7e85c92dd8ba4781c9bb0fea899df13298f74e9a32f8d3cf64736f6c63430008060033',
	devdoc: {
		details:
			"Adheres to - IJBPrices: General interface for the methods in this contract that interact with the blockchain's state according to the protocol's rules.Inherits from - Ownable: Includes convenience functionality for checking a message sender's permissions before executing certain transactions.",
		kind: 'dev',
		methods: {
			'addFeedFor(uint256,uint256,address)': {
				details: "Current feeds can't be modified.",
				params: {
					_base: 'The base currency unit being priced by the feed.',
					_currency: "The currency units the feed's resulting price is in terms of.",
					_feed: 'The price feed being added.'
				}
			},
			constructor: {
				params: {
					_owner: 'The address that will own the contract.'
				}
			},
			'owner()': {
				details: 'Returns the address of the current owner.'
			},
			'priceFor(uint256,uint256,uint256)': {
				params: {
					_base: 'The base currency unit being priced.',
					_currency: 'The currency units the resulting price is in terms of.',
					_decimals: 'The number of decimals the returned fixed point price should include.'
				},
				returns: {
					_0: 'The price of the currency in terms of the base, as a fixed point number with the specified number of decimals.'
				}
			},
			'renounceOwnership()': {
				details:
					'Leaves the contract without owner. It will not be possible to call `onlyOwner` functions anymore. Can only be called by the current owner. NOTE: Renouncing ownership will leave the contract without an owner, thereby removing any functionality that is only available to the owner.'
			},
			'transferOwnership(address)': {
				details:
					'Transfers ownership of the contract to a new account (`newOwner`). Can only be called by the current owner.'
			}
		},
		stateVariables: {
			feedFor: {
				details:
					"The feed returns the number of `_currency` units that can be converted to 1 `_base` unit. _currency The currency units the feed's resulting price is in terms of. _base The base currency unit being priced by the feed."
			}
		},
		version: 1
	},
	userdoc: {
		errors: {
			'PRBMath__MulDivOverflow(uint256,uint256)': [
				{
					notice: 'Emitted when the result overflows uint256.'
				}
			]
		},
		kind: 'user',
		methods: {
			'addFeedFor(uint256,uint256,address)': {
				notice: ' Add a price feed for a currency in terms of the provided base currency.'
			},
			'feedFor(uint256,uint256)': {
				notice: ' The available price feeds.'
			},
			'priceFor(uint256,uint256,uint256)': {
				notice: 'Gets the number of `_currency` units that can be converted to 1 `_base` unit.'
			}
		},
		notice: ' Manages and normalizes price feeds.',
		version: 1
	},
	storageLayout: {
		storage: [
			{
				astId: 53,
				contract: 'contracts/JBPrices.sol:JBPrices',
				label: '_owner',
				offset: 0,
				slot: '0',
				type: 't_address'
			},
			{
				astId: 10458,
				contract: 'contracts/JBPrices.sol:JBPrices',
				label: 'feedFor',
				offset: 0,
				slot: '1',
				type: 't_mapping(t_uint256,t_mapping(t_uint256,t_contract(IJBPriceFeed)18181))'
			}
		],
		types: {
			t_address: {
				encoding: 'inplace',
				label: 'address',
				numberOfBytes: '20'
			},
			't_contract(IJBPriceFeed)18181': {
				encoding: 'inplace',
				label: 'contract IJBPriceFeed',
				numberOfBytes: '20'
			},
			't_mapping(t_uint256,t_contract(IJBPriceFeed)18181)': {
				encoding: 'mapping',
				key: 't_uint256',
				label: 'mapping(uint256 => contract IJBPriceFeed)',
				numberOfBytes: '32',
				value: 't_contract(IJBPriceFeed)18181'
			},
			't_mapping(t_uint256,t_mapping(t_uint256,t_contract(IJBPriceFeed)18181))': {
				encoding: 'mapping',
				key: 't_uint256',
				label: 'mapping(uint256 => mapping(uint256 => contract IJBPriceFeed))',
				numberOfBytes: '32',
				value: 't_mapping(t_uint256,t_contract(IJBPriceFeed)18181)'
			},
			t_uint256: {
				encoding: 'inplace',
				label: 'uint256',
				numberOfBytes: '32'
			}
		}
	}
};
