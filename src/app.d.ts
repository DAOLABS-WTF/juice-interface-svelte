/// <reference types="@sveltejs/kit" />

// See https://kit.svelte.dev/docs/types#the-app-namespace
// for information about these interfaces
declare global {
	type Address = `0x${string}`;
	type Any = any;
	type ProjectType = 'default' | 'membership';
}

declare namespace svelte.JSX {
	interface HTMLProps<T> {
		onshowPopover?: (e: CustomEvent) => void;
		onhidePopover?: (e: CustomEvent) => void;
	}
}

export {};
