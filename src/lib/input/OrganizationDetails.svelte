<script lang="ts">
	import type { IBusinessInstitutions } from "$lib/types";
	import { validate } from "$lib/formValidation";
	import { PhoneNumber as phone } from "$lib/stores";
	import Website from "./Website.svelte";
	import Email from "./Email.svelte";

	let valid = false;

	export let value: IBusinessInstitutions = {
		OrganizationLegalName: "",
		Email: "",
		PhoneNumber: "",
		Website: "",
	};

	$: {
		$phone = value.PhoneNumber;
		valid = valid;
		valid = validate.phone(value.PhoneNumber);
	}
</script>

<div class="sm:col-span-3">
	<label for="OrganizationLegalName" class="block text-sm font-medium text-gray-700">
		Organization Legal Name
	</label>
	<div class="mt-1">
		<input
			bind:value={value.OrganizationLegalName}
			id="OrganizationLegalName"
			name="OrganizationLegalName"
			type="text"
			required
			autocomplete="organization"
			class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" />
	</div>
</div>

<Email bind:value={value.Email} />

<div class="sm:col-span-3">
	<label for="phone" class="block text-sm font-medium text-gray-700"> Phone number </label>
	<div class="mt-1">
		<input
			bind:value={value.PhoneNumber}
			type="tel"
			name="phone"
			id="phone"
			autocomplete="tel"
			required
			class={`shadow-sm ${
				!valid && value.PhoneNumber.length > 0
					? `focus:ring-red-500 focus:border-red-500 border-red-300`
					: `focus:ring-indigo-500 focus:border-indigo-500 border-gray-300`
			} block w-full sm:text-sm rounded-md`} />
		<p class={`mt-2 text-sm ${!valid && value.PhoneNumber.length > 0 ? `text-red-400` : `hidden`}`}>
			Phone number doesn't match the correct format.
		</p>
	</div>
</div>

<Website bind:value={value.Website} />

<!-- <div class="sm:col-span-6">
	<PrincipalOwners bind:value={value.PrincipalOwners} />
</div> -->
