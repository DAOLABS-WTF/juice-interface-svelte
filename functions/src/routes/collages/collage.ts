import * as firebase from 'firebase-admin';
import * as functions from 'firebase-functions';
import { createCanvas, loadImage, Canvas } from 'canvas';

import { zero_pad } from './utils';
import { shuffle_array } from './utils/randomize';

const writeFile = (collage_filename: string, canvas: Canvas) => {
	return new Promise((resolve, reject) => {
		try {
			const out = firebase.storage().bucket().file(collage_filename).createWriteStream({
				contentType: 'image/png'
			});

			const stream = canvas.createPNGStream();
			stream.pipe(out);

			out.on('finish', () => {
				resolve(true);
			});
		} catch (err: any) {
			reject(err);
		}
	});
};

export const create_collages = async (
	paths: string[],
	output_folder: string,
	tag: string,
	tile_width: number,
	tile_height: number,
	columns: number,
	rows: number,
	max_sheets: number,
	skip_non_full: boolean,
	shuffle: boolean
) => {
	let files = paths;

	if (shuffle) {
		files = shuffle_array(files);
	}

	const output_width = tile_width * columns;
	const output_height = tile_height * rows;
	const images_per_sheet = rows * columns;

	const fractional_sheets = files.length / images_per_sheet;

	let num_sheets = skip_non_full ? Math.round(fractional_sheets) : Math.ceil(fractional_sheets);

	if (num_sheets > max_sheets) num_sheets = max_sheets;

	for (let sheet = 0; sheet < num_sheets; sheet++) {
		const canvas = createCanvas(output_width, output_height);
		const ctx = canvas.getContext('2d');

		for (let image_y = 0; image_y < rows; image_y++) {
			for (let image_x = 0; image_x < columns; image_x++) {
				const index = sheet * images_per_sheet + image_y * columns + image_x;
				if (index < files.length) {
					const [buffer] = await firebase.storage().bucket().file(files[index]).download();

					try {
						const image = await loadImage(buffer);
						const x = image_x * tile_width;
						const y = image_y * tile_height;
						ctx.drawImage(image, x, y, tile_width, tile_height);
					} catch (err: any) {
						throw new Error(err.message);
					}
				}
			}
		}

		const collage_filename = `${output_folder}/${tag}-${zero_pad(sheet, 2)}.png`;

		try {
			await writeFile(collage_filename, canvas);
		} catch (err) {
			functions.logger.error(err);
		}
	}
};
