<script lang="ts">
	import { getContext } from 'svelte';
	import type Store from '$utils/Store';
	import Icon from '$lib/components/Icon';
	import type { V2ProjectContextType } from '$models/project-type';
	import Img from '$lib/components/Img.svelte';
	import Paragraph from '$lib/components/Paragraph.svelte';

	let project = getContext('PROJECT') as Store<V2ProjectContextType>;
</script>

<!-- The top component showing the logo preview with basic treasury info -->
<div class="info">
	<div class="logo">
		{#if $project.projectMetadata.logoUri}
			<Img
				src={$project.projectMetadata.logoUri}
				alt="Uploaded logo"
				style="width: 100px;max-width: 100px;"
			>
				<div class="logo-placeholder">🧃</div>
			</Img>
		{:else}
			<div class="logo-placeholder">🧃</div>
		{/if}
	</div>
	<div class="info-text">
		<h1 class:primary={$project.projectMetadata.name}>
			{$project.projectMetadata.name || 'Untitled project'}
		</h1>
		<div class="social-list">
			{#if $project.projectMetadata?.infoUri}
				<p>
					<a
						href={$project.projectMetadata?.infoUri.match(/^(https?:\/\/)?(.+)$/)[0] || ''}
						target="_blank"
						rel="noopener noreferrer"
					>
						{$project.projectMetadata?.infoUri.match(/^(https?:\/\/)?(.+)$/)[2] || ''}
					</a>
				</p>
			{/if}
			<div class="social-links">
				{#if $project.projectMetadata.twitter}
					<p class="preview-twitter">
						<Icon name="twitter" />
						<a
							href={`https://twitter.com/${$project.projectMetadata.twitter}`}
							target="_blank"
							rel="noopener noreferrer"
						>
							{$project.projectMetadata.twitter}
						</a>
					</p>
				{/if}
				{#if $project.projectMetadata.discord}
					<p class="preview-discord">
						<Icon name="discord" />
						<a href={$project.projectMetadata.discord} target="_blank" rel="noopener noreferrer">
							Discord
						</a>
					</p>
				{/if}
			</div>
		</div>
		<p class="description" class:primary={$project.projectMetadata.description}>
			<Paragraph
				description={$project.projectMetadata.description || ''}
				characterLimit={200}
				markdown
			/>
		</p>
	</div>
</div>

<style lang="scss">
	.description {
		color: var(--text-secondary);
		overflow-wrap: break-word;
		padding-right: 0.5rem;
		margin-top: 15px;
	}

	.info {
		display: flex;
		align-items: flex-start;
		color: var(--text-tertiary);
		.logo {
			margin-top: 15px;
		}
	}

	.logo-placeholder {
		background-color: var(--background-l1);
		height: 100px;
		width: 100px;
		font-size: 36px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.info-text {
		padding: 0px 20px;
	}
	.info .info-text h1 {
		color: var(--text-tertiary);
		font-size: 36px;
		font-weight: 500;
		margin: 0;
	}
	.social-list {
		display: flex;
		flex-wrap: wrap;
		flex-direction: column;
		p {
			margin-bottom: 0px;
		}
	}

	.social-list p {
		margin-right: 20px;
		color: var(--text-over-action-secondary);
	}

	.info .info-text .primary,
	.description.primary {
		color: var(--text-primary);
	}

	@media (max-width: 768px) {
		.info .info-text h1 {
			font-size: 28px;
		}
	}
	.preview-twitter,
	.preview-discord {
		display: flex;
		align-items: center;
	}
	.preview-discord {
		a {
			margin-left: 5px;
		}
	}
	.social-links {
		display: flex;
		margin-top: 5px;
	}
</style>
