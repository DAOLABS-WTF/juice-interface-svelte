<script>
	import { darkMode } from '$stores';
	import ConnectButton from './ConnectButton.svelte';
	import { toggleTheme } from './DarkmodeToggle.svelte';

	import Icon from '$lib/components/Icon';
	import ResourceDropdown from './ResourceDropdown.svelte';

	let showMenu = false;
</script>

<header>
	<a href="/" style="display: inline-block;"
		><img
			src={$darkMode ? '/images/juice_logo-od.png' : '/images/juice_logo-ol.png'}
			alt="Juicebox logo"
			style="height: 30px;"
		/></a
	>
	<span
		role="img"
		aria-label="menu"
		on:click={() => {
			showMenu = !showMenu;
		}}
	>
		<Icon name="hamburger" />
	</span>

	{#if showMenu}
		<div class="dropdown">
			<nav>
				<a href="/projects">Projects</a>
				<a href="/#faq">FAQ</a>
				<a href="https://discord.gg/6jXrJSyDFf" target="_blank" rel="noreferrer">Discord</a>
				<ResourceDropdown isMobile />
			</nav>
			<ul class="actions">
				<li><Icon name="global" /> English</li>
				<li on:click={toggleTheme}>
					<Icon name={$darkMode ? 'sun' : 'moon'} />
					{$darkMode ? 'Light' : 'Dark'} theme
				</li>
				<li>
					<Icon name="message" /><a
						class="quiet"
						href="https://auditor.typeform.com/to/REMUTIbQ?resolution=720x761&amp;referrer=stoned-banny#"
						target="_blank"
						rel="noopener noreferrer">Give feedback</a
					>
				</li>
			</ul>
			<div class="connect-button">
				<ConnectButton />
			</div>
		</div>
	{/if}
</header>

<style>
	a {
		cursor: pointer;
		font-weight: 600;
		color: var(--text-primary);
	}

	header {
		z-index: 1;
		display: flex;
		align-items: center;
		background: var(--background-l0);
		padding: 10px 24px 24px 20px;
		width: 100vw;
		position: fixed;
		top: 0;
	}

	nav {
		display: flex;
		flex-direction: column;
		gap: 20px;
		padding-left: 10px;
		padding-top: 14px;
		margin-left: 23px;
	}

	span[role='img'] {
		color: var(--text-primary);
		font-size: 20px;
		padding-top: 8px;
		padding-left: 18px;
		margin-top: 1px;
	}

	ul {
		padding-left: 33px;
		padding-top: 11px;
	}

	li {
		list-style: none;
		display: flex;
		align-items: center;
		gap: 10px;
		cursor: pointer;
		margin-top: 18px;
	}

	li a {
		font-weight: 400;
	}

	.connect-button {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-bottom: 10px;
	}

	.dropdown {
		position: absolute;
		top: 64px;
		left: 0;
		z-index: 2;
		background: var(--background-l0);
		width: 100%;
		border-bottom: 1px solid var(--stroke-secondary);
	}

	@media (min-width: 766.99px) {
		header {
			display: none !important;
		}
	}
</style>
