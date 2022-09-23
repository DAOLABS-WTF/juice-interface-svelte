<script lang="ts">
	import { onMount } from 'svelte';
	import type { Project } from '$models/subgraph-entities/vX/project';
	import Trans from '$lib/components/Trans.svelte';
	import { getProjects } from '$data/project';
	import SmallProjectCard from '$lib/components/SmallProjectCard.svelte';
	import Loading from '$lib/components/Loading.svelte';
	import { readNetwork } from '$stores/web3';
	import Button from '$lib/components/Button.svelte';
	import { goto } from '$app/navigation';
	import Icon from '$lib/components/Icon';

	let projects: Project[] = [];
	let projectsLoading = true;

	async function fetchProjects() {
		projectsLoading = true;
		projects = await getProjects({ pageSize: 4 });
		projectsLoading = false;
	}

	onMount(fetchProjects);
	readNetwork.subscribe(fetchProjects);
</script>

<section>
	<article>
		<h1>
			<Trans>Fund and operate your thing, your way.</Trans>
		</h1>
		<p>
			<Trans>Juicebox puts the fun back in funding so you can focus on building.</Trans>
		</p>
		<p>
			<!-- TODO: what is the Trans situation with embedded links, still doesn't work -->
			Join <a href="/projects">hundreds of projects</a> sippin' the Juice.
		</p>
		<p>
			{#if projectsLoading}
				<Loading height={300} />
			{:else}
				<div class="projects">
					{#each projects as project}
						<SmallProjectCard {project} />
					{/each}
				</div>
			{/if}
		</p>
		<footer>
			<Button fullWidthMobile on:click={() => goto('/create')}>Start raising funds</Button>
			<a href="#how-it-works">How does it work? <Icon name="triangle" /></a>
		</footer>
	</article>
</section>

<style>
	h1 {
		color: var(--text-header);
		font-weight: 600;
		font-size: 22px;
	}

	article {
		margin: auto;
		max-width: 1150px;
		text-align: center;
	}

	section {
		margin: 150px 0px 0px;
		padding: 80px 40px;
		background: var(--background-l2);
	}

	.projects {
		display: flex;
		gap: 20px;
		width: 80%;
		justify-content: space-between;
		margin: 0px auto;
		flex-wrap: wrap;
		padding: 40px 20px;
	}

	p {
		font-weight: 300;
		font-size: 1rem;
		margin-bottom: 0.3rem;
	}

	a {
		font-weight: 400;
		color: var(--text-primary);
	}

	a:hover {
		text-decoration: underline;
		color: var(--text-action-primary);
	}

	footer {
		align-items: center;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
	}

	footer a {
		margin-top: 2rem;
		font-weight: 300;
	}

	@media (max-width: 500px) {
		section {
			padding: 80px 40px;
		}
	}

	@media (max-width: 767px) {
		h1 {
			font-size: 1.8rem;
		}

		.projects {
			width: 100%;
			padding: 40px 10px;
		}
	}

	@media (min-width: 768px) and (max-width: 1100px) {
		.projects {
			justify-content: center;
		}
	}

	@media (max-width: 850px) {
		section {
			margin-top: 50px;
		}
	}

	@media (min-width: 992px) {
		h1 {
			font-size: 2.5rem;
		}
	}
</style>
