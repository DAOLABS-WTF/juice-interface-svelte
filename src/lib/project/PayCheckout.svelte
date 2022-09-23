<script lang="ts">
	import { getContext, onMount } from 'svelte';
	import type { BigNumber } from 'ethers';
	import type { V2ProjectContextType } from '$models/project-type';
	import type Store from '$utils/Store';
	import { formatWad } from '$utils/formatNumber';
	import { weightedAmount } from '$utils/v2/math';
	import {
		getUnsafeV2FundingCycleProperties,
		V2FundingCycleRiskCount
	} from '$utils/v2/fundingCycle';
	import { FUNDING_CYCLE_WARNING_TEXT } from '$constants/fundingWarningText';
	import Input from '$lib/components/Input.svelte';
	import InfoBox from '$lib/components/InfoBox.svelte';
	import Toggle from '$lib/components/Toggle.svelte';
	import Trans from '$lib/components/Trans.svelte';
	import UploadField from '$lib/components/UploadField.svelte';
	import Button from '$lib/components/Button.svelte';
	import Checkbox from '$lib/components/Checkbox.svelte';
	import Modal, { bind, openModal } from '$lib/components/Modal.svelte';
	import PendingTransaction from '$lib/components/PendingTransaction.svelte';
	import Icon from '$lib/components/Icon';
	import { writeContract } from '$utils/web3/contractReader';
	import { ETH_TOKEN_ADDRESS } from '$constants/v2/juiceboxTokens';
	import { connectedAccount, web3Connect } from '$stores/web3';
	import { randomBytes } from 'ethers/lib/utils';
	import { V2ContractName } from '$models/v2/contracts';
	import Textarea from '$lib/components/Textarea.svelte';
	import Expandable from '$lib/components/Expandable.svelte';
	import StickerModal from '$lib/components/StickerModal.svelte';
	import RichImgPreview from '$lib/components/RichImgPreview.svelte';

	const projectContext = getContext('PROJECT') as Store<V2ProjectContextType>;

	export let close: () => {};
	export let weiAmount: BigNumber;

	const project = $projectContext;
	const metadata = $projectContext.projectMetadata;
	const fundingCycle = $projectContext.fundingCycle;
	const fundingCycleMetadata = $projectContext.fundingCycleMetadata;

	$: amountString = formatWad(weiAmount);
	// TODO we need to prepend memo with something to align with the snapshot
	// re decentralisation
	let memo: string = '';
	let checked = false;
	let erc20 = false;
	let receivedTickets: string;
	let ownerTickets: string;
	let customBeneficiary: string;
	let riskCount: number;
	let stickers = [];
	let showStickerModal = false;
	let warnings = [];

	function autosize() {
		const textarea = document.querySelector('textarea');
		setTimeout(function () {
			textarea.style.cssText = 'height:auto; padding:0';
			textarea.style.cssText = 'height:' + textarea.scrollHeight + 'px';
		}, 0);
	}

	function onStickerSelect(sticker: String) {
		const stickerUri = new URL(`${window.location.origin}${sticker}`);
		stickers = [...stickers, stickerUri.toString()];
		showStickerModal = false;
	}

	function removeSticker(sticker: String) {
		stickers = stickers.filter((s) => s !== sticker);
	}

	async function payProject() {
		try {
			if (!$connectedAccount) return await web3Connect();
			// NOTE potentially checkout src/utils/buildPaymentMemo on jb.money
			const stickerString = `\n ${stickers.join(' ')}`;
			const finalMemo = `${memo} ${stickerString}`;

			const txnResponse = await writeContract(
				V2ContractName?.JBETHPaymentTerminal,
				'pay',
				[
					$projectContext.projectId,
					weiAmount,
					$projectContext.tokenAddress || ETH_TOKEN_ADDRESS,
					$connectedAccount,
					0,
					erc20,
					finalMemo,
					randomBytes(1) //delegateMetadata
				],
				{
					value: weiAmount
				}
			);
			openModal(
				bind(PendingTransaction, {
					txnResponse,
					functionName: 'pay'
				})
			);
		} catch (error) {
			console.error(error);
		}
	}

	onMount(() => {
		// TODO: there's something weird here with the reserved rate
		// PLS HELP, I CANNOT FIGURE OUT WHAT IS GOING ON
		receivedTickets = weightedAmount(
			fundingCycle?.weight,
			fundingCycleMetadata.reservedRate.toNumber(),
			weiAmount,
			'payer'
		);
		ownerTickets = weightedAmount(
			fundingCycle?.weight,
			fundingCycleMetadata.reservedRate.toNumber(),
			weiAmount,
			'reserved'
		);
		// Get the risk properties for the InfoBox
		const risk = getUnsafeV2FundingCycleProperties(fundingCycle);
		riskCount = V2FundingCycleRiskCount(fundingCycle);
		warnings = Object.keys(risk)
			.filter((k) => risk[k])
			.map((k) => FUNDING_CYCLE_WARNING_TEXT()[k]);
	});

	$: projectName = $projectContext.projectMetadata.name;
	$: canAddMoreStickers = stickers.length < 3;
