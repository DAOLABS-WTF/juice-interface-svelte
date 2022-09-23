import * as functions from 'firebase-functions';
import { fetch } from 'undici';
import cors from 'cors';

import { environment } from '../../environment';

const { TWITTER_API_URL, TWITTER_CONSUMER_BEARER } = environment;

export function user(req: functions.Request, res: functions.Response) {
	cors({ origin: true })(req, res, async () => {
		try {
			const response = await fetch(
				`${TWITTER_API_URL}/2/users/by/username/${req.query.handle}?user.fields=profile_image_url`,
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
