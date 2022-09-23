<script lang="ts">
	import Icon from '$lib/components/Icon';
	import { querySubgraph } from '$utils/graph';
	import InfoSpaceBetween from '$lib/components/InfoSpaceBetween.svelte';
	import ETHAmount from '$lib/components/ETHAmount.svelte';
	import { formatHistoricalDate } from '$utils/formatDate';
	import Trans from '$lib/components/Trans.svelte';
	import { readNetwork } from '$stores/web3';
	import { getTrendingProjects } from '$data/project';
	import TrendingProjectsCard from '$lib/components/TrendingProjectsCard.svelte';
	import Button from '$lib/components/Button.svelte';
	import EnsOrAddress from '$lib/components/EnsOrAddress.svelte';
	import type { PayEvent } from '$models/subgraph-entities/vX/pay-event';
	import Img from '$lib/components/Img.svelte';
	import Popover from '$lib/components/Popover.svelte';
	import RichNote from '$lib/components/RichNote.svelte';

	export let days = 7;
	export let count = 6;

	async function getLatestPayments() {
		return await querySubgraph({
			entity: 'payEvent',
			keys: [
				'amount',
				'beneficiary',
				'note',
				'timestamp',
				'id',
				{ entity: 'project', keys: ['id', 'projectId'] }
			],
			first: 20,
			orderDirection: 'desc',
			orderBy: 'timestamp',
			where: [
				{
					key: 'cv',
					value: '2'
				}
			]
		});
	}

	let projects: Promise<any[]>;
	$: if ($readNetwork) {
		projects = getTrendingProjects(count, days);
	}

	let latestPayment: Promise<PayEvent[]>;
	$: if ($readNetwork) {
		latestPayment = getLatestPayments();
	}
</script>

<div class="wrapper">
	<section>
		<div class="left">
			<h1>
				<Trans>Trending projects</Trans>
				<!-- TODO: Change "see code" link to our svelte repo -->
				<Popover>
					<p slot="content">
						Rankings based on number of contributions and volume gained in the last 7 days. <a
							href="https://github.com/jbx-protocol/juice-interface/blob/main/src/hooks/Projects.ts#L275"
							>See code</a
						>
					</p>
					<Icon name="infoCircle" />
				</Popover>
			</h1>
			{#await projects}
				<Icon name="loading" spin={true} />
			{:then projects}
				{#each projects as project, rank}
					<TrendingProjectsCard {rank} {project} {days} />
				{/each}
			{:catch error}
				<p style="color: var(--text-failure)">{error}</p>
			{/await}
			<a href="/projects?tab=trending">
				<Button fullWidth type="secondary" size="md">More trending projects</Button>
			</a>
		</div>
		<div class="right">
			<h1><Trans>Latest Payments</Trans></h1>
			<div class="payments">
				{#await latestPayment}
					<Icon name="loading" spin={true} />
				{:then payments}
					{#each payments as payment}
						<div class="payment">
							<InfoSpaceBetween>
								<div slot="left">
									<a href="/projects/{payment.project.projectId}"
										><p>Project {payment.project.projectId}</p></a
									>
									<ETHAmount amount={payment.amount} precision={4} />
								</div>
								<div slot="right">
									<p class="timestamp">
										{payment.timestamp && formatHistoricalDate(payment.timestamp * 1000)}
									</p>
									<p class="address"><EnsOrAddress address={payment.beneficiary} /></p>
								</div>
							</InfoSpaceBetween>
							<div>
								<RichNote note={payment.note} style={{ marginTop: '10px' }} />
							</div>
						</div>
					{/each}
				{/await}
			</div>
		</div>
	</section>
</div>

<style>
	section {
		display: flex;
		max-width: 1200px;
		margin: auto;
		flex-wrap: wrap;
		justify-content: space-between;
	}

	.wrapper {
		background: var(--background-l2);
		padding: 2rem 1rem;
	}
	h1 {
		color: var(--text-header);
		font-weight: 600;
		font-size: 1.3rem;
	}

	div.left {
		flex: 0 0 45%;
		max-width: 45%;
	}

	div.right {
		flex: 0 0 45%;
	}

	div.right .payments {
		max-height: 975px;
		overflow: auto;
		-ms-overflow-style: none;
		scrollbar-width: none;
	}

	div.right .payments::-webkit-scrollbar {
		display: none;
	}

	a {
		display: flex;
		justify-content: center;
	}

	p {
		margin: 0;
		font-weight: 400;
	}

	a p {
		color: var(--text-primary);
	}

	a p:hover {
		color: var(--text-action-primary);
	}

	p[slot='content'] {
		font-size: 12px;
		font-weight: 300;
		color: var(--text-primary);
	}

	.address {
		font-weight: 300;
	}

	.timestamp {
		color: var(--text-secondary);
		font-size: 0.7rem;
		font-weight: 300;
	}

	.payment {
		padding-top: 10px;
		margin-bottom: 10px;
		padding-bottom: 20px;
		border-bottom: 1px solid var(--stroke-tertiary);
	}

	a[href='/projects?tab=all'] {
		margin-top: 20px;
	}

	@media (max-width: 850px) {
		div.left,
		div.right {
			flex: 0 0 100%;
			max-width: 100%;
		}

		div.left {
			margin-left: 0px;
			padding: 10px 20px;
		}

		div.right {
			margin-left: 0;
			padding: 20px;
		}
	}
</style>
