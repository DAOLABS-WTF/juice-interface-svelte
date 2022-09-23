import { shuffle_array } from './randomize';

export function get_ordering_array(size: number, shuffle = false) {
	const array = [];
	for (let i = 0; i < size; i++) {
		array.push(i);
	}
	if (shuffle) return shuffle_array(array);
	return array;
}
