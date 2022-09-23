<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import Trans from '$lib/components/Trans.svelte';
	import { darkMode } from '$stores';

	const list = [
		'DAOs and communities',
		'Crowdfunding campaigns',
		'Crypto and Web3 businesses',
		'Indie creators and builders'
	];

	let numberOfSlides = 3;
	let currentSlide = 0;
</script>

<section>
	<!-- <div class="controls">
		<span class="left" on:click={() => (currentSlide = (currentSlide - 1) % numberOfSlides)}>
			<Icon name="circle-chevron-left" />
		</span>
		<span class="right" on:click={() => (currentSlide = (currentSlide + 1) % numberOfSlides)}>
			<Icon name="circle-chevron-right" />
		</span>
	</div> -->
	<div class="slides" style="--current-slide: {currentSlide};">
		{#each Array(4).fill(0) as slide}
			<div class="slide">
				<article>
					<h1><Trans message="Fund anything. Grow together." /></h1>
					<div class="description-wrapper">
						<p>
							<Trans>
								The Decentralized Funding Platform. Light enough for a group of friends, powerful
								enough for a global network of anons.
							</Trans>
							<a class="jbLink" href="https://juicebox.wtf/projects/1">Community-owned</a>,<Trans
								>on Ethereum.</Trans
							>
						</p>
						<p class="sub-header">Built for:</p>
						{#each list as item}
							<div class="item">
								<img src="/images/bolt.png" alt="⚡️" />
								<p>
									<Trans>
										{item}
									</Trans>
								</p>
							</div>
						{/each}
					</div>
					<div class="button-wrapper">
						<a href="/create" class="linkButton">
							<div>
								<Button fullWidth>
									<Trans>Launch your project</Trans>
								</Button>
							</div>
						</a>
						<a href="/projects" class="linkButton">
							<div>
								<Button type="secondary" fullWidth>
									<Trans>Explore projects</Trans>
								</Button>
							</div>
						</a>
					</div>
				</article>

				<img
					id="banana"
					src={$darkMode ? '/images/banana-od.png' : '/images/banny.png'}
					alt="Banana partying with code"
				/>
			</div>
		{/each}
	</div>
</section>

<style lang="scss">
	h1 {
		color: var(--text-header);
		font-size: 3.8rem;
		line-height: 1.2;
		font-weight: 800;
		margin-block-start: 1em;
		margin-block-end: 1em;
		margin-top: 0px;
		margin-bottom: 0px;
	}

	section {
		position: relative;
		max-width: 1080px;
		margin: 40px auto;
		/* The header height */
		margin-top: 68px;
		padding: 0px 40px;
		.slides {
			display: flex;
			overflow: hidden;
		}
		.slide {
			transform: translateX(calc(-100% * var(--current-slide, 0)));
			transition: 300ms transform;
			flex-shrink: 0;
			max-width: 100%;
			display: flex;
			align-items: center;
			flex-flow: row wrap;
			justify-content: center;
		}
	}
	/* .controls {
		.left,
		.right {
			position: absolute;
			flex-grow: 0;
			display: inline-flex;
			align-items: center;
			justify-content: center;
			top: 50%;
			:global(svg) {
				cursor: pointer;
				width: 1rem;
				color: var(--text-tertiary);
			}
		}
		.left {
			left: -4rem;
		}
		.right {
			right: -4rem;
		}
	} */

	article {
		flex: 0 0 54%;
		max-width: 54%;
		display: flex;
		flex-direction: column;
		gap: 24px;
		flex-grow: 1;
	}

	a.jbLink {
		color: var(--text-color);
		text-decoration: none;
		border-bottom: 1px solid var(--text-primary);
	}

	.linkButton {
		display: inline-block;
		margin-top: 2em;
		width: fit-content;
	}

	p {
		font-size: 1rem;
		font-weight: 500;
		line-height: 1.57;
	}

	#banana {
		min-height: 300px;
		/* max-width: 100%; */
		object-fit: contain;
		display: block;
		flex: 0 0 46%;
		max-width: 46%;
		width: 100%;
		/* max-width: 50vw; */
	}

	.sub-header {
		color: var(--text-header);
		font-size: 14px;
	}

	.item {
		display: flex;
		align-items: center;
		margin: 0px 10px;
	}

	.item img {
		height: 24px;
		margin-right: 1em;
	}

	.item p {
		font-style: italic;
		font-weight: 400;
		font-size: 14px;
		margin: 0.2em;
	}

	@media (max-width: 850px) {
		article {
			flex: 0 0 100%;
			max-width: 100%;
		}

		.linkButton {
			display: block;
			margin-top: 10px;
			width: 100%;
		}

		.linkButton:first-of-type {
			margin-top: 2em;
		}

		h1 {
			font-size: 3rem;
		}
		#banana {
			min-width: 300px;
			transform: translateX(30px);
			display: none;
		}
	}
</style>
