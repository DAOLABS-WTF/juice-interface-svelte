<script>
	import ActionModal from '$lib/components/ActionModal.svelte';
	import Button from '$lib/components/Button.svelte';

	// Function to close this modal
	export let close;
	// Callback to discard the resource
	export let closeResource;

	function onDiscard() {
		closeResource();
		close();
	}
</script>

<ActionModal title="Unsaved changes">
	<p>You have unsaved changes. Are you sure you want to discard them?</p>

	<div slot="footer">
		<Button size="md" type="secondary" on:click={close}>Cancel</Button>
		<Button size="md" on:click={onDiscard}>Discard</Button>
	</div>
</ActionModal>
