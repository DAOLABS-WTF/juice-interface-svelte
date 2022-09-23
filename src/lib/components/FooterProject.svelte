<script>
	import EstimateGas from '$lib/components/EstimateGas.svelte';
</script>

<footer>
	<div class="links">
		<a href={null} on:click|preventDefault={() => window.scrollTo(0, 0)}>Back to top</a> |
		<a href="/terms-of-service" target="_blank">Terms of Service</a>
	</div>
	<EstimateGas />
</footer>

<style>
	footer {
		padding: 30px 20px;
		background: var(--background-l1);
		position: relative;
		width: 100%;
	}

	.links {
		text-align: center;
		display: flex;
		justify-content: center;
		gap: 1rem;
	}
</style>
