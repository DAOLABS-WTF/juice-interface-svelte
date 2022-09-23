<script lang="ts">
	import type { V2ProjectContextType } from '$models/project-type';
	import type Store from '$utils/Store';
	import { constants } from 'ethers';
	import { getContext } from 'svelte';
	import Input from './Input.svelte';
	import Dropdown from '$lib/components/Dropdown.svelte';
	import { bind, openModal } from './Modal.svelte';
	import AssetsModal from './AssetsModal.svelte';
	import Button from './Button.svelte';
	import { uploadProjectMetadata } from '$utils/ipfs';
	import { writeContract } from '$utils/web3/contractReader';
	import { V2ContractName } from '$models/v2/contracts';
	import { JUICEBOX_MONEY_METADATA_DOMAIN } from '$constants/v2/metadataDomain';
	import PendingTransaction from './PendingTransaction.svelte';
	import Icon from './Icon';
	import ActionModal from './ActionModal.svelte';

	const project = getContext('PROJECT') as Store<V2ProjectContextType>;

	let tokens = [...($project.projectMetadata.tokens || [])];

	let saving = false;

	async function saveAssets() {
		saving = true;
		try {
			const _tokens = tokens.filter((t) => t.value);
			const projectMetadata = { ...$project.projectMetadata, tokens: _tokens };
			const uploadedMetadata = await uploadProjectMetadata(
				projectMetadata,
				$project.projectMetadata.name.toLowerCase().replace(/[^\w]+/g, '_')
			);

			console.log('uploadedMetadata', uploadedMetadata);

			const cid = uploadedMetadata.IpfsHash;
			console.log({ cid });

			if (cid) {
				const txnResponse = await writeContract(V2ContractName.JBProjects, 'setMetadataOf', [
					$project.projectId,
					[cid, JUICEBOX_MONEY_METADATA_DOMAIN]
				]);
				openModal(
					bind(PendingTransaction, {
						txnResponse,
						functionName: 'setMetadataOf'
					})
				);
				const txnResult = await txnResponse.wait();
				console.log(txnResult);
				window.location.reload();
			}
		} catch (error) {
			console.error(error?.message);
		}
		saving = false;
	}
</script>

<ActionModal title="Tracked assets">
	<p style="margin-bottom: 40px;">
		Display ERC-20 and other Juicebox project tokens that this project owner holds.
	</p>
	<form>
		{#each tokens as token}
			<div class="row">
				<div style="flex: 1 1 auto;">
					<div>
						<div style="display: flex;width: 100%">
							<div style="width: 140px;">
								<Dropdown
									options={[
										{ label: 'ERC20', value: 'erc20' },
										{ label: 'Project', value: 'project' }
									]}
									bind:value={token.type}
								/>
							</div>
							<div style="width: 100%;">
								{#if token.type === 'erc20'}
									<Input
										type="address"
										placeholder={constants.AddressZero}
										bind:value={token.value}
									/>
								{:else}
									<Input type="string" placeholder="Project ID" bind:value={token.value} />
								{/if}
							</div>
						</div>
					</div>
				</div>
				<div class="delete">
					<Icon name="garbage" on:click={() => (tokens = tokens.filter((t) => token !== t))} />
				</div>
			</div>
		{/each}

		<Button
			buttonProps={{
				type: 'button'
			}}
			type="secondary"
			on:click={() => (tokens = [...tokens, { type: 'erc20', value: '' }])}
		>
			<Icon name="plus" />
			<span>Add token</span>
		</Button>
		<br />
	</form>
</ActionModal>
<div>
	<Button
		buttonProps={{
			type: 'button'
		}}
		type="secondary"
		on:click={() => openModal(bind(AssetsModal, {}))}
	>
		<span>Cancel</span>
	</Button>

	<Button
		buttonProps={{
			type: 'button'
		}}
		type="primary"
		on:click={saveAssets}
		loading={saving}
	>
		<span>Save tracked assets</span>
	</Button>
</div>

<style>
	.delete {
		flex: 0 0 auto;
		cursor: pointer;
		z-index: 20;
	}
	.row {
		display: flex;
		align-items: center;
		margin-bottom: 10px;
	}
</style>
