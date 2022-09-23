import * as functions from 'firebase-functions';
import * as firebase from 'firebase-admin';
import cors from 'cors';
import { get_ordering_array } from './utils/get_ordering_array';
import { generateDate } from './utils/date';
import { get_trait_arrays } from './utils/get-trait-arrays';
import { get_permutations } from './utils/permutations';
import { create_assets } from './asset';
import { generate_all_outputs } from './generate_images';

export const generationFunc = async (
	request: functions.Request & any,
	response: functions.Response
) => {
	cors({ origin: true })(request, response, async () => {
		let buildName: string;
		const account = request.body.account;
		const projectId = request.body.projectID;

		const configSnapshot = await firebase
			.database()
			.ref(`users/${account}/projects/${projectId}`)
			.get();

		const config: any = configSnapshot.toJSON();
		const namePopulations = Object.keys(config.populations);

		for (let index = 0; index < namePopulations.length; index++) {
			const population = config.populations[namePopulations[index]];
			buildName = `${generateDate('YYYYMMDD-HHmmssSS')}_${namePopulations[index]}`;

			config.config.output_folder = `${config.config.output_folder}/${buildName}`;

			let shuffled_ordering = get_ordering_array(config.config.total_populations_size);
			if (config.config.shuffle_assets) {
				shuffled_ordering = get_ordering_array(config.config.total_populations_size, true);
			}
			const traits_arrays = await get_trait_arrays(
				population,
				config.config.total_populations_size
			);

			let population_size = population.config.population_size;
			if (
				config.config.stunt_populations_to &&
				config.config.stunt_populations_to < population_size
			) {
				population_size = config.config.stunt_populations_to;
			}
			const combinations = get_permutations(population_size, traits_arrays);
			population.assets = create_assets(
				config.config,
				population,
				combinations,
				0,
				shuffled_ordering
			);
			await firebase
				.database()
				.ref(`users/${account}/projects/${projectId}/builds/${buildName}`)
				.update({
					assets: population.assets
				});
			await generate_all_outputs(population.assets, config);
		}
		response.status(200).json({
			buildName
		});
	});
};

/*
  POST /generation
  HEADERS { Authorization: Bearer $TOKEN }
  BODY {
    "projectID": "e8bbfe3c8c",
    "account": "0x1448f7fe06805a36e19e7dF981d837C97CFEc518"
  }
*/
