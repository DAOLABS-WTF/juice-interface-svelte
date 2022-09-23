<script lang="ts">
	import { onMount } from 'svelte';
	import Trans from '$lib/components/Trans.svelte';
	import type { ContractTransaction } from 'ethers';
	import Icon from '$lib/components/Icon';
	import type { UpdateNotification } from 'bnc-notify';
	import { createCustomNotification } from '$utils/notification';
	import { readNetwork } from '$stores/web3';

	export let txnResponse: ContractTransaction;
	export let functionName: string = '';
	export let notify = true;
	export let close: () => void;

	let errorMessage = '';

	onMount(async () => {
		try {
			let update: UpdateNotification;
			if (notify) {
				const { update: _update } = createCustomNotification({
					message: 'Your transaction has been submitted and is awaiting confirmation.',
					link: `https://${
						$readNetwork.alias === 'mainnet' ? '' : `${$readNetwork.alias}.`
					}etherscan.io/tx/${txnResponse.hash}`,
					type: 'pending'
				});
				update = _update;
			}
			let errorMessage = '';
			try {
				await txnResponse.wait();
			} catch (error) {
				errorMessage = error?.message || 'Transaction was failed';
			}
			if (notify && update) {
				update({
					message: errorMessage ? errorMessage : 'Your transaction has been confirmed successfully',
					link: `https://${
						$readNetwork.alias === 'mainnet' ? '' : `${$readNetwork.alias}.`
					}etherscan.io/tx/${txnResponse.hash}`,
					type: errorMessage ? 'error' : 'success'
				});
			}
			close();
		} catch (error) {
			errorMessage = error.message?.match(/^[\w\s]+/)?.[0];
		}
	});
</script>

<section>
	<div>
		{#if errorMessage}
			<h2>
				<Icon name="exclamationCircle" style="color: red; transform: translateY(3px)" /> Error
			</h2>
			<p class="error">{errorMessage}</p>
		{:else}
			<img src="/images/quint.gif" alt={'Juicebox loading animation'} />
			{#if functionName}
				<h3 style="margin-top: 0.5rem; font-weight: bold;text-transform:capitalize">
					Method: {functionName}
				</h3>
			{/if}
			<h2>
				<Trans>Transaction pending...</Trans>
			</h2>
			<p>
				<Trans>Your transaction has been submitted and is awaiting confirmation.</Trans>
			</p>
		{/if}
	</div>
</section>

<style>
	img {
		max-width: 100px;
	}
	section {
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 2rem 0;
	}

	div {
		max-width: 400px;
		text-align: center;
	}
</style>
