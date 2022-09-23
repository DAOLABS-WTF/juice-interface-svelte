<script lang="ts">
	import ProjectsTab from './ProjectsTab.svelte';
	import { projectCategory } from '$models/project-visibility';
	import type { ProjectCategory } from '$models/project-visibility';

	const TAB_TYPE_NAMES: { [k in ProjectCategory]: string } = {
		all: `All`,
		holdings: `Holdings`,
		myprojects: `My Projects`,
		trending: `Trending`
	};
</script>

<nav>
	{#each projectCategory as category}
		<div class="tab">
			<ProjectsTab type={category} title={TAB_TYPE_NAMES[category]} />
		</div>
	{/each}
</nav>

<style>
	nav {
		display: flex;
		align-items: center;
	}
	.tab {
		font-size: 14px;
		margin: 0px 15px;
	}

	.tab:first-of-type {
		margin-left: 0;
	}

	/* Query */
	@media (max-width: 400px) {
		.tab {
			font-size: 12px;
		}
	}
</style>
