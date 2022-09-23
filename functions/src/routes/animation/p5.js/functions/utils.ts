import fs from 'fs';
import glob from 'glob';

export const getConfig = (settingsPath = `${__dirname}/../config/settings.json`) => {
	const rawSettings = fs.readFileSync(settingsPath).toString();
	return JSON.parse(rawSettings);
};

export const getSketchFiles = (path: string) => glob.sync(`${path}/*.js`);
export const getFrames = (path: string) => glob.sync(`${path}/*.png`);
