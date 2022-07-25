<script lang="ts">
	import { validate } from '$lib/formValidation';
	export let value: string;
	let valid: boolean;

	const onInput = () => {
		valid = validate.name(value);
	};
</script>

<div class="sm:col-span-3">
	<label for="name" class="block text-sm font-medium text-gray-700"> Full name </label>
	<div class="mt-1">
		<input
			bind:value
			on:input={onInput}
			type="text"
			name="name"
			id="name"
			autocomplete="name"
			required
			class={`shadow-sm ${
				!valid && value.length > 0
					? `focus:ring-red-500 focus:border-red-500 border-red-300`
					: `focus:ring-indigo-500 focus:border-indigo-500 border-gray-300`
			} block w-full sm:text-sm rounded-md`}
		/>
        <p class={`mt-2 text-sm ${!valid && value.length > 0 ? `text-red-400` : `hidden`}`}>
            Name doesn't match the correct format.
        </p>    
	</div>
</div>
