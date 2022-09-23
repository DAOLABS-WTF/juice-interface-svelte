<script lang="ts">
	import ProjectPage from '../projects/_project.svelte';
	import { page } from '$app/stores';
	import Loading from '$lib/components/Loading.svelte';
	import { querySubgraph } from '$utils/graph';

	let handle = $page.params.handle;

	let projectId: number;

	let loading = true;

	async function handleToProjectId(handle: string) {
		console.log({ handle });
		const [project] =
			(await querySubgraph({
				entity: 'project',
				where: [
					{
						key: 'cv',
						value: '2'
					},
					{
						key: 'handle',
						value: handle.slice(1)
					}
				],
				keys: ['projectId', 'handle']
			})) || [];

		if (project) {
			projectId = project.projectId;
		}
		loading = false;
	}

	$: handle = $page.params.handle;
	$: if (handle) {
		if (handle.startsWith('@')) handleToProjectId(handle);
		else {
			loading = false;
			projectId = undefined;
		}
	}
</script>

{#if loading}
	<Loading />
{:else if typeof projectId === 'number'}
	<ProjectPage {projectId} />
{:else}
	<h2>Project {handle} not found!</h2>
{/if}
