<script lang="ts">
	import { onMount } from 'svelte';
	import type { Project } from '$models/subgraph-entities/vX/project';
	import type { ProjectMetadataV4 } from '$models/project-metadata';
	import { getProjectMetadata } from '$data/project';
	import ProjectLogo from './ProjectLogo.svelte';
	import Loading from './Loading.svelte';
	import EthAmount from './ETHAmount.svelte';

	export let project: Project;

	let loading = true;
	let metadata: ProjectMetadataV4;

	let isMobile = false;

	onMount(async () => {
		try {
			metadata = await getProjectMetadata(project.metadataUri);
		} catch (error) {
			console.log(error);
		}
		loading = false;

		isMobile = window.innerWidth < 768;
	});
</script>

<a href="/projects/{project.projectId}">
	{#if loading}
		<Loading />
	{:else}
		<ProjectLogo uri={metadata.logoUri} size={isMobile ? 60 : 90} />
		<div>
			<span>{metadata.name}</span>
			<p><b><EthAmount amount={project.totalPaid} precision={2} /> raised</b></p>
		</div>
	{/if}
</a>

<style>
	a {
		cursor: pointer;
		overflow: hidden;
		width: 180px;
		padding: 1rem;
		text-align: center;

		border: 1px solid var(--stroke-tertiary);
		transition: border-color 0.12s ease-out;

		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		color: var(--text-primary);
	}

	a:hover {
		border-color: var(--stroke-secondary);
	}

	span {
		color: var(--text-primary);
		margin: 0px;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	div {
		min-width: 0px;
		width: 100%;
		white-space: pre;
	}

	p {
		margin: 0;
	}

	@media (max-width: 767px) {
		a {
			width: 100%;
			padding: 0.5rem;
			flex-direction: row;
		}

		div {
			width: 100%;
			font-size: 14px;
		}
	}
</style>
