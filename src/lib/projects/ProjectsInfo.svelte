<script>
	import Button from '$lib/components/Button.svelte';
	import Icon from '$lib/components/Icon';
</script>

<main>
	<h1>Projects on Juicebox</h1>
	<a href="create">
		<Button>Create project</Button>
	</a>
</main>

<p>
	<span>
		<Icon name="infoCircle" />
	</span>
	The Juicebox protocol is open to anyone, and project configurations can vary widely. There are risks
	associated with interacting with all projects on the protocol. Projects built on the protocol are not
	endorsed or vetted by JuiceboxDAO or Peel. Do your own research and understand the risks before committing
	your funds.
</p>

<style>
	h1 {
		color: var(--text-header);
	}

	p {
		max-width: 800px;
		margin-bottom: 20px;
		font-size: 14px;
		font-weight: 300;
		line-height: 1.4;
	}

	main {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
	}
</style>
