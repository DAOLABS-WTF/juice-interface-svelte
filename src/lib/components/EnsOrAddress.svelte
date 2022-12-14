<script lang="ts">
	import Tooltip from '$lib/project/Tooltip.svelte';
	import { formattedNum } from '$utils/formatNumber';

	import { ensFromAddress } from '$utils/web3/address';
	import axios from 'axios';
	import { BigNumber, utils } from 'ethers';
	import { onMount } from 'svelte';
	import { getTruncatedAddress } from './Address.svelte';
	import AddressTooltip from './AddressTooltip.svelte';
	import EthAmount from './ETHAmount.svelte';
	import Ethereum from './Ethereum.svelte';
	import GnosisAddress from './GnosisAddress.svelte';
	import Icon from '$lib/components/Icon';
	import Popover from './Popover.svelte';

	export let address: string;
	export let truncate: boolean = true;
	export let showTooltip = true;
	export let token: { symbol: string; decimals: number; image: string } = undefined;

	const resolved: Record<string, { ens: string; timestamp: number }> = {};
	let mounted = false;

	let deepDao;

	onMount(() => {
		const jsonString = localStorage.getItem('resolved-ens') || '{}';
		const addresses = JSON.parse(jsonString) || {};
		for (const address in addresses) {
			const _address = address.toLowerCase();
			resolved[_address] = {
				ens: addresses[_address].ens,
				timestamp: addresses[_address].timestamp
			};
		}
		mounted = true;
	});

	const THREE_DAYS = 3 * 86400_000;

	$: if (address) {
		getDeepDaoScore(address).then((res) => (deepDao = res));
	}

	async function getDeepDaoScore(address: string) {
		const CACHE_KEY = 'DEEPDAO_CACHE';
		const cache = JSON.parse(localStorage.getItem(CACHE_KEY) || '{}');
		if (cache[address] && cache[address].cached_at > Date.now() - 1000 * 60 * 60 * 24 * 10) {
			return cache[address];
		}
		const { data } = await axios(
			`${import.meta.env.VITE_FIREBASE_FUNCTIONS_URL}/app/deepdao/score/${address}`,
			{
				headers: {
					apikey: import.meta.env.VITE_API_KEY
				}
			}
		);
		if (data && data.date) {
			localStorage.setItem(
				CACHE_KEY,
				JSON.stringify({
					...cache,
					[address]: {
						...(data || {}),
						cached_at: Date.now()
					}
				})
			);
		}
		return data;
	}

	function checkCache(address: string) {
		const _address = (address || '').toLowerCase();
		if (resolved[_address] && resolved[_address].timestamp > Date.now() - THREE_DAYS) {
			return resolved[_address].ens;
		}
		return '';
	}

	function setResolved(ens: string, address: string) {
		if (ens) {
			const _address = address.toLowerCase();
			resolved[_address] = { ens, timestamp: Date.now() };
			localStorage.setItem('resolved-ens', JSON.stringify(resolved));
		}
		return true;
	}

	async function getGnosisBalanceInEth(address: string) {
		try {
			const { data } = await axios(
				`${import.meta.env.VITE_FIREBASE_FUNCTIONS_URL}/app/gnosis/balances/${utils.getAddress(
					address
				)}/total`,
				{
					headers: {
						apikey: import.meta.env.VITE_API_KEY
					}
				}
			);
			if (data?.ethValue) {
				return BigNumber.from(data?.ethValue);
			}
			return BigNumber.from(0);
		} catch (error) {
			console.error(error);
		}
	}
</script>

{#if mounted}
	<span>
		<GnosisAddress
			address={address ? utils.getAddress(address) : undefined}
			let:isGnosis
			let:owners
			let:threshold
			let:pendingTransactions
		>
			<div class="align">
				{#await checkCache(address) || ensFromAddress(address, truncate)}
					{#if showTooltip}
						<AddressTooltip {address} {token} deepdao={deepDao}>
							{getTruncatedAddress(address)}
						</AddressTooltip>
					{:else}
						{getTruncatedAddress(address)}
					{/if}
				{:then ens}
					{#if showTooltip}
						<AddressTooltip {address} {token} deepdao={deepDao}>
							{#if ens?.toLowerCase()?.endsWith('.eth')}
								{setResolved(ens, address) ? '' : ''}
							{/if}{ens}
						</AddressTooltip>
					{:else}
						{#if ens?.toLowerCase()?.endsWith('.eth')}
							{setResolved(ens, address) ? '' : ''}
						{/if}{ens}
					{/if}
				{:catch error}
					{#if showTooltip}
						<AddressTooltip {address} {token} deepdao={deepDao}>
							{getTruncatedAddress(address)}
						</AddressTooltip>
					{:else}
						{getTruncatedAddress(address)}
					{/if}
				{/await}
				{#if isGnosis && Array.isArray(owners)}
					<Popover maxWidth="250px" placement="top">
						<span class="gnosis-icon">
							<Icon name="gnosis" />
						</span>
						<div slot="content" class="owners">
							{#if owners?.length}
								<small>Threshold: {threshold} / {owners?.length}</small>
							{/if}
							{#await getGnosisBalanceInEth(address)}
								<small>Balance: ...</small>
							{:then balance}
								<small
									>Balance: <Ethereum />{formattedNum(balance, {
										thousandsSeparator: ','
									})}
								</small>
							{/await}
							<small>Pending Txns: {(pendingTransactions || []).length}</small>
							{#each owners || [] as owner}
								<div class="owner">
									<a href={`https://etherscan.io/address/${owner}`} target="_blank">
										<svelte:self address={owner} showTooltip={false} />
										<Icon name="etherscan" />
									</a>
								</div>
							{/each}
						</div>
					</Popover>
				{/if}
			</div>
		</GnosisAddress>
	</span>
{/if}

<style>
	span {
		display: inline-flex;
		gap: 0.5rem;
		align-items: center;
	}
	.owners {
		display: flex;
		flex-direction: column;
	}
	.align {
		display: flex;
		align-items: center;
		gap: 0.25rem;
	}
	.owner,
	.owner a {
		display: flex;
		align-items: center;
		gap: 0.25rem;
	}
	.gnosis-icon {
		transform: translateY(2px);
	}
</style>
