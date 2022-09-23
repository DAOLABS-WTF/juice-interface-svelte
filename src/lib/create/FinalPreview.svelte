<script lang="ts">
	import { BigNumber } from 'ethers';
	import { getContext } from 'svelte';
	import type Store from '$utils/Store';
	import type { V2ProjectContextType } from '$models/project-type';
	import Icon from '$lib/components/Icon';
	import ProjectLogo from '$lib/components/ProjectLogo.svelte';
	import Trans from '$lib/components/Trans.svelte';
	import Popover from '$lib/components/Popover.svelte';
	import { formatSplitPercent } from '$utils/v2/math';
	import { getDistributionLimitType } from '$utils/v2/distributions';
	import { getFundingCycleDetails } from '$utils/v2/fundingCycle';
	import { metadataFields } from './ProjectDetails.svelte';
	import { DistributionLimitType } from '$constants';
	import Money from '$lib/components/Money.svelte';
	import { getBallotStrategyByAddress } from '$constants/v2/ballotStrategies/getBallotStrategiesByAddress';
	import InfoSpaceBetween from '$lib/components/InfoSpaceBetween.svelte';
	import EnsOrAddress from '$lib/components/EnsOrAddress.svelte';
	import OwnerCrown from '$lib/components/OwnerCrown.svelte';

	const project = getContext('PROJECT') as Store<V2ProjectContextType>;

	const hasDuration = $project.fundingCycle.duration && $project.fundingCycle.duration.gt(0);
	const fundingCycleDetails = getFundingCycleDetails(
		$project.fundingCycle,
		$project.fundingCycleMetadata
	);
	const currentBallotStrategy = getBallotStrategyByAddress($project.fundingCycle.ballot);

	const hiddenFCDetails = ['start', 'end'];
	const hiddenPreview = ['description'];

	$: distributionLimitType = getDistributionLimitType($project.distributionLimit);
</script>

