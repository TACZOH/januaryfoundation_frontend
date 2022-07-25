<script lang="ts">
	import { validate } from '$lib/formValidation';
	export let value: string;
	let valid: boolean;

	const onInput = () => {
		valid = validate.ID(value);
	};
</script>

<!-- Heroicon name: solid/question-mark-circle -->
<!-- <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
    <svg
        class="h-5 w-5 text-gray-400"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
    >
        <path
            fill-rule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
            clip-rule="evenodd"
        />
    </svg>
</div> -->

<div class="sm:col-span-3">
	<label for="id-number" class="block text-sm font-medium text-gray-700">
		Number on government-issued ID
	</label>
	<div class="mt-1">
		<input
			bind:value
			on:input={onInput}
			type="text"
			name="id-number"
			id="id-number"
			required
			placeholder="000-UA-0000"
			class={`shadow-sm ${
				!valid && value.length > 0
					? `focus:ring-red-500 focus:border-red-500 border-red-300`
					: `focus:ring-indigo-500 focus:border-indigo-500 border-gray-300`
			} block w-full sm:text-sm rounded-md`}
		/>
		<p class={`mt-2 text-sm ${!valid && value.length > 0 ? `text-red-400` : `hidden`}`}>
			Number of your ID doesn't match the correct format.
		</p>
	</div>
</div>
