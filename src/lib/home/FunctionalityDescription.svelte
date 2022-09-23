<script>
	import { goto } from '$app/navigation';

	import Button from '$lib/components/Button.svelte';
	import ExternalLink from '$lib/components/ExternalLink.svelte';
	import Icon from '$lib/components/Icon';
	import Img from '$lib/components/Img.svelte';
	import Trans from '$lib/components/Trans.svelte';
</script>

<section id="how-it-works">
	<h1>How to Juice.</h1>
	<div class="wrapper">
		<div class="left">
			<Img
				src="/images/pina.png"
				alt="Pinepple geek artist holding a paintbrush"
				style="max-height: 480px;max-width: 100%;object-fit: contain;margin-bottom: 40px;"
			/>
		</div>
		<div class="right">
			<h3><Trans>1. Get funded</Trans></h3>
			<p>
				<!-- TODO: overflow link on "overflow" word -->
				<Trans>
					Crowdfund your project with ETH. Set a funding target to cover predictable expenses, and
					any extra funds (overflow) can be claimed by anyone holding your project's tokens
					alongside you.
				</Trans>
			</p>
			<p />
			<h3><Trans message="2. Give ownership" /></h3>
			<p>
				<Trans>
					When someone pays your project, they'll receive your project's tokens in return. Tokens
					can be redeemed for a portion of your project's overflow funds; when you win, your
					community wins with you. Leverage your project's token to grant governance rights,
					community access, or other membership perks.
				</Trans>
			</p>
			<p />
			<h3><Trans>3. Manage your funds</Trans></h3>
			<p>
				<Trans>
					Commit portions of your funds to the people or projects you want to support, or the
					contributors you want to pay. When you get paid, so do they.</Trans
				>
			</p>
			<p />
			<h3><Trans>4. Build trust</Trans></h3>
			<p>
				<Trans>
					Changes to your project's funding configuration require a community-approved period to
					take effect, which acts as a safeguard against rug pulls. Your supporters don't have to
					trust you — even though they already do.
				</Trans>
			</p>
			<p />

			<p>
				<!-- TODO fix trans component to interpolate <0> and <1> if passed props -->
				<Icon name="infoCircle" />
				<Trans
					>Juicebox is new, and not guaranteed to work perfectly. Before spending money, do your own
					research:
				</Trans>
				<ExternalLink href="https://discord.gg/6jXrJSyDFf">ask questions</ExternalLink>,
				<ExternalLink href="https://github.com/jbx-protocol/juice-interface"
					>check out the code</ExternalLink
				>, and understand
				<ExternalLink href="https://info.juicebox.money/dev/learn/risks/">the risks</ExternalLink>!
			</p>
		</div>
		<footer>
			<Button fullWidthMobile on:click={() => goto('/create')}>Design your project</Button>
		</footer>
	</div>
</section>

<style>
	h1,
	h3 {
		color: var(--text-header);
	}

	h1 {
		font-size: 2.5rem;
		font-weight: 600;
		text-align: center;
		margin-bottom: 4rem;
	}

	h3 {
		font-weight: 600;
		margin: 0px;
	}
	p {
		font-weight: 300;
	}
	section {
		padding: 60px 40px 40px;
		margin-top: 40px;
		margin-bottom: 40px;
		max-width: 1200px;
		margin: auto;
	}

	footer {
		margin: 0 auto;
		margin-top: 2rem;
	}

	.wrapper {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
	}
	.left {
		display: block;
		flex: 0 0 42%;
		max-width: 42%;
	}
	.right {
		flex: 0 0 54%;
	}

	/* On smaller screens full size */
	@media (max-width: 700px) {
		.left,
		.right {
			flex: 0 0 100%;
			max-width: 100%;
		}
	}
</style>
