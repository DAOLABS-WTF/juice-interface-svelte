import * as functions from 'firebase-functions';
import * as firebase from 'firebase-admin';
import cors from 'cors';
import { AnimationProjectConfig } from './interfaces/IProjectConfig';
import { generateDate } from '../generation/utils';
import { generateFrames } from './p5.js/functions/generate-frames';
import os from 'os';
import { generateGifs } from './p5.js/functions/generate-video';
import { readFileSync, rmSync } from 'fs';

const paddingCharCount = 7;

type ArrayElement<ArrayType extends readonly unknown[]> =
	ArrayType extends readonly (infer ElementType)[] ? ElementType : never;

export const animationFunc = async (
	request: functions.Request & any,
	response: functions.Response
) => {
	cors({ origin: true })(request, response, async () => {
		const output: string[] = [];

		const account = request.body.account;
		const projectId = request.body.projectID;
		const configSnapshot = await firebase
			.database()
			.ref(`users/${account}/projects/${projectId}`)
			.get();

		const { config } = configSnapshot.toJSON() as { config: AnimationProjectConfig };

		for (var index in config.items) {
			const item = config.items[index];

			let collection: ArrayElement<typeof config.collections>;
			for (const iterator in config.collections) {
				const itratorCollection = config.collections[iterator];
				if (itratorCollection.name === item.collection) {
					collection = itratorCollection;
				}
			}

			const buildName = `${generateDate('YYYYMMDD-HHmmssSS')}_${item.name}`;

			const outputFolder = `${config.output_folder}/${buildName}`;

			const scetchPath = `v1/${account}/projects/${projectId}/${collection.folder}/${item.file_name}`;

			const [buffer] = await firebase.storage().bucket().file(scetchPath).download();

			const sketchLines = buffer.toString('utf-8').replace('\r', '').split('\n');

			const outOsDir = `${os.tmpdir()}/${buildName}`;

			await generateFrames(sketchLines, outOsDir, { type: 'GIF' });

			await generateGifs(`${outOsDir}/%0${paddingCharCount}d.png`, `${outOsDir}/${buildName}.gif`);

			await firebase
				.storage()
				.bucket()
				.file(`${outputFolder}/${item.name}.gif`)
				.save(readFileSync(`${outOsDir}/${buildName}.gif`));
			rmSync(`${outOsDir}/${buildName}.gif`);

			functions.logger.log(`${outputFolder}/${item.name}.gif`);
			output.push(outputFolder);
		}

		response.status(200).json({
			output
		});
	});
};
