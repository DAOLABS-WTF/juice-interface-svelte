<script lang="ts">
	import ProjectPage from '../_project.svelte';
	import { page } from '$app/stores';

	$: projectId = Number($page.params.projectId);
</script>

{#if Number.isInteger(projectId)}
	<ProjectPage {projectId} redirectIfHasHandle={true} />
{:else}
	Project with id {projectId} not found
{/if}
