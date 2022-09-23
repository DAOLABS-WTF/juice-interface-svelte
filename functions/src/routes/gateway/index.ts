import * as admin from 'firebase-admin';
import { create, type IPFS } from 'ipfs-core';
import { toGatewayURL } from 'nft.storage';
import https from 'https';
import type { Request, Response } from 'express';
import { firebaseApp } from '../../init';

let node: IPFS;

const storage = admin.storage(firebaseApp);

export async function ipfsGateway(request: Request, response: Response) {
	const cidPath = (request.path || '').replace('/ipfs/', '');
	const bucketFile = storage.bucket('juicebox-svelte.appspot.com').file(cidPath);

	try {
		if (await bucketFile.getMetadata()) {
			console.log('Using bucket file');
			const stream = bucketFile.createReadStream();
			stream.pipe(response);
			stream.on('end', () => response.end());
			return;
		}
	} catch (error) {}

	const gateways = ['https://juicebox.mypinata.cloud'];

	for (const gateway of gateways) {
		const gatewayUrl: URL = toGatewayURL(`ipfs://${cidPath}`, { gateway });
		const url = gatewayUrl.href;
		console.log(`Requesting... ${url}`);
		try {
			await new Promise((resolve, reject) => {
				https
					.get(url, (res) => {
						if (200 <= res.statusCode && res.statusCode < 400) {
							console.log(
								'Status Code:',
								response.statusCode,
								'\nStatus Text',
								response.statusMessage
							);
							res.pipe(response);
							let data = [];
							res.on('data', (chunk: Buffer) => {
								data = [...data, ...Uint8Array.from(chunk)];
							});
							res.on('end', async function () {
								console.log('\nSaving to bucket\n');
								await bucketFile.save(Buffer.from(data), {
									public: true
								});
								response.end();
								resolve(true);
							});
						} else throw Error('failed');
					})
					.on('error', (error) => {
						response.status(500).json({
							error: error.message
						});
						reject();
					});
			});
			return;
		} catch (error) {
			console.log('GET:', url);
			console.error(error.message);
		}
	}

	let maxRetries = 3;
	let retried = 0;
	while (retried++ < maxRetries) {
		try {
			node = (await create()) as IPFS;

			let data: number[] = [];
			for await (const chunk of node.cat(cidPath)) {
				response.write(chunk);
				data = [...data, ...Uint8Array.from(chunk)];
			}

			console.log('\nSaving to bucket\n');
			await bucketFile.save(Buffer.from(data), {
				public: true
			});
			response.status(200).end();
			return;
		} catch (error) {
			response.status(500).json({
				error: 'failed to get file'
			});
		}
	}
}
