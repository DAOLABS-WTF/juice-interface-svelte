<script lang="ts">
	import { getContext } from 'svelte';
	import { TABS } from './Tabs.svelte';

	export let id: string;
	export let disabled = false;
	export let onClick: (tabId: string) => void = undefined;

	const tab = id;
	const { registerTab, selectTab, selectedTab } = getContext(TABS);

	registerTab(tab);

	function click() {
		selectTab(tab);
		onClick && onClick(id);
	}
</script>

<button {id} {disabled} class:selected={$selectedTab === tab} on:click={click}>
	<slot />
	{#if $selectedTab === tab}
		<svg height="3" width="100%">
			<line x1="0" y1="0" x2="600" y2="0" stroke="var(--text-brand-primary)" stroke-width="3" />
		</svg>
	{/if}
</button>

<style>
	button {
		background: none;
		border: none;
		font-size: 18px;
		font-weight: 300;
		border-radius: 0;
		margin: 0;
		color: var(--secondary-text);
		padding-bottom: 16px;
		padding-top: 16px;
		padding-right: 40px;
		padding-left: 0px;
		position: relative;
		cursor: pointer;
		transform: translateY(2px);
		border-bottom: 2px solid transparent;
	}

	button:disabled {
		cursor: not-allowed;
		color: var(--text-disabled);
	}

	.selected svg {
		position: absolute;
		left: 0;
		bottom: 0px;
	}
	.selected {
		color: var(--text-brand-primary);
		font-weight: 600;
	}
	.selected {
		z-index: 1;
		transform: translateY(2px);
		transition: border-bottom 100ms;
	}

	@media (max-width: 900px) {
		button {
			padding-right: unset;
		}
	}

	@media (max-width: 650px) {
		button {
			padding-bottom: 5px;
			text-align: left;
		}
		.selected:after {
			background: none;
		}
	}
</style>
