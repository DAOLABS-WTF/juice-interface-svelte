import { Request, Response } from 'express';
import fetch from 'cross-fetch';

export function querySubgraph(network: string) {
	const subgraphs = {
		mainnet:
			`https://gateway.thegraph.com/api/` +
			process.env.SUBGRAPH_API_KEY +
			`/subgraphs/id/FVmuv3TndQDNd2BWARV8Y27yuKKukryKXPzvAS5E7htC`,
		rinkeby: `https://api.studio.thegraph.com/query/30654/juicebox-rinkeby/0.1.0`
	};
	return async function querySubgraphHandler(req: Request, res: Response) {
		try {
			const response = await fetch(subgraphs[network], {
				method: 'POST',
				body: JSON.stringify({
					query: req.body.query
				}),
				headers: {
					'Content-Type': 'application/json'
				}
			});
			res.setHeader('content-type', response.headers.get('content-type'));
			(response.body as any).pipe(res);
		} catch (error) {
			console.error(error.message);
		}
	};
}
