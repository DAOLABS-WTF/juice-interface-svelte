import * as firebase from 'firebase-admin';
import { readFileSync } from 'fs';

const account = '0x0000000000000000000000000000000000000000';

firebase.initializeApp({
	databaseURL: 'http://localhost:9000/?ns=juicebox-svelte'
});

const initialRun = async () => {
	await firebase.auth().deleteUsers([account]);
	await firebase.auth().createUser({
		uid: account
	});

	await firebase.auth().createCustomToken(account);

	console.log(`Create test user: ${account}`);

	await firebase
		.storage()
		.bucket('gs://juicebox-svelte.appspot.com')
		.file(`v1/${account}/bunny.zip`)
		.save(readFileSync(`./test/banny.zip`));

	await firebase
		.storage()
		.bucket('gs://juicebox-svelte.appspot.com')
		.file(`v1/${account}/p5.js-videos.zip`)
		.save(readFileSync(`./test/p5.js-videos.zip`));

	const collagesTypes = readFileSync('./test/collagesTypes.json', { encoding: 'utf-8' });

	await firebase
		.database()
		.ref('collages-types')
		.update(
			{
				...JSON.parse(collagesTypes)
			},
			() => {
				process.exit(0);
			}
		);
};

initialRun();
