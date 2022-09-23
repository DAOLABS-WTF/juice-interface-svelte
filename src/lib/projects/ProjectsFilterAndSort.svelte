<script>
	import Checkbox from '$lib/components/Checkbox.svelte';
	import Collapse from '$lib/components/Collapse.svelte';
	import Dropdown from '$lib/components/Dropdown.svelte';
	import Icon from '$lib/components/Icon';
	import { sortType, showArchived } from '$stores/projectsForm';

	const SORT_TYPES_MAP = {
		totalPaid: 'Total Raised',
		createdAt: 'Date Created'
	};
	let options = [];
	Object.keys(SORT_TYPES_MAP).forEach((key) => {
		options.push({
			label: SORT_TYPES_MAP[key],
			value: key
		});
	});
</script>

<div class="filter-and-sort">
	<Collapse>
		<div class="filter" class:active={$showArchived}>
			<Icon name="filter" /> Filter
		</div>
		<div slot="content">
			<span>
				<Checkbox bind:checked={$showArchived} /> Archived
			</span>
		</div>
	</Collapse>
	<div class="dropdown">
		<Dropdown {options} bind:value={$sortType} />
	</div>
</div>

<style>
	.active {
		color: var(--icon-action-primary);
	}
	.dropdown {
		width: 180px;
		margin-left: 30px;
	}
	.filter-and-sort {
		display: flex;
		justify-content: flex-end;
		align-items: center;
		width: 360px;
	}

	.filter {
		display: flex;
		align-items: center;
		width: 75px;
		justify-content: space-between;
	}

	span {
		display: flex;
		align-items: center;
		padding: 12px 18px;
		font-weight: 300;
	}
</style>
