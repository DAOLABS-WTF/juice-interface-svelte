<script context="module">
	export const metadataFields = [
		{
			id: 'name',
			category: 'details',
			label: 'Project name',
			placeholder: "Peach's Juicebox Stand",
			props: {
				required: true,
				maxlength: 64
			}
		},
		{
			id: 'description',
			category: 'details',
			label: 'Project description',
			type: 'textarea',
			props: {
				maxlength: 5000
			}
		},
		{
			id: 'infoUri',
			category: 'links',
			label: 'Website',
			placeholder: 'https://your-project.com',
			props: {
				type: 'url'
			}
		},
		{
			id: 'twitter',
			category: 'links',
			label: 'Twitter handle',
			prefix: '@',
			placeholder: 'your-project',
			props: {
				pattern: '([a-zA-Z0-9_%]*)'
			}
		},
		{
			id: 'discord',
			category: 'links',
			label: 'Discord',
			placeholder: 'https://discord.gg/abcdefgh',
			props: {
				type: 'url',
				pattern: '^((https?://)?discord.gg/)([a-zA-Z0-9]*)'
			}
		},
		{
			id: 'payButton',
			category: 'project_page_customization',
			label: 'Pay button text',
			placeholder: 'Pay',
			description: 'Customize your project\'s "pay" button. Leave blank to use the default.',
			props: {
				maxlength: 16
			}
		},
		{
			id: 'payDisclosure',
			category: 'project_page_customization',
			label: 'Pay disclosure',
			description: 'Disclose any details to your contributors before they pay your project.',
			type: 'textarea',
			props: {
				maxlength: 256
			}
		}
	];
</script>

<script lang="ts">
	import { getContext } from 'svelte';
	import type Store from '$utils/Store';
	import type { V2ProjectContextType } from '$models/project-type';
	import InfoBox from '$lib/components/InfoBox.svelte';
	import Input from '$lib/components/FormField.svelte';
	import UploadField from '$lib/components/UploadField.svelte';

	let project = getContext('PROJECT') as Store<V2ProjectContextType>;

	export let info =
		'You can edit your project details after creation at any time, but the transaction will cost gas.';
	export let setValid: (disabled: boolean) => void = undefined;

	const details = metadataFields.filter((field) => field.category === 'details');
	const links = metadataFields.filter((field) => field.category === 'links');
	const projectPageCustomization = metadataFields.filter(
		(field) => field.category === 'project_page_customization'
	);

	function onLogoChange(src: string) {
		project.update((state: any) => ({
			...state,
			projectMetadata: {
				...state.projectMetadata,
				logoUri: src
			}
		}));
	}
</script>

{#each details as field}
	<Input
		{field}
		on:valid={(e) => setValid(e.detail.value)}
		bind:value={$project.projectMetadata[field.id]}
	/>
{/each}
<UploadField
	accept=".png, .jpg, .jpeg, .gif, .bmp, .ico, .tiff, .svg, .ai, .psp, .pcd, .pct, .raw"
	onChange={onLogoChange}
	url={$project.projectMetadata?.logoUri || ''}
/>

<h3>Links</h3>
{#each links as field}
	<Input
		{field}
		on:valid={(e) => setValid(e.detail.value)}
		bind:value={$project.projectMetadata[field.id]}
	/>
{/each}

<h3>Project page customization</h3>
{#each projectPageCustomization as field}
	<Input
		{field}
		on:valid={(e) => setValid(e.detail.value)}
		bind:value={$project.projectMetadata[field.id]}
	/>
{/each}
<InfoBox {info} />
<br />

<style>
	h3 {
		color: var(--text-header);
	}

	h3:not(:first-of-type) {
		color: var(--text-header);
		margin-top: 40px;
	}
</style>
