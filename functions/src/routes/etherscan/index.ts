import axios from 'axios';
import type { Request, Response } from 'express';

const getEndpoint = (address: string) =>
	`https://api.etherscan.io/api?module=contract&action=getsourcecode&address=${address}&apikey=${process.env.ETHERSCAN_API_KEY}`;

export async function getContractSourceCode(req: Request, res: Response) {
	const { address } = req.params || {};
	if (address) {
		const { data } = await axios.get(getEndpoint(address));
		if (data.result) {
			res.json(data.result);
			return;
		}
	}
	res.status(500).json({
		message: 'something went wrong'
	});
}
