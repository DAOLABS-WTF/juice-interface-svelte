import { V2ContractName } from '$models/v2/contracts';
import { readContract } from './contractReader';

export async function loadHandle(projectId: number) {
	try {
		return (
			await readContract(V2ContractName.JBProjectHandles, 'ensNamePartsOf', [projectId], true)
		).join('.');
	} catch (error) {
		console.log('error loading handle');
	}
}
