import * as admin from 'firebase-admin';

export const onCreateUser = (user: admin.auth.UserRecord) => {
	if (user.uid) {
		admin.storage().bucket().file(`v1/${user.uid}/.user`).save(JSON.stringify({ user }));
	}
};
