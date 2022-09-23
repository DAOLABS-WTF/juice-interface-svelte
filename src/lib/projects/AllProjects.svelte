<script lang="ts">
	import { getProjects } from '$data/project';
	import type { Project, ProjectV2 } from '$models/subgraph-entities/vX/project';
	import ProjectCard from '$lib/components/ProjectCard.svelte';
	import InfiniteScroll from '$lib/components/InfiniteScroll.svelte';
	import { scrollTarget, showArchived, sortType } from '$stores/projectsForm';
	import { readNetwork } from '$stores/web3';
	import Loading from '$lib/components/Loading.svelte';
	import { V2ArchivedProjectIds } from '$constants/v2/archivedProjects';
	import type { ProjectState } from '$models/project-visibility';
	import type { ProjectMetadataV4 } from '$models/project-metadata';

	let loading = false;
	let pageNumber = 0;
	let projects: Project[] | undefined = [];
	let newBatch: Project[] | undefined = [];

	/**
	 * For the love of anything holy to you - if you change this file, 
	 * please make sure that the first projects don't load twice.
	 * 
	 * I don't want to fix the same issue a fouth time.
	 */

	let previousFetch = {
		showArchived: true,
		orderBy: 'totalPaid',
		network: $readNetwork
	};

	readNetwork.subscribe(($network) => {
		if ($network != previousFetch.network) {
			projects = [];
			newBatch = [];
			fetchData();
		}
	});

	const pageSize = 16;

	const fetchData = async () => {
		loading = true;
		const options = {
			orderBy: $sortType,
			pageNumber,
			pageSize,
			orderDirection: 'desc' as 'desc' | 'asc',
			state: ($showArchived ? 'archived' : 'active') as ProjectState,
			...($showArchived
				? {
						projectIds: V2ArchivedProjectIds()
				  }
				: {})
		};
		newBatch = await getProjects(options);
		projects = [...projects, ...newBatch];
		loading = false;
	};

	$: {
		if (previousFetch.orderBy !== $sortType || previousFetch.showArchived !== $showArchived) {
			pageNumber = 0;
			projects = [];
			fetchData().then(() => {
				previousFetch.orderBy = $sortType;
				previousFetch.showArchived = $showArchived;
			});
		}
	}

	function handleMetadata(project: ProjectV2) {
		return (event: CustomEvent<ProjectMetadataV4>) => {
			// const metadata = event.detail;
			// archivedProjects[project.projectId] = Boolean(metadata.archived);
		};
	}
</script>

<section>
	{#each projects as project}
		<ProjectCard
			{project}
			hideIfArchived={!$showArchived}
			on:fetchMetadata={handleMetadata(project)}
		/>
	{/each}
	<InfiniteScroll
		elementScroll={$scrollTarget}
		hasMore={!!newBatch.length}
		threshold={100}
		on:loadMore={() => {
			pageNumber += 1;
			fetchData();
		}}
	/>
</section>

{#if loading}
	<div class="loading">
		<Loading height={200} />
	</div>
{/if}
{#if projects?.length}
	<div class="projects-count">
		{projects.length} Projects
	</div>
{/if}

<style>
	section {
		margin: auto;
		display: grid;
		max-width: 1000px;
		grid-column-gap: 20px;
		grid-row-gap: 12px;
		grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
		grid-auto-flow: row;
	}
	.projects-count {
		padding: 5rem 0;
		display: flex;
		justify-content: center;
		align-items: center;
		color: var(--text-secondary);
	}
</style>
