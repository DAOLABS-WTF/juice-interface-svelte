import * as functions from 'firebase-functions';
import * as firebase from 'firebase-admin';
import cors from 'cors';
import { create_collages } from './collage';

export const collagesFunc = (request: functions.Request, response: functions.Response) => {
	cors({ origin: true })(request, response, async () => {
		const { account, projectID, buildName } = request.body;

		const configSnapshot = await firebase
			.database()
			.ref(`users/${account}/projects/${projectID}`)
			.get();

		const collagesTypesSnapshot = await firebase.database().ref(`collages-types`).get();

		const collagesTypes: any = collagesTypesSnapshot.toJSON();

		const config: any = configSnapshot.toJSON();

		const configCollagesTypes: string[] = Object.values(config.config.collage_outputs);

		for (const collage of configCollagesTypes) {
			const output = collagesTypes[collage];

			const files = await firebase
				.storage()
				.bucket()
				.getFiles({
					directory: `${config.config.output_folder}/${buildName}/${output.source_image_type}`
				});

			const filenames: string[] = files[0].map((file) => file.name);
			await create_collages(
				filenames,
				`${config.config.output_folder}/${buildName}/${output.tag}`,
				output.tag,
				output.tile_width,
				output.tile_height,
				output.columns,
				output.rows,
				output.max_sheets,
				output.skip_mostly_empty,
				output.shuffle
			);
		}
		response.sendStatus(200);
	});
};
