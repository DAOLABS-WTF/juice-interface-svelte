<script lang="ts">
	export let value: string;
	export let label: string = '';
	export let id: string;
	export let description: string = '';
	export let maxlength = 0;

	let textarea;

	function autosize() {
		setTimeout(function () {
			textarea.style.cssText = 'height:auto; padding:0';
			textarea.style.cssText = 'height:' + textarea.scrollHeight + 'px';
		}, 0);
	}
</script>

<div class="container">
	{#if label}
		<label for={id}>Memo</label>
	{/if}
	<div class="area">
		<textarea {...$$props} bind:value on:keydown={autosize} bind:this={textarea} />
		<slot name="addon" />
	</div>
	<div class="info">
		{#if description}
			{description}
		{/if}
		{#if maxlength}
			<span class="max-length">{`${value ? value.length : 0} / ${maxlength}`}</span>
		{/if}
	</div>
</div>

<style lang="scss">
	.container {
		display: flex;
		flex-direction: column;
	}
	label {
		margin: 10px 0px;
		margin-right: 10px;
	}
	textarea {
		border: 1px solid var(--stroke-primary);
		width: 100%;
		height: auto;
		background: transparent;
		min-height: 28px;
		font-size: 14px;
		font-weight: 300;
		list-style: none;
		-webkit-font-feature-settings: 'tnum', 'tnum';
		font-feature-settings: 'tnum', 'tnum';
		position: relative;
		display: inline-block;
		padding: 4px 11px;
		color: var(--text-primary);
		line-height: 1.5715;
		background-color: transparent;
		border: 1px solid var(--stroke-primary);
		transition: all 0.3s;
	}

	.area {
		position: relative;
		display: flex;
		align-items: center;
	}

	:global(.area > *[slot='addon']) {
		position: absolute;
		right: 5px;
	}

	.info {
		margin-top: 4px;
		display: flex;
		gap: 16px;
		color: var(--text-secondary);
		font-weight: 300;
		font-size: 14px;

		.max-length {
			margin-left: auto;
			min-width: fit-content;
		}
	}
</style>
