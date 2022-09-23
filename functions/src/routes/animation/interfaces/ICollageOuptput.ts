export interface ICollageOutput {
	tag: string;
	source_image_type: string;
	tile_width: number;
	tile_height: number;
	columns: number;
	rows: number;
	max_sheets: number;
	skip_mostly_empty: boolean;
	shuffle: boolean;
}
