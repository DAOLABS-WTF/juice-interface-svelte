<script lang="ts">
	import { getContext } from 'svelte';
	import type { I18n } from 'lingui_core/esm';
	import { dynamicActivateLocale } from '$lib/provider/LanguageProvider';
	import type Store from '$utils/Store';
	import Collapse from './Collapse.svelte';
	import Icon from '$lib/components/Icon';

	export let opended = false;

	const i18n = getContext('i18n') as Store<I18n>;

	export let languages = [
		['en', 'EN'],
		['zh', '中文'],
		['ru', 'RU'],
		['tr', 'TR'],
		['fr', 'FR'],
		['es', 'ES'],
		['pt', 'PT']
	];

	function setLocale(locale: string) {
		dynamicActivateLocale(locale);
		opended = false;
	}
</script>

<Collapse>
	<span class="centered">
		<Icon name="global" />
	</span>
	{$i18n.locale?.toUpperCase() || 'EN'}
	<div slot="content">
		{#each languages as [lang, langName]}
			<div class="option" aria-selected="false" on:click={() => setLocale(lang)}>
				<div class="label">{langName}</div>
				<span unselectable aria-hidden="true" style="user-select: none;" />
			</div>
		{/each}
	</div>
</Collapse>

<style>
	.centered {
		line-height: 0;
		margin-right: 10px;
	}

	.label {
		flex: auto;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	.option {
		position: relative;
		display: block;
		min-height: 32px;
		padding: 5px 14px;
		font-weight: 400;
		font-size: 14px;
		line-height: 22px;
	}

	.option:hover {
		background-color: var(--background-l2);
	}
</style>
