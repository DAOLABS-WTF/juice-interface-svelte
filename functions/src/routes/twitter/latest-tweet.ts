import * as functions from 'firebase-functions';
import { fetch } from 'undici';
import cors from 'cors';
import { environment } from '../../environment';

const { TWITTER_CONSUMER_BEARER } = environment;

export async function latest_tweet(req: functions.Request, res: functions.Response) {
	cors({ origin: true })(req, res, async () => {
		try {
			res.setHeader('access-control-allow-origin', '*');
			const response = await fetch(
				`https://api.twitter.com/2/tweets/search/recent?query=from:${req.query.handle}`,
				{
					headers: {
						Authorization: `Bearer ${TWITTER_CONSUMER_BEARER}`
					}
				}
			);
			const json = await response.json();
			res.json(json);
		} catch (e) {
			console.error(e);
			const error = e as Error;
			res.status(500).json({
				error: error.message
			});
		}
	});
}
