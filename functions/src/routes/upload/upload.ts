import * as functions from 'firebase-functions';
import * as firebase from 'firebase-admin';
import * as unzipper from 'unzipper';
import crypto from 'crypto';

const getTotalPopulationSize = (populations: any): number => {
	let total_populations_size = 0;
	populations.forEach((population: any) => {
		total_populations_size += +population.population_size;
	});
	return total_populations_size;
};

const createPopulations = (populations: any, path: string): any => {
	return populations.reduce((acc: any, population: any) => {
		acc[population.name] = {
			config: population,
			input_folder: `${path}/assets`,
			traits_folder: `${path}/assets/${population.name}/Traits`,
			assets: []
		};
		return acc;
	}, {});
};

export const unZipArchive = async (object: functions.storage.ObjectMetadata) => {
	const { name, bucket } = object;
	/**
	 * Project ID
	 */
	const id = crypto.randomBytes(5).toString('hex');

	if (name && name.endsWith('.zip')) {
		const file = firebase.storage().bucket(bucket).file(name);
		const [version, account] = file.name.split('.')[0].split('/');

		await file
			.createReadStream()
			.pipe(unzipper.Parse())
			.on('entry', (entry) => {
				const destination = firebase
					.storage()
					.bucket()
					.file(`${version}/${account}/projects/${id}/${entry.path}`);

				entry.pipe(destination.createWriteStream());

				if (entry.path.endsWith('.json')) {
					entry.buffer().then((buffer: Buffer) => {
						const config = JSON.parse(buffer.toString('utf-8'));
						if (config.populations != null) {
							const total_populations_size = getTotalPopulationSize(config.populations);
							const populations = createPopulations(
								config.populations,
								`${version}/${account}/projects/${id}`
							);

							delete config.populations;
							config.output_folder = `${version}/${account}/projects/${id}/build`;

							if (config.resume_folder.length > 1) {
								config.output_folder = `${version}/${account}/projects/${id}/build/${config.resume_folder}`;
							}

							firebase
								.database()
								.ref(`users/${account}/projects`)
								.update(
									{
										[id]: {
											config: {
												...config,
												total_populations_size
											},
											populations
										}
									},
									(err) => {
										if (err) {
											console.error(err);
										} else {
											console.log('Success');
										}
									}
								);
						} else {
							config.output_folder = `${version}/${account}/projects/${id}/build`;

							if (config.resume_folder.length > 1) {
								config.output_folder = `${version}/${account}/projects/${id}/build/${config.resume_folder}`;
							}

							firebase
								.database()
								.ref(`users/${account}/projects`)
								.update(
									{
										[id]: {
											config
										}
									},
									(err) => {
										if (err) {
											console.error(err);
										} else {
											console.log('Success');
										}
									}
								);
						}
					});
				}
			})
			.promise();
		await file.delete();
	}
};
