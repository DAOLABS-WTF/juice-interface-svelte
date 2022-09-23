<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	import Input from './Input.svelte';
	import Textarea from './Textarea.svelte';

	const dispatch = createEventDispatcher();

	export let field: FormField;
	export let value: any = '';
	let invalid = false;

	let inputRef: HTMLInputElement;

	interface FormField {
		id: string;
		label: string;
		placeholder?: string;
		description?: string;
		prefix?: string;
		addon?: string;
		// type?: InputType;
		type?: string;
		props?: {
			type?: string;
			required?: boolean;
			maxlength?: number;
		};
	}

	function handleBlur() {
		if (inputRef && !inputRef?.checkValidity()) {
			dispatch('valid', { value: false });
			invalid = true;
		} else if (inputRef) {
			dispatch('valid', { value: true });
			invalid = false;
		}
	}

	function handleFocus() {
		invalid = false;
	}
</script>

<label for={field.id}>
	{#if field.props?.required && field.label}<small>*</small>{/if}
	{field.label}
</label>
{#if field.type === 'input' || field.type === 'address' || !field.type}
	<div class="input">
		{#if field.prefix && field.addon}
			<Input
				id={field.id}
				placeholder={field.placeholder}
				bind:value
				{...field.props}
				type={field.type === 'address' ? 'address' : field.props?.type || 'text'}
				style="font-weight: 300"
				description={field.description}
				on:blur={handleBlur}
				on:focus={handleFocus}
				on:click={handleFocus}
				bind:inputRef
			>
				<p slot="prefix">{field.prefix || ''}</p>
				<p slot="addon">{field.addon || ''}</p>
			</Input>
		{:else if field.prefix}
			<Input
				id={field.id}
				placeholder={field.placeholder}
				bind:value
				{...field.props}
				type={field.type === 'address' ? 'address' : field.props?.type || 'text'}
				style="font-weight: 300"
				description={field.description}
				on:blur={handleBlur}
				on:focus={handleFocus}
				on:click={handleFocus}
				bind:inputRef
			>
				<p slot="prefix">{field.prefix || ''}</p>
			</Input>
		{:else if field.addon}
			<Input
				id={field.id}
				placeholder={field.placeholder}
				bind:value
				{...field.props}
				type={field.type === 'address' ? 'address' : field.props?.type || 'text'}
				style="font-weight: 300"
				description={field.description}
				on:blur={handleBlur}
				on:focus={handleFocus}
				on:click={handleFocus}
				bind:inputRef
			>
				<p slot="addon">{field.addon || ''}</p>
			</Input>
		{:else}
			<Input
				id={field.id}
				placeholder={field.placeholder}
				bind:value
				{...field.props}
				type={field.type === 'address' ? 'address' : field.props?.type || 'text'}
				style="font-weight: 300"
				description={field.description}
				on:blur={handleBlur}
				on:focus={handleFocus}
				on:click={handleFocus}
				bind:inputRef
			/>
		{/if}

		{#if invalid}
			<span class="is-required-msg">{inputRef.validationMessage}</span>
		{/if}
	</div>
{:else if field.type === 'textarea'}
	<Textarea
		id={field.id}
		placeholder={field.placeholder}
		bind:value
		{...field.props}
		description={field.description}
	/>
{/if}

<style>
	label {
		display: block;
		margin: 20px 0px 10px;
	}

	label:first-of-type {
		margin-top: 0;
	}
	small {
		font-size: 8px;
		color: red;
		vertical-align: text-top;
	}

	.is-required-msg {
		font-size: 0.9rem;
		color: var(--text-failure);
	}

	.input {
		width: 100%;
	}
</style>
