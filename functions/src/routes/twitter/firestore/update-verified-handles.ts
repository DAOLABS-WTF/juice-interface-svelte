import { firestore } from '../../../init';
import getVerifiedHandles from './get-verified-handles';

export default async function updateVerfiedHandles(data: { [fieldPath: string]: any }) {
	const verifiedJson = firestore.collection('verified').doc('verified');
	await verifiedJson.set(data);
	const updated = await getVerifiedHandles(verifiedJson);
	return updated;
}