</script>

<main>
	<h3><Trans>Pay {projectName}</Trans></h3>
	{#if riskCount}
		<InfoBox>
			Paying {projectName} is not an investment — it's a way to support the project. {projectName} determines
			any value or utility of the tokens you receive. By continuing you acknowledge that you have read
			and understood the
			<a href="https://info.juicebox.money/tos" target="_blank">Juicebox's Terms of Service.</a>
		</InfoBox>
	{/if}
	<br />
	{#if metadata.payDisclosure}
		<h4>Notice:</h4>
		<p>{metadata.payDisclosure}</p>
	{/if}
	<table>
		<tbody
			><tr
				><th colspan="1"><span>Pay amount</span></th><td colspan="1"><span>{amountString}</span></td
				></tr
			><tr
				><th colspan="1"><span>Tokens for you</span></th><td colspan="1"
					><span
						><div>{formatWad(receivedTickets, { precision: 0 })}</div>
						<div /></span
					></td
				></tr
			><tr
				><th colspan="1"><span>{project.tokenSymbol || 'Tokens'} reserved</span></th><td colspan="1"
					><span>{formatWad(ownerTickets, { precision: 0 })}</span></td
				></tr
			></tbody
		>
	</table>
	<Expandable title="Customize payment" titleColor="var(--text-primary)" expanded>
		<Textarea
			id="memo"
			label="Memo"
			rows="1"
			maxlength={256}
			placeholder="(Optional) Add a memo to this payment on-chain"
			bind:value={memo}
		>
			<span slot="addon" class:disabled={!canAddMoreStickers}>
				<Icon
					name="emoji"
					on:click={() => {
						if (canAddMoreStickers) {
							showStickerModal = true;
						}
					}}
				/>
			</span>
		</Textarea>
		<div class="stickers">
			{#each stickers as sticker}
				<RichImgPreview src={sticker} height="70px" style={{ marginBottom: '10px' }} />
				<span class="action">
					<Icon name="closeCircle" on:click={() => removeSticker(sticker)} />
				</span>
			{/each}
		</div>
		<UploadField
			onChange={(url) => {
				if (url) {
					memo = `${url}   ${memo || ''}`;
					autosize();
				}
			}}
		/>
		<div class="row">
			<label for="tokenBeneficiary">Custom token beneficiary</label>
			<Toggle bind:checked /> (<small><Trans>Mint tokens to a custom address.</Trans></small>)
		</div>
		{#if checked}
			<Input
				bind:value={customBeneficiary}
				placeholder={'juicebox.eth / 0x0000000000000000000000000000000000000000'}
				type="address"
			/>
		{/if}
	</Expandable>

	<div class="item">
		<p><b>Receive ERC-20</b></p>
		<div class="row">
			<div class="checkbox-wrapper">
				<Checkbox bind:checked={erc20} />
			</div>
			<p>
				<Trans>
					Check this to mint this project's ERC-20 tokens to your wallet. Leave unchecked to have
					your token balance tracked by Juicebox, saving gas on this transaction. You can always
					claim your ERC-20 tokens later.
				</Trans>
			</p>
		</div>
	</div>
	<div class="buttons">
		<Button on:click={close} type="secondary" size="md">Close</Button>
		<Button on:click={payProject} type="primary" size="md">Pay</Button>
	</div>
</main>
<Modal
	show={showStickerModal && bind(StickerModal, { onSelect: onStickerSelect })}
	on:close={() => (showStickerModal = false)}
/>

<style>
	h3,
	h4 {
		color: var(--text-header);
	}
	main {
		padding: 1rem;
		max-width: 750px;
		font-size: 0.8rem;
	}
	table {
		width: 100%;
		margin: 20px 0px;
	}
	tbody,
	tr {
		border: 1px solid var(--stroke-primary);
	}
	th {
		font-weight: 600;
		text-align: left;
		color: var(--text-secondary);
		border-right: 1px solid var(--stroke-primary);
	}
	td {
		font-weight: 300;
		text-align: right;
	}

	th,
	td {
		padding: 12px 18px;
	}

	p {
		font-weight: 300;
		margin: 0;
	}

	label {
		margin: 10px 0px;
		margin-right: 10px;
	}

	small {
		font-weight: 300;
		font-size: 0.8rem;
	}

	span[slot='addon'] {
		font-size: 16px;
	}

	span[slot='addon']:hover,
	.action:hover {
		cursor: pointer;
		color: var(--text-action-primary);
	}

	span[slot='addon'].disabled {
		color: var(--text-disabled);
		cursor: not-allowed;
	}

	.buttons {
		margin-top: 20px;
		margin-bottom: 20px;
	}
	.row {
		align-items: center;
		margin-top: 1rem;
		display: flex;
	}
	.row p {
		margin-right: 10px;
	}
	.item {
		margin: 20px 0px;
	}

	.stickers {
		display: flex;
		flex-wrap: wrap;
	}

	@media (max-width: 768px) {
		.buttons {
			margin-bottom: 4rem;
		}
	}
</style>
