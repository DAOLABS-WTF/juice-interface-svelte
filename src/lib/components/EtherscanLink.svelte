<script lang="ts">
	import { NetworkName } from '$models/network-name';
	import { readNetwork } from '$stores/web3';
	import Popover from '$lib/components/Popover.svelte';
	import ExternalLink from './ExternalLink.svelte';
	import Icon from '$lib/components/Icon';
	import { get } from 'svelte/store';
	import EnsOrAddress from './EnsOrAddress.svelte';

	export let value: string;
	export let type: 'tx' | 'address';
	export let truncated: boolean = false;
	export let showTooltip = true;

	let subdomain = '';
	if (get(readNetwork).alias !== NetworkName.mainnet) {
		subdomain = get(readNetwork).alias + '.';
	}

	const href = `https://${subdomain}etherscan.io/${type}/${value}`;
	const innerWidth = window?.innerWidth;
</script>

{#if showTooltip}
	<Popover
		message={type === 'tx' ? 'See transaction' : 'Go to Etherscan'}
		placement="left"
		nowrap={true}
	>
		<ExternalLink {href}>
			{#if type === 'tx'}
				<span class="link">
					<Icon name="link" />
				</span>
			{:else}
				<EnsOrAddress truncate={truncated} address={value} showTooltip={false} />
			{/if}
		</ExternalLink>
	</Popover>
{:else}
	<ExternalLink {href}>
		{#if type === 'tx'}
			<span class="link">
				<Icon name="link" />
			</span>
		{:else}
			<EnsOrAddress truncate={truncated} address={value} showTooltip={false} />
		{/if}
	</ExternalLink>
{/if}

<style>
	.link {
		color: var(--text-primary);
	}

	.link:hover {
		color: var(--text-action-primary);
		transition: color 0.2s ease-in-out;
	}
</style>
