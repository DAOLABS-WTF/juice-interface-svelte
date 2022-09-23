<script lang="ts">
	import { getContext } from 'svelte';
	import { BigNumber, utils } from 'ethers';
	import type Store from '$utils/Store';
	import type { V2ProjectContextType } from '$models/project-type';
	import { connectedAccount } from '$stores/web3';
	import { JUICEBOX_MONEY_METADATA_DOMAIN } from '$constants/v2/metadataDomain';
	import { fromWad, parseWad } from '$utils/formatNumber';
	import { uploadProjectMetadata } from '$utils/ipfs';
	import { writeContract } from '$utils/web3/contractReader';
	import { V2ContractName } from '$models/v2/contracts';
	import { bind, openModal } from '$lib/components/Modal.svelte';
	import CurrencyInput from '$lib/components/CurrencyInput.svelte';
	import Button from '$lib/components/Button.svelte';
	import Icon from '$lib/components/Icon';
	import Input from '$lib/components/Input.svelte';
	import Trans from '$lib/components/Trans.svelte';
	import PendingTransaction from '$lib/components/PendingTransaction.svelte';
	import { ETH_TOKEN_ADDRESS } from '$constants/v2/juiceboxTokens';
	import DrawerTabs from '$lib/components/DrawerTabs.svelte';
	import HeavyBorderBox from '$lib/components/HeavyBorderBox.svelte';
	import CreatePayableAddress from './CreatePayableAddress.svelte';
	import Carousel from '$lib/components/Carousel.svelte';
	import PayableAddress from './PayableAddress.svelte';
	import Popover from '$lib/components/Popover.svelte';

	// import { Roles } from '$models/v2/roles';
	// let newRoleAdress: string;
	// let newRoleType: Roles;

	export let balance = 0;
	export let token = '';

	const project = getContext('PROJECT') as Store<V2ProjectContextType>;

	let transferTokenAmount = 0;
	let transferTokenTo: Address;

	let currentTab = 0;
	let tabs =
		$project.projectOwnerAddress.toLowerCase() === $connectedAccount.toLowerCase()
			? [
					'General',
					'Ownership'
					// 'Roles'
					// 'Landing Page'
			  ]
			: ['General'];

	// NOTE this will be a big number due to CurrencyInput
	let addToBalanceAmount = BigNumber.from(0);

	async function transfer() {
		const { projectId } = $project;
		const amount = parseWad(transferTokenAmount);
		const txnResponse = await writeContract(V2ContractName.JBTokenStore, 'transferFrom', [
			$connectedAccount,
			projectId,
			transferTokenTo,
			amount.toHexString()
		]);
		openModal(
			bind(PendingTransaction, {
				txnResponse,
				functionName: 'transferFrom'
			})
		);
		const txnResult = await txnResponse.wait();
		console.log(txnResult);
	}

	async function addToBalance() {
		const DEFAULT_MEMO = '';
		const { projectId } = $project;

		const DEFAULT_METADATA = [0x1];
		try {
			const txnResponse = await writeContract(
				V2ContractName?.JBETHPaymentTerminal,
				'addToBalanceOf',
				[
					projectId,
					addToBalanceAmount.toHexString(),
					ETH_TOKEN_ADDRESS,
					DEFAULT_MEMO,
					DEFAULT_METADATA
				],
				{
					// Settings gasLimit to 0 so that it will force metamask to handle errors
					// https://github.com/ethers-io/ethers.js/discussions/2149
					gasLimit: 0,
					value: addToBalanceAmount.toHexString()
				}
			);
			openModal(
				bind(PendingTransaction, {
					txnResponse,
					functionName: 'addToBalanceOf'
				})
			);
			const txnResult = await txnResponse.wait();
			console.log(txnResult);
		} catch (e) {
			console.log(e.message);
		}
	}

	function setMax() {
		transferTokenAmount = Number(fromWad(balance));
	}

	function transferOwnership() {
		// TODO:
	}
	function postGitHubIssueForArchive({ archived, projectId, metadata, handle }) {
		console.log('TODO: create issue on github repo');
		// axios.post(
		// 	'https://api.github.com/repos/jbx-protocol/juice-interface/issues',
		// 	{
		// 		title: `[${archived ? 'ARCHIVE' : 'UNARCHIVE'}] Project: "${metadata?.name}"`,
		// 		body: `<b>Chain:</b> ${$readNetwork.alias} \n <b>Project ID:</b> ${projectId}${
		// 			handle ? `\n <b>Handle:</b> ${handle}` : ''
		// 		}`
		// 	},
		// 	{
		// 		headers: {
		// 			Authorization: `Bearer ${process.env.VITE_GITHUB_ACCESS_TOKEN}`
		// 		}
		// 	}
		// );
	}
	let archiving = false;
	async function archiveProject() {
		let archived = true;

		if (
			!$connectedAccount ||
			$connectedAccount.toLowerCase() !== $project.projectOwnerAddress?.toLowerCase()
		) {
			return alert(`Connected wallet not authorized`);
		}
		archiving = true;

		const uploadedMetadata = await uploadProjectMetadata({
			...$project.projectMetadata,
			archived
		});
		if (!uploadedMetadata.IpfsHash) {
			return alert(`Failed to update project metadata`);
		}
		console.log({ uploadedMetadata });
		// Create github issue when archive is requested
		// https://docs.github.com/en/rest/reference/issues#create-an-issue
		// Do this first, in case the user closes the page before the on-chain tx completes
		postGitHubIssueForArchive({
			archived,
			projectId: $project.projectId,
			metadata: $project.projectMetadata,
			handle: $project.handle
		});

		const txnResponse = await writeContract(V2ContractName.JBProjects, 'setMetadataOf', [
			$project.projectId,
			[uploadedMetadata.IpfsHash, JUICEBOX_MONEY_METADATA_DOMAIN]
		]);
		openModal(
			bind(PendingTransaction, {
				txnResponse,
				functionName: 'setMetadataOf'
			})
		);
		await txnResponse.wait();
		archiving = false;
		location.reload();
	}
	function addRole() {
		// TODO:
	}
	function createLandingPage() {
		// TODO:
	}

	$: payableAddresses = $project.events?.filter((event) => event?.deployETHERC20ProjectPayerEvent);
	$: alreadyDeployedProjectPayer = payableAddresses?.findIndex(
		(event) => event?.deployETHERC20ProjectPayerEvent?.caller === $connectedAccount
	);
