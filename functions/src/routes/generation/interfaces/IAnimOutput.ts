import { IImageOutput } from './IImageOutput';

export interface IAnimOutput extends IImageOutput {
	background_animation?: string;
	foreground_anmiation?: string;
}
