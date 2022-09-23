import moment from 'moment';

export const generateDate = (format: string) => {
	return moment(new Date()).format(format).toString();
};
