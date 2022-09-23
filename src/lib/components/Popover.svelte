<script lang="ts" context="module">
	import { computePosition, autoPlacement } from '@floating-ui/dom';

	export function popoverDirective(node, { popoverId, placement, checkNecessary = false }) {
		const popoverRef = document.getElementById(`popover-${popoverId}`);

		if (checkNecessary && !(node.offsetWidth < node.scrollWidth)) return;

		const showPopoverEvent = new CustomEvent('showPopover', node);
		const hidePopoverEvent = new CustomEvent('hidePopover', node);

		// NOTE: What is this currentId? Is it just me, or isn't it completely unnecessary as first thing in togglePopover we set currentId = id?
		let currentId = 0;
		let popoverShow = false;
		// Get the popover element from popover ID
		const wrapperRef = node;

		function setPosition({ x, y, strategy }) {
			Object.assign(popoverRef.style, {
				position: strategy,
				left: `${x}px`,
				top: `${y}px`
			});
		}

		async function togglePopover(newState?: boolean) {
			const id = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
			currentId = id;
			// NOTE: why are we checking if newState is bool? Isn't it always?
			if (typeof newState === 'boolean') {
				if (newState) {
					const result = await computePosition(wrapperRef, popoverRef, {
						middleware: [autoPlacement()],
						placement
					});
					await setPosition(result);
					wrapperRef.dispatchEvent(showPopoverEvent);
				}
				if (id === currentId) {
					popoverShow = !!newState;
					if (!!newState) {
						wrapperRef.dispatchEvent(showPopoverEvent);
					} else {
						wrapperRef.dispatchEvent(hidePopoverEvent);
					}
				}
			} else if (popoverShow) {
				popoverShow = false;
				wrapperRef.dispatchEvent(hidePopoverEvent);
			} else {
				const result = await computePosition(wrapperRef, popoverRef, {
					middleware: [autoPlacement()],
					placement
				});
				await setPosition(result);
				if (id === currentId) {
					popoverShow = true;
					wrapperRef.dispatchEvent(showPopoverEvent);
				}
			}
		}

		function show() {
			togglePopover(true);
			popoverRef.style.visibility = 'visible';
		}

		function hide() {
			togglePopover(false);
			popoverRef.style.visibility = 'hidden';
		}

		node.addEventListener('mouseenter', show);
		node.addEventListener('mouseleave', hide);
		node.addEventListener('touchstart', show);

		return {
			destroy() {
				node.removeEventListener('mouseenter', show);
				node.removeEventListener('mouseleave', hide);
				node.removeEventListener('touchstart', show);
			}
		};
	}
</script>

<script lang="ts">
	export let message: string = undefined;
	export let placement: 'left' | 'right' | 'top' | 'bottom' = undefined;
	export let maxWidth = '200px';
	export let nowrap = false;

	let popoverId = Math.random() * Number.MAX_SAFE_INTEGER;

	$: style = `--maxWidth: ${maxWidth};`;
</script>

<span class="wrapper" use:popoverDirective={{ placement, popoverId }}>
	<slot />
	<div {style} id="popover-{popoverId}" class="popover">
		<slot name="content" />
		{#if message}
			<p class="message" class:nowrap>{@html message}</p>
		{/if}
	</div>
</span>

<style>
	.message {
		font-weight: 300;
		font-size: 12px;
		color: var(--text-primary);
		line-height: 1.2;
		margin: 0;
		text-align: left;
		text-transform: none;
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
	}
	.nowrap {
		white-space: nowrap;
	}
</style>
