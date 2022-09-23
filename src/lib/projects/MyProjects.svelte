<script lang="ts">
	import { onMount } from 'svelte';
	import { connectedAccount, readNetwork } from '$stores/web3';
	import { myProjectsQuery } from '$data/project';
	import type { Project } from '$models/subgraph-entities/vX/project';
	import Button from '$lib/components/Button.svelte';
	import Icon from '$lib/components/Icon';
	import ProjectCard from '$lib/components/ProjectCard.svelte';
	import ProjectCount from './ProjectCount.svelte';

	let projects: Project[] | undefined = undefined;
	let loading = true;

	async function fetchMyProjects() {
		loading = true;
		if ($connectedAccount !== '') {
			const res = await myProjectsQuery($connectedAccount);
			projects = res;
		}
		loading = false;
	}
	onMount(fetchMyProjects);

	$: $connectedAccount && $readNetwork && fetchMyProjects();
</script>

<div>
	{#if loading}
		<div class="loading">
			<Icon name="loading" spin={true} />
		</div>
	{:else if projects && projects.length > 0}
		<section>
			{#each projects as project}
				<ProjectCard {project} />
			{/each}
		</section>
		<ProjectCount count={projects.length} />
		<p>
			<span>
				<Icon name="infoCircle" />
			</span>
			Projects you have created.
		</p>
	{:else}
		<p>
			<span>
				<Icon name="exclamationCircle" />
			</span> You haven't created any projects yet.
		</p>
		<a href="create">
			<Button type="primary" size="md">Create project</Button>
		</a>
	{/if}
</div>

<style>
	section {
		margin: auto;
		margin-bottom: 40px;
		display: grid;
		max-width: 1000px;
		grid-column-gap: 20px;
		grid-row-gap: 12px;
		grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
		grid-auto-flow: row;
	}
</style>
