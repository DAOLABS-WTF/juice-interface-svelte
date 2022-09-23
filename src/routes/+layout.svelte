<script lang="ts">
	import MobileHeader from '$lib/components/MobileHeader.svelte';
	import Header from '$lib/components/Header.svelte';
	import { onMount } from 'svelte';
	import { loadLocale } from '$lib/provider/LanguageProvider';
	import Intl from '$lib/provider/Intl.svelte';
	import { isPageReady } from '$stores';
	import Loading from '$lib/components/Loading.svelte';
	import { notify } from '$utils/notification';
	import Notify from 'bnc-notify';

	onMount(async () => {
		await loadLocale();
		notify.set(Notify({}));
	});
	const config = {} as any;
</script>

<svelte:head>
	<title>Juicebox | The Decentralized Funding Platform</title>
</svelte:head>

<Intl {config}>
	<main>
		{#if $isPageReady}
			<div class="body">
				<Header />
				<slot />
				<MobileHeader />
			</div>
		{:else}
			<div class="loading">
				<Loading fullHeight={true} />
			</div>
		{/if}
	</main>
</Intl>

<style>
	main {
		flex-grow: 1;
		margin: 0 auto;
		box-sizing: border-box;
		min-height: 100vh;
	}
	.loading {
		height: 100vh;
	}
	.body {
		min-height: 100vh;
	}
</style>
