import { Request, Response } from 'express';
import { firestore } from '../init';

export async function checkApiKey(req: Request, res: Response, next: Function) {
	const apiKey = req.headers.apikey;

	if (!apiKey) return unauth();

	const doc = firestore.doc(`apikeys/${apiKey}`);
	const snap = await doc.get();

	if (apiKey && snap.exists && snap.data().whitelisted) {
		next();
	} else unauth();

	function unauth() {
		res.status(403).json({
			error: 'Unauthorized request'
		});
	}
}
