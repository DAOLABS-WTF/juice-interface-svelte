<script lang="ts">
	import Icon from '$lib/components/Icon';

	export let items: any[];
	export let startIndex = 0;
	export let index = startIndex;
	$: item = items[index];

	function mod(n, m) {
		return ((n % m) + m) % m;
	}
</script>

<div class="carousel">
	{#if items.length > 1}
		<div class="controls">
			<span class="left" on:click={() => (index = mod(index - 1, items.length))}>
				<Icon name="circle-chevron-left" />
			</span>
			<span class="right" on:click={() => (index = mod(index + 1, items.length))}>
				<Icon name="circle-chevron-right" />
			</span>
		</div>
	{/if}
	<div class="item">
		<slot {item} {index} />
	</div>
</div>

<style lang="scss">
	.carousel {
		position: relative;
		max-width: 100%;
	}

	.controls {
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
			left: 0rem;
		}
		.right {
			right: 0rem;
		}
	}

	.item {
		max-width: calc(100% - 70px);
		margin: 0 auto;
	}
</style>
