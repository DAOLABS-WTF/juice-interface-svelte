<script lang="ts">
	import InfoBox from '$lib/components/InfoBox.svelte';
	import DescriptiveNumberedButton from '../DescriptiveNumberedButton.svelte';
	import Drawer from '$lib/components/Drawer.svelte';
	import FundingDrawer from './FundingDrawer.svelte';
	import RulesDrawer from '../RulesDrawer.svelte';
	import TokenDrawer from './TokenDrawer';
	import { visitedFundingDrawers as visited } from '../stores';

	let drawerOpen = false;
	let current = '';

	const buttons = [
		{
			title: 'Funding',
			description: 'Configure how your project will collect and spend funds'
		},
		{
			title: 'Token',
			description: "Configure the dynamics of your project's token."
		},
		{
			title: 'Rules',
			description: 'Configure restrictions for your funding cycles.'
		}
	];

	function onClick(button: string) {
		drawerOpen = true;
		current = button;
		visited.update((state: any) => ({
			...state,
			[button]: true
		}));
	}
</script>

<InfoBox
	info={`The configs below can be edited on a per-cycle basis. <br><br> Funding Cycle #1 will start immediately after you deploy your project. Once deployed, <b>Funding Cycle #1 can't be reconfigured.</b>
<br><br>
You can reconfigure your project's next funding cycle (Funding Cycle #2) at any time within the bounds of the rules set below.`}
/>

<section class="buttons">
	{#each buttons as button, number}
		<DescriptiveNumberedButton
			{...button}
			number={number + 1}
			onClick={() => onClick(button.title)}
			visited={$visited[button.title]}
		/>
	{/each}
</section>

<Drawer bind:shown={drawerOpen} let:close>
	<div class="content">
		{#if current === 'Funding'}
			<FundingDrawer {close}>
				<h1 slot="header">Funding</h1>
			</FundingDrawer>
		{:else if current === 'Token'}
			<TokenDrawer {close}>
				<header slot="header">
					<h1>Project token</h1>
					<h4 style="font-weight: 300;">Configure your project's tokenomics.</h4>
					<br />
				</header>
			</TokenDrawer>
		{:else if current === 'Rules'}
			<RulesDrawer {close}>
				<h1 slot="header">Rules</h1>
			</RulesDrawer>
		{/if}
	</div>
</Drawer>

<style>
	h1 {
		font-weight: 500;
		color: var(--text-header);
	}
	.buttons {
		margin-top: 40px;
	}

	.content {
		padding: 24px;
		font-size: 14px;
		line-height: 1.5715;
		word-wrap: break-word;
	}
</style>
