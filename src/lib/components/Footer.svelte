<script>
	import EstimateGas from '$lib/components/EstimateGas.svelte';
	import Trans from '$lib/components/Trans.svelte';
</script>

<footer>
	<p>🧃⚡️</p>
	<h3>
		<Trans>
			Big ups to the Ethereum community for crafting the infrastructure and economy to make Juicebox
			possible.
		</Trans>
	</h3>

	<!-- TODO: stack the links on mobile -->
	<div class="links">
		<a href="https://app.usefathom.com/share/otvdyquu/juicebox.wtf" target="_blank">Fathom</a>
		<a
			href="https://etherscan.io/address/0x143cC0A996De329C1C5723Ee4F15D2a40c1203c6"
			target="_blank">Gnosis</a
		>
		<a href="/terms-of-service" target="_blank">Terms</a>
		<a href="https://info.juicebox.money/" target="_blank">Documentation</a>
		<a href="https://snapshot.org/#/jbdao.eth" target="_blank">Snapshot</a>
		<a href="https://discord.com/invite/6jXrJSyDFf" target="_blank">Discord</a>
	</div>
	<EstimateGas />
	<!-- TODO: add languages and discord, github, twitter, and privacy policy -->
</footer>

<style>
	footer {
		padding: 40px 20px;
		background: black;
		position: relative;
		width: 100%;
	}

	h3 {
		color: whitesmoke;
		text-align: center;
	}

	p {
		text-align: center;
		font-size: 20px;
	}

	.links {
		display: flex;
		text-align: center;
		flex-wrap: wrap;
		justify-content: center;
		gap: 1rem;
	}
</style>
