<script lang="ts">
	import { getContext, onMount } from 'svelte';
	import type Store from '$utils/Store';
	import { formatPercent, formatWad, fromWad, parseWad } from '$utils/formatNumber';
	import type { UserTokenBalanceContext, V2ProjectContextType } from '$models/project-type';
	import ActionModal from '$lib/components/ActionModal.svelte';
	import Button from '$lib/components/Button.svelte';
	import InfoSpaceBetween from '$lib/components/InfoSpaceBetween.svelte';
	import Trans from '$lib/components/Trans.svelte';
	import Input from '$lib/components/Input.svelte';
	import { formatRedemptionRate, MAX_REDEMPTION_RATE } from '$utils/v2/math';
	import { tokenSymbolText } from '$utils/tokenSymbolText';
	import Ethereum from '$lib/components/Ethereum.svelte';
	import { BigNumber, constants } from 'ethers';
	import { readContract, writeContract } from '$utils/web3/contractReader';
	import { V2ContractName } from '$models/v2/contracts';
	import { V2BallotState } from '$models/ballot';
	import { V2_CURRENCY_USD } from '$utils/v2/currency';
	import { connectedAccount } from '$stores/web3';
	import { randomBytes } from 'ethers/lib/utils';
	import { bind, openModal } from '$lib/components/Modal.svelte';
	import PendingTransaction from '$lib/components/PendingTransaction.svelte';

	const project = getContext('PROJECT') as Store<V2ProjectContextType>;
	const userTokenBalance = getContext('USER_TOKEN_BALANCE') as Store<UserTokenBalanceContext>;

	export let close: () => {};

	let amount: number;
	let title = `Redeem ${$project.tokenSymbol || 'tokens'} for ETH`;
	// TODO contract read for current users project.tokenAddress
	const userBalance = 0;
	$: totalBalance = $userTokenBalance.totalBalance;
	$: userOwnershipPercentage = formatPercent(totalBalance, $project.totalTokenSupply) || '0';

	let rewardAmount = BigNumber.from(0);
	let maxClaimable = BigNumber.from(0);
	let minReturnedTokens = BigNumber.from(0);
	let undistributedReservedTokens = BigNumber.from(0);

	let ready = false;
	onMount(async () => {
		undistributedReservedTokens = await readContract(
			V2ContractName.JBController,
			'reservedTokenBalanceOf',
			[$project.projectId, $project.fundingCycleMetadata?.reservedRate]
		);
		ready = true;
	});

	async function redeemTokensForEth() {
		const txnResponse = await writeContract(
			V2ContractName?.JBETHPaymentTerminal,
			'redeemTokensOf',
			[
				$connectedAccount, // _holder
				$project.projectId, // _projectId
				parseWad(amount), // _tokenCount, tokens to redeem
				constants.AddressZero, // _token, unused parameter
				minReturnedTokens, // _minReturnedTokens, min amount of ETH to receive
				$connectedAccount, // _beneficiary
				'', // _memo //TODO: memo field on V2RedeemModal
				randomBytes(1) // _metadata, TODO: metadata
			]
		);
		openModal(
			bind(PendingTransaction, {
				txnResponse,
				functionName: 'redeemTokensOf'
			})
		);
		const txnResult = await txnResponse.wait();
		console.log(txnResult);
	}
	function setMax() {
		amount = Number(fromWad(totalBalance));
	}

	function ethReceivedFromTokens(tokenAmount: BigNumber) {
		const {
			fundingCycle,
			fundingCycleMetadata,
			primaryTerminalCurrentOverflow,
			totalTokenSupply,
			ballotState
		} = $project;

		if (!fundingCycle) return;

		const realTotalTokenSupply = undistributedReservedTokens
			? totalTokenSupply?.add(undistributedReservedTokens)
			: totalTokenSupply;

		if (!fundingCycleMetadata || !realTotalTokenSupply?.gt(0) || !tokenAmount)
			return BigNumber.from(0);

		const redemptionRate =
			ballotState === V2BallotState.Active
				? fundingCycleMetadata.ballotRedemptionRate
				: fundingCycleMetadata.redemptionRate;

		const tokenAmountWad = parseWad(tokenAmount);

		// base = ox/s
		const base =
			realTotalTokenSupply && primaryTerminalCurrentOverflow
				? primaryTerminalCurrentOverflow.mul(tokenAmountWad).div(realTotalTokenSupply)
				: BigNumber.from(0);

		// numerator = r + (x(1 - r)/s)
		const numerator = redemptionRate.add(
			tokenAmountWad
				.mul(BigNumber.from(MAX_REDEMPTION_RATE).sub(redemptionRate))
				.div(realTotalTokenSupply)
		);

		// y = base * numerator ==> ox/s * ( r + (x(1 - r)/s) )
		return base.mul(numerator).div(MAX_REDEMPTION_RATE);
	}

	$: amount = Math.min(Number(fromWad(totalBalance)), Math.max(0, amount || 0));
	$: rewardAmount = ethReceivedFromTokens(BigNumber.from(parseWad(amount)));
	$: maxClaimable = ethReceivedFromTokens(totalBalance);
	$: minReturnedTokens = $project.distributionLimitCurrency?.eq(V2_CURRENCY_USD)
		? rewardAmount?.mul(1000).div(1005)
		: rewardAmount;
