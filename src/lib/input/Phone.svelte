<script lang="ts">
	import { validate } from '$lib/formValidation';
	import { phoneCode, PhoneNumber } from '$lib/stores';

	// $: code = $PhoneNumber.length > 5 ? $PhoneNumber : $phoneCode.startsWith('+') ? $phoneCode : `+${$phoneCode}`;
	let valid: boolean = true;
	// $: value = code ?? "";
	$: value = $phoneCode ?? "";

	const onInput = () => {
		valid = validate.phone(value);
		$PhoneNumber = value;
	};
</script>

<div class="sm:col-span-3">
	<label for="phone" class="block text-sm font-medium text-gray-700"> Phone number </label>
	<div class="mt-1">
		<input
			bind:value
			on:input={onInput}
			type="tel"
			name="phone"
			id="phone"
			autocomplete="tel"
			required
			class={`shadow-sm ${
				!valid && value.length > 0
					? `focus:ring-red-500 focus:border-red-500 border-red-300`
					: `focus:ring-indigo-500 focus:border-indigo-500 border-gray-300`
			} block w-full sm:text-sm rounded-md`}
		/>
		<p class={`mt-2 text-sm ${!valid && value.length > 0 ? `text-red-400` : `hidden`}`}>
			Phone number doesn't match the correct format.
		</p>
	</div>
</div>
