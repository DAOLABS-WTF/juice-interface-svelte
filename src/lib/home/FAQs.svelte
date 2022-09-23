<script lang="ts">
	import Trans from '$lib/components/Trans.svelte';

	import CollapsibleSection from '$lib/create/CollapsibleSection.svelte';
	import { onMount } from 'svelte';

	let faqs = [
		{
			q: `Who funds Juicebox projects?`,
			a: [
				`
          Users fund your project by paying to use your app or service, or as a
          patron or investor by making a payment directly to your project's
          smart contract (like on this app).`,
				`
          For users paying through your app, you should route those funds
          through the Juicebox smart contracts so they receive tokens in return.`
			]
		},
		{
			q: `What does Juicebox cost?`,
			a: [
				`
          Juicebox is an open protocol on Ethereum that is funded using Juicebox
          itself. You can check out the contractualized budget specs
          <a href="https://juicebox.money/#/p/juicebox">here</a>
          .`,
				`
          Projects building on Juicebox pay a 2.5% JBX membership fee from
          withdrawn funds into the JuiceboxDAO treasury. Projects can then use
          their JBX to participate in the governance of JuiceboxDAO and its
          collective treasury, as well as redeem from its growing
          <a href="https://youtu.be/9Mq5oDh0aBY">overflow</a>. The fee is also
          subject to change via JBX member votes.`
			]
		},
		{
			q: `What is overflow?`,
			a: [
				`
          If you know how much your project needs to earn over some period of
          time to be sustainable, you can set a funding target with that amount.
          If your project earns more than that, the surplus funds are locked in
          an overflow pool. Anyone holding your project's tokens can claim a
          portion of the overflow pool in exchange for redeeming their tokens.`,
				`
          For more info, check out this
          <a href="https://youtu.be/9Mq5oDh0aBY">short video</a>.`
			]
		},
		{
			q: `What are community tokens?`,
			a: [
				`
          Each project has its own
          <a href="https://youtu.be/cqZhNzZoMh8">
            ERC-20 tokens
          </a>
          . Anyone who contributes funds to a project receives that project's
          tokens in return. Token balances will be tracked by the protocol until
          ERC-20 tokens are optionally issued by the project owner.`
			]
		},
		{
			q: `Why should I want to own a project's tokens?`,
			a: [
				`
          Tokens can be redeemed for a portion of a project's
          <a href="https://youtu.be/9Mq5oDh0aBY">overflow</a>, letting you benefit
          from its success. After all, you helped it get there. The token may
          also give you exclusive member-only privledges, and allow you to
          contribute to the governance of the community.`
			]
		},
		{
			q: `What's a discount rate?`,
			a: [
				`
          Projects can be created with an optional discount rate designed to
          incentivize supporters to contribute earlier rather than later. The
          amount of tokens rewarded per amount paid to your project will
          decrease by the discount rate with each new funding cycle. A higher
          discount rate will incentivize supporters to pay your project earlier
          rather than later.`
			]
		},
		{
			q: `What's a bonding curve?`,
			a: [
				`
          A bonding curve rewards people who wait longer to redeem your tokens
          for overflow.`,
				`
          For example, with a bonding curve of 70%, redeeming 10% of the token
          supply at any given time will claim around 7% of the total overflow.`,
				`The rest is left to share between token holders.`,
				`
          For more info, check out this
          <a href="https://youtu.be/dxqc3yMqi5M">
            short video
          </a>
          on bonding curves.`
			]
		},
		{
			q: `Does a project benefit from its own overflow?`,
			a: [
				`
          A project can choose to reserve a percentage of tokens for itself.
          Instead of being distributed to paying users, this percentage of
          tokens is instead minted for the project.`,
				`
          Holding these tokens entitles a project to a portion of its own
          overflow.`
			]
		},
		{
			q: `
          Can I change my project's contract after it's been created?`,
			a: [
				`
          Project owners can configure a delay period, meaning reconfigurations
          to an upcoming funding cycle must be submitted a certain number of
          days before it starts. For example, a 3-day delay period means
          reconfigurations must be submitted at least 3 days before the next
          funding cycle starts. This gives token holders time to react to the
          decision and reduces the chance of rug-pulls.`
			]
		},
		{
			q: `Can I delete a project?`,
			a: [
				`
          It isn't possible to remove a project's data from the blockchain, but
          we can hide it in the app if you'd like to prevent people from seeing
          or interacting with it — just let us know in
          <a href="https://discord.gg/6jXrJSyDFf">Discord</a>. Keep in mind people will still
          be able to use your project by interacting directly with the contract.`
			]
		},
		{
			q: `Why Ethereum?`,
			a: [
				`
          A mechanism like Juicebox where upfront financial commitments should
          be honored over time is only guaranteed within an ecosystem like
          Ethereum.`,
				`
          Ethereum provides a public environment where internet apps like
          Juicebox can run in a permission-less, trustless, and unstoppable
          fashion.`,
				`
          This means that anyone can see the code that they're using, anyone can
          use the code without asking for permission, and no one can mess with
          the code or take it down.`,
				`
          People using Juicebox are interacting with each other through public
          infrastructure—not a private, profit-seeking corporate service that
          brokers the exchange.`,
				`
          Juicebox was built to allow people and projects to get paid for
          creating public art and infrastructure, as much as or more than they
          would working towards corporate ends. No more shady business.`
			]
		},
		{
			q: `What's going on under the hood?`,
			a: [
				`
          This website (juicebox.money) connects to the Juicebox protocol's
          smart contracts, deployed on the Ethereum network. (note: anyone else
          can make a website that also connects to these same smart contracts.
          For now, don't trust any site other than this one to access the
          Juicebox protocol).`,
				`
          Creating a Juicebox project mints you an NFT (ERC-721) representing
          ownership over it. Whoever owns this NFT can configure the rules of
          the game and how payouts are distributed.`,
				`
          The project's tokens that are minted and distributed as a result of a
          received payment are ERC-20's. The amount of tokens minted and
          distributed are proportional to the volume of payments received,
          weighted by the project's discount rate over time.`
			]
		},
		{
			q: `How decentralized is Juicebox?`,
			a: [
				`
          Juicebox is a governance-minimal protocol. There are only a few levers
          that can be tuned, none of which impose changes for users without
          their consent. The Juicebox governance smart contract can adjust these
          levers.`,
				`
          The Juicebox protocol is governed by a community of JBX token holders
          who vote on proposals fortnightly.`
			]
		},
		{
			q: `What are the risks?`,
			a: [
				`
          Juicebox has handled tens of thousands of ETH through its protocol,
          and has so far had 0 security mishaps.`,
				`
          However, Juicebox is still experimental software. Although the
          Juicebox contract team have done their part to shape the smart
          contracts for public use and have tested the code thoroughly, the risk
          of exploits is never 0%.`,
				`
          Due to their public nature, any exploits to the contracts may have
          irreversible consequences, including loss of funds. Please use
          Juicebox with caution.`
			]
		},
		{
			q: `How have the contracts been tested?`,
			a: [
				`
          There are unit tests written for every condition of every function in
          the contracts, and integration tests for every workflow that the
          protocol supports.`,
				`
          There was also a script written to iteratively run the integration
          tests using a random input generator, prioritizing edge cases. The
          code has successfully passed over 1 million test cases through this
          stress-testing script.`,
				`
          The code could always use more eyes and more critique to further the
          community's confidence. Join our
          <a href="https://discord.gg/6jXrJSyDFf">Discord</a> and check out the code on
          <a href="https://github.com/jbx-protocol">
            GitHub
          </a>
          to work with us.`
			]
		},
		{
			q: `Will it work on L2s?`,
			a: [
				`
          That's the plan, but the core Juicebox contracts will first be
          deployed to Ethereum Mainnet.`,
				`
          The contract team will soon start working on L2 payment terminals for
          Juicebox projects.`
			]
		},
		{
			q: `
		  Do I have to make my project open source to use Juicebox as its
		  business model?`,
			img: {
				src: '/images/cooler_if_you_did.png',
				alt: `It'd be a lot cooler if you did`
			}
		},
		// Can Cookie have a Q 🥺
		// {
		// 	q: `Who is Peel?`,
		// 	a: [
		// 		`
		//   <a href="/p/peel" target="_blank">
		//     Peel
		//   </a>
		//   is the DAO that manages the juicebox.money frontend interface. You can
		//   reach out to Peel either through the
		//   <a href="https://discord.gg/XvmfY4Hkcz">
		//     Peel Discord
		//   </a>
		//   or the <a href="https://discord.gg/6jXrJSyDFf">Juicebox Discord</a>.`
		// 	]
		// },
		{
			q: `How do I create a project?`,
			a: [
				`
          If you're interested in creating a project but still confused on how
          to get started, consider watching this
          <a href="https://youtu.be/R43XqPriS5M">
            instructional video
          </a>
          . Also feel free to reach out in the
          <a href="https://discord.gg/6jXrJSyDFf">Juicebox Discord</a> where our team will be
          happy to help bring your project idea to life!`
			]
		}
	];

	let faqElement: HTMLElement;

	onMount(() => {
		let hash =
			location.hash.indexOf('?') > -1
				? location.hash.slice(0, location.hash.indexOf('?'))
				: location.hash;
		if (hash === '#faq') {
			faqElement.scrollIntoView({
				// behavior: 's',
				block: 'start'
			});
		}
	});
