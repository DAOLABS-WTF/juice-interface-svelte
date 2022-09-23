<script>
	import { useProjectsSearch } from '$data/project';
	import Icon from '$lib/components/Icon';
	import Input from '$lib/components/Input.svelte';

	import { searchText, hasSearched, searchResults, isSearching } from '$stores/projectsForm';

	const handleClear = () => {
		$searchText = '';
		$hasSearched = false;
	};

	const handleSubmit = async () => {
		if ($searchText.length === 0) {
			handleClear();
			return;
		}
		$isSearching = true;
		$searchResults = await useProjectsSearch({ handle: $searchText.trim() });
		$hasSearched = true;
		$isSearching = false;
	};
</script>

<form on:submit|preventDefault={handleSubmit}>
	<Input bind:value={$searchText} placeholder="Search projects by handle" type="text">
		<div slot="addon">
			{#if $searchText}
				<Icon name="closeCircle" on:click={handleClear} />
			{/if}
		</div>
	</Input>

	<style>
		div[slot='addon'] {
			display: flex;
			align-items: center;
			justify-content: center;
			margin: 0;
			height: 100%;
			display: flex;
			align-items: flex-end;
			justify-content: center;
		}
		div[slot='addon']:hover {
			color: var(--icon-action-primary);
		}
	</style>
</form>
