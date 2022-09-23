import * as functions from 'firebase-functions';
import { ipfsGateway } from './routes/gateway';
import { pinFiles, pinningFunc } from './routes/pinning';
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { whitelistedDomains } from './constants';
import { RuntimeOptions } from 'firebase-functions';
import { currentGas } from './routes/web3';
import { readContract } from './routes/contract/readContract';

import { unZipArchive } from './routes/upload';
import { onCreateUser } from './routes/users';
import { metadataFunc } from './routes/metadata';
import { collagesFunc } from './routes/collages';
import { generationFunc } from './routes/generation';
import { animationFunc } from './routes/animation';
import apiKeyRouter from './routes/api-keys';
import { checkApiKey } from './middlewares/checkApiKey';
import fileMultipartFileUpload from 'express-multipart-file-parser';
import { querySubgraph } from './routes/subgraph';
import { getContractSourceCode } from './routes/etherscan';
import { checkGnosisAddress, getPendingTransactions, safeBalancesInEth } from './routes/gnosis';
import { getCountryName } from './routes/location';
import { getParticipationScore } from './routes/deepdao/score';
import { getTransactions } from './routes/etherscan/transactions';
import { renderTileSvg } from './routes/render/svg';

export const pinning = functions
	.runWith({
		secrets: ['NFT_STORAGE_API_KEY'],
		timeoutSeconds: 540
	})
	.https.onRequest(pinningFunc);

const expressApp = express();
const runWith: RuntimeOptions = {
	secrets: [
		'BLOCKNATIVE_API_KEY',
		'INFURA_ID',
		'SUBGRAPH_API_KEY',
		'ETHERSCAN_API_KEY',
		'DEEP_DAO_API_KEY'
	]
};

export const app = functions.runWith(runWith).https.onRequest(expressApp);

expressApp.use(express.json());
expressApp.use(express.urlencoded({ extended: true }));
expressApp.use(cookieParser());
expressApp.use(
	cors({
		origin: (origin, callback) => {
			const isWhiteListed = whitelistedDomains.includes(origin ? new URL(origin).hostname : '');
			if (origin?.match('://localhost') || isWhiteListed) callback(null, true);
			else callback(null, false);
		}
	})
);

expressApp.use((req, res, next) => {
	console.log(`${req.method}: ${req.url}`);

	const origin = whitelistedDomains.find((org) => org === req.headers.origin);
	if (origin) {
		res.setHeader('access-control-allow-origin', req.headers.origin);
	}

	next();
});

expressApp.post('/ipfs', checkApiKey, fileMultipartFileUpload, pinFiles);
expressApp.get('/ipfs/*', checkApiKey, ipfsGateway);
expressApp.get('/web3/currentGas', checkApiKey, currentGas);
expressApp.post('/web3/readContract', checkApiKey, readContract);
expressApp.post('/web3/readContract', checkApiKey, readContract);
expressApp.get('/etherscan/transactions/:address', checkApiKey, getTransactions);
expressApp.get('/etherscan/contract/:address', checkApiKey, getContractSourceCode);

expressApp.get('/gnosis/check/:address', checkApiKey, checkGnosisAddress);
expressApp.get('/gnosis/balances/:address/total', checkApiKey, safeBalancesInEth);
expressApp.get('/gnosis/txns/:address/pending', checkApiKey, getPendingTransactions);
expressApp.post('/subgraph/mainnet', checkApiKey, querySubgraph('mainnet'));
expressApp.post('/subgraph/rinkeby', checkApiKey, querySubgraph('rinkeby'));
expressApp.get('/location/country', checkApiKey, getCountryName);
expressApp.get('/deepdao/score/:address', checkApiKey, getParticipationScore);
expressApp.use('/api-keys', apiKeyRouter);
expressApp.get('/tiles/render/svg/:address', renderTileSvg);

export const unArchive = functions
	.runWith({
		timeoutSeconds: 300,
		memory: '1GB'
	})
	.storage.object()
	.onFinalize(unZipArchive);

export const users = functions.auth.user().onCreate(onCreateUser);
export const metadata = functions.https.onRequest(metadataFunc);
export const collages = functions.https.onRequest(collagesFunc);
export const generation = functions.https.onRequest(generationFunc);
export const animation = functions.https.onRequest(animationFunc);
