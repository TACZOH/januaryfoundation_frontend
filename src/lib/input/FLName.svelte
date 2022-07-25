<script lang="ts">
	import { validate } from "$lib/formValidation";
	import { fName, lName } from "$lib/stores";
	import type { FormType } from "../types";

	export let firstName = "";
	export let lastName = "";

	let valid = {
		first: false,
		last: false,
	};

	const onInputFirst = () => {
		valid.first = validate.name(firstName);
		$fName = validate.name(firstName);
	};
	const onInputLast = () => {
		valid.last = validate.name(lastName);
		$lName = validate.name(lastName);
	};
</script>

<div class="sm:col-span-3">
	<label for="first-name" class="block text-sm font-medium text-gray-700"> First name </label>
	<div class="mt-1">
		<input
			bind:value={firstName}
			on:input={onInputFirst}
			type="text"
			name="first-name"
			id="first-name"
			autocomplete="first-name"
			required
			class={`shadow-sm ${
				!valid.first && firstName.length > 0
					? `focus:ring-red-500 focus:border-red-500 border-red-300`
					: `focus:ring-indigo-500 focus:border-indigo-500 border-gray-300`
			} block w-full sm:text-sm rounded-md`} />
		<p class={`mt-2 text-sm ${!valid.first && firstName.length > 0 ? `text-red-500` : `hidden`}`}>
			First name doesn't match the correct format.
		</p>
	</div>
</div>

<div class="sm:col-span-3">
	<label for="last-name" class="block text-sm font-medium text-gray-700"> Last name </label>
	<div class="mt-1">
		<input
			bind:value={lastName}
			on:input={onInputLast}
			type="text"
			name="last-name"
			id="last-name"
			autocomplete="last-name"
			required
			class={`shadow-sm ${
				!valid.last && lastName.length > 0
					? `focus:ring-red-500 focus:border-red-500 border-red-300`
					: `focus:ring-indigo-500 focus:border-indigo-500 border-gray-300`
			} block w-full sm:text-sm rounded-md`} />
		<p class={`mt-2 text-sm ${!valid.last && lastName.length > 0 ? `text-red-500` : `hidden`}`}>
			Last name doesn't match the correct format.
		</p>
	</div>
</div>
