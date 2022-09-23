import { browser } from '$app/environment';
import Store from '$utils/Store';
import { derived } from 'svelte/store';
import { toggleHTMLClass } from '$lib/components/DarkmodeToggle.svelte';

export const darkMode = new Store(browser ? localStorage.getItem('DARK_MODE') === 'true' : false);
export const modal = new Store();
export const modalOptions = new Store({});

modal.subscribe(value => {
	if (!value) {
		modalOptions.set({});
	}
});

if (browser) {
	window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
		darkMode.set(event.matches);
	});
	darkMode.subscribe(value => localStorage.setItem('DARK_MODE', JSON.stringify(value)));
	toggleHTMLClass();
}

export const pageReady = new Store<Record<string, boolean>>({
	web3: false
});
export const isPageReady = derived(pageReady, $pageReady => {
	let ready = true;
	for (const key in $pageReady) {
		ready = ready && !!$pageReady[key];
	}
	return ready;
});
