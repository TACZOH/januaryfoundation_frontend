<script lang="ts">
	import { validate } from '$lib/formValidation';
	export let value: string;
	export let title: string | undefined;

	let valid: boolean = true;

	const onInput = () => {
		valid = validate.email(value);
	};
</script>

<div class="sm:col-span-3">
	<label for="email" class="block text-sm font-medium text-gray-700"> {title} </label>
	<div class="mt-1">
		<input
			bind:value
			on:input={onInput}
			id="email"
			name="email"
			type="email"
			autocomplete="email"
			required
			class={`shadow-sm ${
				!valid && value.length > 0
					? `focus:ring-red-500 focus:border-red-500 border-red-300`
					: `focus:ring-indigo-500 focus:border-indigo-500 border-gray-300`
			} block w-full sm:text-sm rounded-md py-3`}
		/>
		<p class={`mt-2 text-sm ${!valid && value.length > 0 ? `text-red-500` : `hidden`}`}>
			Email is incorrect.
		</p>
	</div>
</div>
