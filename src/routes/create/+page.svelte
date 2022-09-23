<script lang="ts">
	import { modal, modalOptions } from '$stores';
	import Modal from '$lib/components/Modal.svelte';
	import CreateProject from '$lib/create/CreateProject.svelte';

	let projectType: ProjectType;
</script>

<svelte:head>
	<title>Create project | Juicebox</title>
	<script src="/libs/calculator.js"></script>
</svelte:head>

<CreateProject {projectType} />

<Modal show={$modal} {...$modalOptions} />