</script>

<ActionModal {title}>
	<InfoSpaceBetween>
		<p slot="left">
			<Trans>Redemption rate</Trans>:
		</p>
		<p slot="right">
			{formatRedemptionRate($project.fundingCycleMetadata.redemptionRate)}%
		</p>
	</InfoSpaceBetween>
	<InfoSpaceBetween>
		<p slot="left">
			<Trans>
				{tokenSymbolText({ tokenSymbol: $project.tokenSymbol, capitalize: true })} balance
			</Trans>:
		</p>
		<div slot="right" style="display: flex; flex-direction: column; align-items: flex-end;">
			<div>
				{formatWad(totalBalance ?? 0, { precision: 0 })}
				{tokenSymbolText({ tokenSymbol: $project.tokenSymbol, capitalize: true }).toUpperCase()}
			</div>
			<div>
				<small><Trans>({userOwnershipPercentage}% of supply)</Trans></small>
			</div>
		</div>
	</InfoSpaceBetween>
	<InfoSpaceBetween>
		<p slot="left">
			<Trans>Currently worth</Trans>:
		</p>
		<p slot="right">
			<Ethereum />{formatWad(maxClaimable, { precision: 4 })}
		</p>
	</InfoSpaceBetween>
	<p>
		Tokens can be redeemed for a portion of this project's ETH overflow, according to the redemption
		rate of the current funding cycle. <strong>Tokens are burned when they are redeemed.</strong>
	</p>
	<Input type="number" placeholder="0" bind:value={amount}>
		<div slot="addon" role="button" on:click={setMax}>MAX</div>
	</Input>
	<div slot="footer">
		<Button type="secondary" size="md" on:click={close}>Close</Button>
		<Button
			type="primary"
			size="md"
			on:click={redeemTokensForEth}
			disabled={!ready || !amount || Number(amount) === 0}>{title}</Button
		>
	</div>
	{#if $project.primaryTerminalCurrentOverflow?.gt(0)}
		<div style="font-weight: 500;margin-top: 20">
			{#if $project.distributionLimitCurrency.eq(V2_CURRENCY_USD)}
				<Trans>
					You will receive minimum {formatWad(
						$project.distributionLimitCurrency.eq(V2_CURRENCY_USD)
							? rewardAmount.mul(1000).div(1005)
							: rewardAmount,
						{ precision: 8 }
					) || '--'} ETH
				</Trans>
			{:else}
				<Trans>You will receive {formatWad(minReturnedTokens, { precision: 8 }) || '--'} ETH</Trans>
			{/if}
		</div>
	{/if}
</ActionModal>

<style>
	p {
		font-weight: 300;
	}
	/* TODO move this to reusable place */
	div[slot='addon'] {
		cursor: pointer;
		color: var(--text-action-primary);
		text-align: center;
		background: var(--background-action-secondary);
		border-radius: var(--radius-sm);
	}
</style>
