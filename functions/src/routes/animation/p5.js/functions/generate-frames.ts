import puppeteer from 'puppeteer';
import { generateHtmlContent } from './generate-html';
import { existsSync } from 'fs';
import path from 'path';
import { writeFirame } from './unpack-archive';
import { P5Params } from '../../interfaces/p5Params';
import * as functions from 'firebase-functions';

const pageWrite = async (page: puppeteer.Page, output: string) => {
	await new Promise((resolve) => {
		page.on('console', (message) => {
			functions.logger.log(message);
			if (message.text() === 'finished recording.') {
				resolve(true);
			}
		});
	});
	return await new Promise(async (resolve_1) => {
		while (true) {
			if (existsSync(`${output}/file.tar`)) {
				writeFirame(`${output}/file.tar`);
				resolve_1(true);
				break;
			} else {
				await new Promise((resolveTimeot) => setTimeout(resolveTimeot, 1000));
			}
		}
	});
};

export const generateFrames = async (
	sketchLines: string[],
	output: string,
	generateParams: P5Params
) => {
	const params = {
		args: ['--no-sandbox']
	};
	const browser = await puppeteer.launch(params);
	const page = await browser.newPage();

	const downloadPath = path.resolve(output);
	const client = await page.target().createCDPSession();
	await client.send('Page.setDownloadBehavior', {
		behavior: 'allow',
		downloadPath: downloadPath
	});

	const contentHtml = await generateHtmlContent(sketchLines, generateParams);
	await page.setContent(contentHtml);

	await pageWrite(page, downloadPath);

	await browser.close();
	return true;
};