</script>

<section>
	<h3><Trans>Tools</Trans></h3>
	<DrawerTabs {tabs} bind:currentTab />

	{#if currentTab === 0}
		<HeavyBorderBox margin="32px" padding="16px 32px">
			<div class="box" style="margin-bottom: 16px;">
				<h4><Trans>Create payable address</Trans></h4>
				{#if payableAddresses?.length}
					<p>
						<Trans
							>A project payer contract has been deployed, your project can directly recieve
							Ethereum.</Trans
						>
					</p>
					{#if payableAddresses.length}
						<!-- Note this is copied in PayableAddressCarouselModal -->
						<Carousel
							items={payableAddresses}
							startIndex={-1 < alreadyDeployedProjectPayer ? alreadyDeployedProjectPayer : 0}
							let:item
							let:index
						>
							<PayableAddress event={item?.deployETHERC20ProjectPayerEvent}>
								<span slot="extra">
									{#if payableAddresses.length > 1}
										{index + 1}/{payableAddresses.length}
									{/if}
									{#if index === alreadyDeployedProjectPayer}
										<Popover message="This address is deployed by you.">
											<Icon name="user" />
										</Popover>
									{/if}
								</span>
							</PayableAddress>
						</Carousel>
					{/if}
				{/if}
				<p>
					<Trans>Create an Ethereum address that can be used to pay your project directly.</Trans>
				</p>
				<div class="button">
					<Button
						type="primary"
						size="md"
						on:click={() => openModal(CreatePayableAddress)}
						disabled={!$connectedAccount}
					>
						Deploy project payer contract
					</Button>
				</div>
			</div>
		</HeavyBorderBox>

		<HeavyBorderBox margin="32px" padding="16px 32px">
			<div class="box">
				<h4><Trans>Transfer unclaimed {token}</Trans></h4>
				<p><Trans>Your unclaimed token balance: {balance}</Trans></p>

				<label for="amount">Amount</label>
				<span class="input">
					<Input type="number" bind:value={transferTokenAmount} max={Number(fromWad(balance))}>
						<div slot="addon" role="button" on:click={setMax}>MAX</div>
					</Input>
				</span>

				<label for="to">Recipient address</label>
				<span class="input">
					<Input
						id="to"
						bind:value={transferTokenTo}
						type="address"
						placeholder="juicebox.eth / 0x0000000000000000000000000000000000000000"
					/>
				</span>

				<div class="button">
					<Button
						type="primary"
						size="md"
						on:click={transfer}
						disabled={!balance || !utils.isAddress(transferTokenTo)}
					>
						>Transfer {token}</Button
					>
				</div>
			</div>
		</HeavyBorderBox>

		<HeavyBorderBox margin="32px" padding="16px 32px">
			<div class="box">
				<h4><Trans>Add to balance</Trans></h4>
				<p><Trans>Add funds to this project's balance without minting tokens.</Trans></p>

				<label for="payAmount">Pay amount</label>
				<div class="input">
					<CurrencyInput
						on:setValue={(value) => {
							addToBalanceAmount = value.detail.value;
						}}
					/>
				</div>
				<div class="button">
					<Button type="primary" size="md" on:click={addToBalance}>Add to balance</Button>
				</div>
			</div>
		</HeavyBorderBox>
	{:else if currentTab === 1}
		<HeavyBorderBox margin="32px" padding="16px 32px">
			<div class="box">
				<h4><Trans>Transfer ownership</Trans></h4>
				<p>
					<Trans>Current owner: {$project.projectOwnerAddress}</Trans>
				</p>
				<label for="to">Recipient address</label>
				<div class="input">
					<Input
						id="to"
						bind:value={transferTokenTo}
						type="address"
						placeholder="juicebox.eth / 0x0000000000000000000000000000000000000000"
					/>
				</div>
				<div class="button">
					<Button type="primary" size="md" on:click={transferOwnership}>Transfer ownership</Button>
				</div>
			</div>
		</HeavyBorderBox>
		<HeavyBorderBox margin="32px" padding="16px 32px">
			<div class="box">
				<h4><Trans>Archive project</Trans></h4>
				<p>
					<Trans
						>Your project will appear archived, and won't be able to receive payments through the
						juicebox.money app. You can unarchive a project at any time. Allow a few days for your
						project to appear under the "archived" filter on the Projects page.</Trans
					>
				</p>
				<p>
					<!-- TODO: discord link -->
					<Icon name="exclamationCircle" />
					<Trans>
						If you have already deployed a payable address and have lost it, please contact the
						Juicebox team through
					</Trans>
				</p>

				<div class="button">
					<Button type="primary" size="md" on:click={archiveProject} disabled={archiving}
						>{archiving ? 'Archiving project...' : 'Archive project'}</Button
					>
				</div>
			</div>
		</HeavyBorderBox>
		<!-- {:else if currentTab === 2}
		<HeavyBorderBox margin="32px" padding="16px 32px">
			<div class="box">
				<h4>
					<PopInfo message="User-role tooltip">
						<Trans>Add user-role</Trans>
					</PopInfo>
				</h4>
				<p>
					<Trans>Current owner: {$project.projectOwnerAddress}</Trans>
				</p>
				<div class="inputs">
					<div class="input">
						<Input
							bind:value={newRoleAdress}
							type="address"
							placeholder="0x0000000000000000000000000000000000000000"
						/>
					</div>
					<div class="dropdown">
						<Dropdown
							bind:value={newRoleType}
							options={[
								{ label: 'Admin', value: Roles.ADMIN },
								{ label: 'Minter', value: Roles.MINTER },
								{ label: 'Curator', value: Roles.CURATOR }
							]}
							placeholder="Roles"
						/>
					</div>
				</div>
				<Button type="tertiary" size="md" on:click={addRole}>Add</Button>
			</div>
		</HeavyBorderBox> -->
		<!-- {:else if currentTab === 3}
		<HeavyBorderBox margin="32px" padding="16px 32px">
			<div class="box">
				<h4>
					<PopInfo message="Landing page tooltip">
						<Trans>Landing Page</Trans>
					</PopInfo>
				</h4>
				<p>
					<Trans>
						A project with at least 5 ETH in its treasury may create a landing page in which to
						present more information about the treasury.
					</Trans>
				</p>
				<Button type="tertiary" size="md" on:click={createLandingPage}>Create</Button>
			</div>
		</HeavyBorderBox> -->
	{/if}
</section>

<style lang="scss">
	section {
		padding: 40px 26px;
		max-width: 650px;
	}

	p {
		font-weight: 400;
		color: var(--text-secondary);
		margin-bottom: 0;
	}

	h3 {
		font-size: 28px;
		color: var(--text-header);
	}

	h4 {
		font-size: 16px;
		font-weight: 400;
		color: var(--text-header);
		margin-bottom: 0;
	}

	.box {
		display: flex;
		flex-direction: column;
		gap: 16px;

		.input {
			background-color: var(--background-l0);
			width: 100%;
		}
		// .inputs {
		// 	display: flex;
		// 	gap: 16px;

		// 	.dropdown {
		// 		min-width: 100px;
		// 		flex-shrink: 1;
		// 	}
		// }

		.button {
			display: flex;
			justify-content: flex-end;
		}

		/* .link {
			color: var(--text-action-primary);
		} */

		div[slot='addon'] {
			padding: 0px 5px;
			cursor: pointer;
			color: var(--text-action-primary);
			text-align: center;
			background: var(--background-action-secondary);
			border-radius: var(--radius-sm);
		}
	}
</style>
