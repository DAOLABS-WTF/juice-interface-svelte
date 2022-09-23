export default async function getVerifiedHandles(
	doc: FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData>
) {
	try {
		const document = await doc.get();
		return document.data();
	} catch (error) {
		throw new Error('Error: Getting document');
	}
}