</script>

<section id="faq" bind:this={faqElement}>
	<h1><Trans>FAQs</Trans></h1>
	{#each faqs as faq}
		<div class="border-wrapper">
			<CollapsibleSection expanded={false}>
				<h4 slot="header"><Trans>{faq.q}</Trans></h4>
				{#if faq.a}
					{#each faq.a as answer}
						<p><Trans>{@html answer}</Trans></p>
					{/each}
				{:else if faq.img}
					<!-- svelte-ignore a11y-missing-attribute -->
					<img {...faq.img} />
				{/if}
			</CollapsibleSection>
		</div>
	{/each}
</section>

<style>
	section {
		max-width: 800px;
		margin: auto;
		padding: 80px 20px;
	}

	h1 {
		font-size: 2.4rem;
		font-weight: 600;
		line-height: 1.2;
		margin: 0px;
		margin-bottom: 20px;
		color: var(--text-header);
	}

	h4 {
		color: var(--text-header);
		margin: 0;
		margin-left: 10px;
		text-align: left;
	}

	div p:first-of-type {
		padding: 20px 10px 10px;
	}

	p {
		font-weight: 300;
		padding: 10px;
	}

	:global(#faq a) {
		font-weight: 600;
	}

	.border-wrapper {
		border-top: 1px solid var(--stroke-secondary);
		border-right: 1px solid var(--stroke-secondary);
		border-left: 1px solid var(--stroke-secondary);
		padding: 15px;
	}

	.border-wrapper:last-of-type {
		border-bottom: 1px solid var(--stroke-secondary);
	}
</style>
