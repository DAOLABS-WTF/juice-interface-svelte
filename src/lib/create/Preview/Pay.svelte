<script lang="ts">
	import { getContext } from 'svelte';
	import type Store from '$utils/Store';
	import type { V2ProjectContextType } from '$models/project-type';
	import Pay from '$lib/components/Pay.svelte';
	import { weightedAmount } from '$utils/v2/math';

	const project = getContext('PROJECT') as Store<V2ProjectContextType>;

	$: payButton = $project?.projectMetadata?.payButton || 'Pay';
</script>

<Pay
	{payButton}
	disabled
	onClick={() => console.info('🛠 TODO pay in create preview')}
	reservedRate={$project.fundingCycleMetadata.reservedRate.toNumber()}
	weight={$project.fundingCycle.weight}
	weightingFn={weightedAmount}
/>
