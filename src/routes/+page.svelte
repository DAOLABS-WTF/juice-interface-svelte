<script lang="ts">
	import CallToAction from '$lib/home/CallToAction.svelte';
	import FAQs from '$lib/home/FAQs.svelte';
	import FunctionalityDescription from '$lib/home/FunctionalityDescription.svelte';
	import LandingInfo from '$lib/home/LandingInfo.svelte';
	import ProjectsUsingJuice from '$lib/home/ProjectsUsingJuice.svelte';
	import StatsSection from '$lib/home/StatsSection.svelte';
	import TrendingProjects from '$lib/home/TrendingProjects.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { darkMode } from '$stores';
</script>

<svelte:head>
	<title>Juicebox | The Decentralized Funding Platform</title>
</svelte:head>

<LandingInfo />
<TrendingProjects />
<StatsSection />
<ProjectsUsingJuice />
<FunctionalityDescription />
<CallToAction />
<FAQs />

<div>
	<div class="image">
		<img
			src={$darkMode ? '/images/orange_lady-od.png' : '/images/orange_lady-ol.png'}
			alt="Powerlifting orange hitting an olympic deadlift"
		/>
	</div>
	<Footer />
</div>

<style>
	img {
		height: 40vh;
		max-height: 400px;
		min-height: 300px;
		max-width: 100%;
		object-fit: contain;
		object-position: center center;
		margin-bottom: -10px;
	}

	.image {
		display: flex;
		justify-content: center;
	}
</style>
