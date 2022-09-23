<script>
	import Trans from '$lib/components/Trans.svelte';
</script>

<section>
	<div class="container">
		<div class="left">
			<h1><Trans>Should you Juicebox?</Trans></h1>
			<p><Trans>Almost definitely.</Trans></p>
			<p>
				<Trans>
					With Juicebox, projects are built and maintained by motivated punks getting paid
					transparently, and funded by a community of users and patrons who are rewarded as the
					projects they support succeed.
				</Trans>
			</p>
			<p><Trans>The future will be led by creators, and owned by communities.</Trans></p>
		</div>
		<div class="right">
			<img
				src="/images/blueberry-ol.png"
				alt="Sexy blueberry with bright pink lipstick spraying a can of spraypaint"
			/>
		</div>
	</div>
</section>

<style>
	section {
		background: rgb(255, 236, 187);
	}
	.container {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		max-width: 1200px;
		margin: auto;
	}
	img {
		max-width: 100%;
	}
	h1 {
		font-size: 2.4rem;
		font-weight: 600;
		line-height: 1.2;
		margin: 0px;
		margin-bottom: 20px;
		color: var(--text-header);
	}
	p {
		font-weight: 400;
		color: black;
	}
	.left {
		flex: 0 0 48%;
		max-width: 48%;
		padding: 40px 20px;
	}
	.right {
		margin: 20px 0px 0px;
		/* display: block; */
		flex: 0 0 42%;
		max-width: 42%;
	}

	@media (max-width: 750px) {
		.left,
		.right {
			flex: 0 0 100%;
			max-width: 100vw;
		}
	}
</style>
