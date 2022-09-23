<script context="module">
	export function truncateLongWord(word, maxLength = 10) {
		if (word.length > maxLength) {
			return word.substring(0, maxLength - 3) + '...';
		}
		return word;
	}
</script>

<script lang="ts">
	import { popoverDirective } from './Popover.svelte';
	export let width = 200;

	let popoverId = 'popover-' + Math.random().toString(36);
</script>

<span
	class="longWord"
	style="max-width: {width}px"
	use:popoverDirective={{ placement: 'auto', popoverId, checkNecessary: true }}
>
	<slot />
	<div id="popover-{popoverId}" class="popover">
		<slot />
	</div>
</span>

<style>
	span.longWord {
		display: inline-flex;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	.popover {
		visibility: hidden;
		left: 0;
		top: 0;
		position: absolute;
		left: 0;
		top: 0;
		max-width: var(--maxWidth);
		background: var(--background-l0);
		box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.26);
		transition: visibility 0.3s cubic-bezier(0.75, -0.02, 0.2, 0.97);
		padding: 10px;
		z-index: 999;
		white-space: normal;
		text-transform: none;

		word-break: break-all;
		max-width: 400px;
	}
</style>
