<script lang="ts">
	import { validate } from '$lib/formValidation';
	export let value: string;
	let valid: boolean;

	const onInput = () => {
		valid = validate.website(value);
	};
</script>

<div class="sm:col-span-3">
	<label for="website" class="block text-sm font-medium text-gray-700"> Website </label>
	<div class="mt-1">
		<input
			bind:value
			on:input={onInput}
			id="website"
			name="website"
			type="url"
			autocomplete="url"
			class={`shadow-sm ${
				!valid && value.length > 0
					? `focus:ring-red-500 focus:border-red-500 border-red-300`
					: `focus:ring-indigo-500 focus:border-indigo-500 border-gray-300`
			} block w-full sm:text-sm rounded-md`}
		/>
	</div>
	<p class={`mt-2 text-sm ${!valid && value.length > 0 ? `text-red-500` : `hidden`}`}>
		Website is incorrect.
	</p>
</div>