<section>
	<h1><Trans>Review project configuration</Trans></h1>

	<h2><Trans>Project details</Trans></h2>
	<p><Trans>These attributes can be changed at any time.</Trans></p>
	<div class="details">
		<div class="info-item">
			<h4><Trans>Logo</Trans></h4>
			<ProjectLogo uri={$project.projectMetadata.logoUri} />
		</div>
		{#each metadataFields as field}
			{#if !hiddenPreview.includes(field.id)}
				<div class="info-item">
					<h4>{field.label}</h4>
					<p>{$project.projectMetadata[field.id] || '--'}</p>
				</div>
			{/if}
		{/each}
	</div>
	<div class="fundingCycle">
		<h2><Trans>Funding cycle details</Trans></h2>
		{#if hasDuration}
			<p>
				<Trans>
					These settings will <strong>not</strong> be editable immediately within a funding cycle.
					They can only be changed for{' '}
					<strong>upcoming</strong> funding cycles according to your{' '}
					<strong>reconfiguration rules</strong>.
				</Trans>
			</p>
		{:else}
			<p>
				<Trans>
					Since you have not set a funding duration, changes to these settings will be applied
					immediately.
				</Trans>
			</p>
		{/if}
		<div class="distribution-limit">
			<!-- <div class="info-item"> -->
			<h4>
				<Trans>Distribution Limit</Trans>
				<Popover
					placement="right"
					message="The maximum amount of funds allowed to be distributed from the project's treasury each funding cycle."
				>
					<Icon name="questionCircle" />
				</Popover>
			</h4>
			<p>
				<!-- Put Trans back in when figured out how to style the inner div -->
				{#if distributionLimitType === DistributionLimitType.None}
					<!-- <Trans> -->
					Distribution limit is 0: All funds will be considered overflow and can be redeemed by token
					holders.
					<!-- </Trans> -->
				{:else if distributionLimitType === DistributionLimitType.Specific}
					<Money
						currency={$project.distributionLimitCurrency ?? BigNumber.from(0)}
						amount={$project.distributionLimit}
					/>
				{:else}
					<!-- <Trans> -->
					Distribution limit is infinite: The project will control how all funds are distributed, and
					none can be redeemed by token holders.
					<!-- </Trans> -->
				{/if}
			</p>
			<!-- </div> -->
		</div>
		<div class="details">
			<!-- TODO reserved rate and redemption rate aren't shown when no funding cycle duration -->
			{#each fundingCycleDetails as detail}
				{#if !hiddenFCDetails.includes(detail.id)}
					<div class="info-item">
						{#if detail.info}
							<h4>
								<Trans>{detail.label}</Trans>
								<Popover
									placement="right"
									message="The maximum amount of funds allowed to be distributed from the project's treasury each funding cycle."
								>
									<Icon name="questionCircle" />
								</Popover>
							</h4>
						{:else}
							<h4><Trans>{detail.label}</Trans></h4>
						{/if}
						<p>{detail.value}</p>
						{#if detail.id === 'configuration'}
							<small class="recon-info">{currentBallotStrategy.address}</small>
						{/if}
						{#if detail.issue}
							<span>
								<Popover message={detail.issueText} placement="right">
									<Icon name="exclamationCircle" />
								</Popover>
							</span>
						{/if}
					</div>
				{/if}
			{/each}
		</div>
	</div>
</section>
<div class="splits">
	{#if $project.payoutSplits.length}
		<div class="split-item">
			<h4>
				<Trans>Distribution splits</Trans>
				<Popover
					placement="right"
					message="The maximum amount of funds allowed to be distributed from the project's treasury each funding cycle."
				>
					<Icon name="questionCircle" />
				</Popover>
			</h4>
			{#each $project.payoutSplits as split}
				<InfoSpaceBetween>
					<p slot="left"><EnsOrAddress address={split.beneficiary} /></p>
					<p slot="right">
						{formatSplitPercent(BigNumber.from(split.percent))}%
						{#if distributionLimitType === DistributionLimitType.Specific}
							(<Money
								amount={($project.distributionLimit || BigNumber.from(0))
									.mul(Math.floor(Number(formatSplitPercent(BigNumber.from(split.percent))) * 100))
									.div(100_00)}
								currency={$project.distributionLimitCurrency}
								precision={2}
							/>)
						{/if}
					</p>
				</InfoSpaceBetween>
			{/each}
			{#await $project.payoutSplits.reduce((acc, split) => acc + Number(formatSplitPercent(BigNumber.from(split.percent))), 0) then total}
				{#if 100 - total >= 0.011}
					<InfoSpaceBetween>
						<p slot="left">Project owner (you): <OwnerCrown /></p>
						<p slot="right">
							{100 - total}%
							{#if distributionLimitType === DistributionLimitType.Specific}
								(<Money
									amount={($project.distributionLimit || BigNumber.from(0))
										.mul(Math.floor((100 - total) * 100))
										.div(100_00)}
									currency={$project.distributionLimitCurrency}
									precision={2}
								/>)
							{/if}
						</p>
					</InfoSpaceBetween>
				{/if}
			{/await}
		</div>
	{/if}
	{#if $project.reservedTokensSplits.length}
		<div class="split-item">
			<h4>
				<Trans>Reserved token splits</Trans>
				<Popover
					placement="right"
					message="The maximum amount of funds allowed to be distributed from the project's treasury each funding cycle."
				>
					<Icon name="questionCircle" />
				</Popover>
			</h4>
			{#each $project.reservedTokensSplits as split}
				<InfoSpaceBetween>
					<p slot="left"><EnsOrAddress address={split.beneficiary} /></p>
					<p slot="right">
						{formatSplitPercent(BigNumber.from(split.percent))}%
					</p>
				</InfoSpaceBetween>
			{/each}
			{#await $project.reservedTokensSplits.reduce((acc, split) => acc + Number(formatSplitPercent(BigNumber.from(split.percent))), 0) then total}
				{#if 100 - total >= 0.011}
					<InfoSpaceBetween>
						<p slot="left">Project owner (you): <OwnerCrown /></p>
						<p slot="right">
							{100 - total}%
						</p>
					</InfoSpaceBetween>
				{/if}
			{/await}
		</div>
	{/if}
</div>
<br />

<style>
	h1,
	h2,
	h4 {
		color: var(--text-header);
	}

	h2 {
		margin-top: 3rem;
	}

	p {
		font-weight: 400;
		margin-bottom: 0;
		display: inline;
	}
	span {
		font-size: 18px;
		color: var(--text-warn);
	}

	p[slot='left'] {
		font-size: 18px;
		font-weight: 400;
	}

	p[slot='right'] {
		font-size: 18px;
	}

	.details {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		grid-row-gap: 40px;
		grid-column-gap: 40px;
		grid-auto-flow: row;
	}

	.distribution-limit {
		margin: 30px 0px;
		grid-column: span 3;
	}

	.distribution-limit p {
		font-size: 18px;
		font-weight: 600;
	}

	.distribution-limit h4 {
		margin: 0;
		color: var(--text-header);
	}

	.splits {
		display: flex;
		flex-wrap: wrap;
		margin-top: 40px;
		column-gap: 40px;
	}

	.split-item {
		min-width: 500px;
	}

	.info-item p {
		font-size: 18px;
		font-weight: 400;
		color: var(--text-primary);
	}
</style>
