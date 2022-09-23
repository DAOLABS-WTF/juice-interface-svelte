import ffmpeg from 'fluent-ffmpeg';
import { path as ffmpegPath } from '@ffmpeg-installer/ffmpeg';
import { path as ffprobePath } from '@ffprobe-installer/ffprobe';

ffmpeg.setFfmpegPath(ffmpegPath);
ffmpeg.setFfprobePath(ffprobePath);

export const generateVideo = async (imageTemplate: string, outputPath: string) => {
	return new Promise((resolve, reject) => {
		ffmpeg()
			.input(imageTemplate)
			.loop(10)
			.fps(20)
			.on('end', () => {
				resolve(true);
			})
			.on('error', (err: any) => {
				reject(err);
			})
			.outputOptions([`-vf fps=30`, '-pix_fmt yuv420p'])
			.output(outputPath)
			.run();
	});
};

export const generateGifs = async (imageTemplate: string, outputPath: string) => {
	return new Promise((resolve, reject) => {
		ffmpeg()
			.input(imageTemplate)
			.fps(20)
			.on('end', () => {
				resolve(true);
			})
			.on('error', (err: any) => {
				reject(err);
			})
			.outputOptions([])
			.output(outputPath)
			.run();
	});
};
