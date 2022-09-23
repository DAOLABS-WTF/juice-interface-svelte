<div class="tab-list">
	<slot />
	<svg height="3" width="100%">
		<line x1="0" y1="0" x2="1135" y2="0" stroke="var(--stroke-tertiary)" stroke-width="3" />
	</svg>
</div>

<style>
	svg {
		position: absolute;
		left: 0;
		bottom: 0;
	}

	.tab-list {
		display: flex;
		max-width: 100vw;
		gap: 1rem;
		overflow-x: auto;
		position: relative;
		overflow-y: hidden;
	}
	.tab-list > :global(*) {
		flex-grow: 0;
		flex-shrink: 0;
	}
	@media (max-width: 650px) {
		.tab-list {
			flex-direction: column;
			gap: 0rem;
		}
	}
</style>
