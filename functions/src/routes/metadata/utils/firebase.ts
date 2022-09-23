import * as firebase from 'firebase-admin';

export const getMetadata = async (path: string, bucket?: string): Promise<any> => {
	const metadata = await firebase.storage().bucket(bucket).file(path).getMetadata();
	return metadata[0];
};

export const getFile = async (path: string, bucket?: string): Promise<Buffer> => {
	const [buffer] = await firebase.storage().bucket(bucket).file(path).download();
	return buffer;
};

export const saveFile = async (
	path: string,
	data: Buffer | string,
	bucket?: string
): Promise<void> => {
	try {
		await firebase.storage().bucket(bucket).file(path).save(data);
	} catch (error: any) {
		throw new Error(error.message);
	}
};
