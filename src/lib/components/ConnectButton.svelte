<script lang="ts">
	import {
		connectedAccount,
		web3Connect,
		web3Disconnect,
		getSupportedNetworks,
		switchNetwork,
		chainId,
		readNetwork
	} from '$stores/web3';
	import Icon from '$lib/components/Icon';
	import { getEthBalance } from '$data/eth';
	import EthAmount from './ETHAmount.svelte';
	import Trans from './Trans.svelte';
	import EnsOrAddress from './EnsOrAddress.svelte';
	import OwnerCrown from './OwnerCrown.svelte';
	import Button from './Button.svelte';

	/**
	 * TODO: refactor out ugly classes/styles
	 */

	let opened = false;
	let selectingNetwork = false;
	$: showNetworks = opened ? selectingNetwork : false;

	let buttonElement: HTMLElement;

	function windowClick(event: MouseEvent) {
		const target = event.target as HTMLElement;
		if (!buttonElement?.contains(target)) {
			opened = false;
		}
	}

	let ethBalancePromise;
	$: if ($readNetwork && $connectedAccount) {
		ethBalancePromise = getEthBalance($connectedAccount);
	}
</script>

<svelte:window on:click={windowClick} />

{#if $connectedAccount}
	<div bind:this={buttonElement} style="position: relative;">
		<div
			class="ant-dropdown-trigger"
			style="height: 45px; border-radius: 2px; padding: 4px 19px 7px; display: flex; flex-direction: column; align-items: center; background: var(--background-l2);  user-select:none;cursor: pointer"
			on:click={() => (opened = !opened)}
		>
			<span style="line-height: 22px;">
				<EnsOrAddress address={$connectedAccount} showTooltip={false} />
			</span>
			<div style="vertical-align: middle; line-height: 1; color: var(--text-tertiary);">
				{#await ethBalancePromise}
					<Icon name="loading" spin />
				{:then amount}
					<EthAmount {amount} precision={2} />
				{/await}
			</div>
		</div>
		{#if opened}
			<div style="position: absolute; top: 50px; left: 0px; width: 100%;user-select: none">
				<div>
					<div
						class="ant-dropdown ant-dropdown-placement-bottomRight"
						style="padding: 0px; min-width: 164px; left: 0; top: 0;"
					>
						<ul
							class="ant-dropdown-menu ant-dropdown-menu-root ant-dropdown-menu-vertical ant-dropdown-menu-light"
							role="menu"
							tabindex="0"
							data-menu-list="true"
						>
							<li
								class="ant-dropdown-menu-item"
								role="menuitem"
								tabindex="-1"
								data-menu-id="rc-menu-uuid-56979-2-0"
								style="padding: 10px 15px;"
							>
								<span class="ant-dropdown-menu-title-content"
									><a
										class="hover-action"
										href="https://etherscan.io/address/{$connectedAccount}"
										target="_blank"
										rel="noopener noreferrer"
										style="font-weight: 400;"
										>{$connectedAccount.slice(0, 6)}...{$connectedAccount.slice(-4)}</a
									>
									<span role="img" aria-label="copy" tabindex="-1" style="padding-left: 14px;">
										<Icon name="copy" />
									</span>
								</span>
							</li>
							{#if $connectedAccount}
								<li
									class="ant-dropdown-menu-item"
									role="menuitem"
									tabindex="-1"
									data-menu-id="rc-menu-uuid-56979-2-1"
									style="padding: 10px 15px; color: var(--text-primary) display: flex; justify-content: space-between;"
								>
									<a
										href="/projects?tab=myprojects"
										class="ant-dropdown-menu-title-content my-projects-link"
										on:click={() => (opened = false)}
									>
										<Trans>My Projects</Trans>
										<span role="img" aria-label="logout" style="padding-left: 31px;">
											<OwnerCrown />
											<!-- <Icon name="logout" /> -->
										</span>
									</a>
								</li>
							{/if}
							<li
								class="ant-dropdown-menu-item"
								role="menuitem"
								tabindex="-1"
								data-menu-id="rc-menu-uuid-56979-2-1"
								style="padding: 10px 15px; color: var(--text-primary) display: flex; justify-content: space-between;{selectingNetwork
									? 'opacity: 0.5;'
									: ''}"
							>
								<span
									class="ant-dropdown-menu-title-content"
									on:click={() => (selectingNetwork = !selectingNetwork)}
								>
									<Trans>Switch Network</Trans>
									<span role="img" aria-label="logout" style="padding-left: 6px;">
										<!-- <Icon name="chain" /> -->
									</span>
								</span>
							</li>
							{#if showNetworks}
								{#await getSupportedNetworks() || [] then networks}
									{#each networks as net}
										<li
											class="ant-dropdown-menu-item"
											role="menuitem"
											tabindex="-1"
											data-menu-id="rc-menu-uuid-56979-2-1"
											style="padding: 10px 15px; color: var(--text-primary) display: flex; justify-content: space-between;"
											title={net.label}
										>
											<span
												class="ant-dropdown-menu-title-content"
												style={$chainId === Number(net.id) ? 'font-weight: bold;' : ''}
												on:click={async () => {
													await switchNetwork(Number(net.id));
													opened = false;
												}}
											>
												{#await net.label.replace('Ethereum ', '') then label}
													{label.length > 16 ? label.slice(0, 16) + '...' : label}
												{/await}
											</span>
										</li>
									{/each}
								{/await}
							{/if}
							<li
								class="ant-dropdown-menu-item"
								role="menuitem"
								tabindex="-1"
								data-menu-id="rc-menu-uuid-56979-2-1"
								style="padding: 10px 15px; color: var(--text-primary) display: flex; justify-content: space-between;"
							>
								<span
									class="ant-dropdown-menu-title-content"
									on:click={() => ((opened = false), web3Disconnect())}
								>
									<Trans>Disconnect</Trans>
									<span role="img" aria-label="logout" style="padding-left: 40px;">
										<Icon name="logout" />
									</span>
								</span>
							</li>
						</ul>
						<div aria-hidden="true" style="display: none;" />
					</div>
				</div>
			</div>
		{/if}
	</div>
{:else}
	<div>
		<Button size="md" type="primary" on:click={() => web3Connect()}>
			<Trans>Connect</Trans>
		</Button>
	</div>
{/if}

<style>
	/* Legacy styles that we want to get rid of at some point */
	.ant-dropdown-trigger > .anticon.anticon-down,
	.ant-dropdown-link > .anticon.anticon-down,
	.ant-dropdown-button > .anticon.anticon-down {
		font-size: 10px;
		vertical-align: baseline;
	}

	.ant-modal-footer .ant-btn + .ant-btn:not(.ant-dropdown-trigger) {
		margin-bottom: 0;
		margin-left: 8px;
	}

	.ant-dropdown {
		box-sizing: border-box;
		margin: 0;
		padding: 0;
		color: var(--text-primary);
		font-size: 14px;
		font-variant: tabular-nums;
		line-height: 1.5715;
		list-style: none;
		font-feature-settings: 'tnum';
		position: absolute;
		top: -9999px;
		left: -9999px;
		z-index: 1050;
		display: block;
	}
	.ant-dropdown::before {
		position: absolute;
		top: -4px;
		right: 0;
		bottom: -4px;
		left: -7px;
		z-index: -9999;
		opacity: 0.0001;
		content: ' ';
	}

	.ant-dropdown-show-arrow.ant-dropdown-placement-bottomCenter,
	.ant-dropdown-show-arrow.ant-dropdown-placement-bottomLeft,
	.ant-dropdown-show-arrow.ant-dropdown-placement-bottomRight {
		padding-top: 10px;
	}

	.ant-dropdown-placement-bottomCenter > .ant-dropdown-arrow,
	.ant-dropdown-placement-bottomLeft > .ant-dropdown-arrow,
	.ant-dropdown-placement-bottomRight > .ant-dropdown-arrow {
		top: 6px;
		border-top-color: var(--background-l1);
		border-right-color: transparent;
		border-bottom-color: transparent;
		border-left-color: var(--background-l1);
		box-shadow: -2px -2px 5px rgba(0, 0, 0, 0.06);
	}

	.ant-dropdown-placement-bottomRight > .ant-dropdown-arrow {
		right: 16px;
	}

	.ant-dropdown-menu {
		position: relative;
		margin: 0;
		padding: 4px 0;
		text-align: left;
		list-style-type: none;
		background-color: var(--background-l1);
		background-clip: padding-box;
		border-radius: 2px;
		outline: none;
		box-shadow: 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 6px 16px 0 rgba(0, 0, 0, 0.08),
			0 9px 28px 8px rgba(0, 0, 0, 0.05);
	}

	.ant-dropdown-menu-item,
	.ant-dropdown-menu-submenu-title {
		clear: both;
		margin: 0;
		padding: 5px 12px;
		color: var(--text-primary);
		font-weight: normal;
		font-size: 14px;
		line-height: 22px;
		white-space: nowrap;
		cursor: pointer;
		transition: all 0.3s;
	}

	.ant-dropdown-menu-item {
		position: relative;
		display: flex;
		align-items: center;
	}

	.ant-dropdown-menu-title-content {
		flex: auto;
	}
	.ant-dropdown-menu-title-content > a {
		color: inherit;
		transition: all 0.3s;
	}
	.ant-dropdown-menu-title-content > a:hover {
		color: inherit;
	}
	.ant-dropdown-menu-title-content > a::after {
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		content: '';
	}
	.my-projects-link {
		color: var(--text-primary);
	}
</style>
