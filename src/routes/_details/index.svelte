<script lang="ts">
	import Cookies from 'js-cookie';
	// import type { FormType, Details } from '$lib/types';
	import type {
		IIndividualApplication,
		IBusinessApplication,
		IInstitutionApplication,
		INominationApplication,
		IRaffleTicket
	} from '$lib/types';
	import { cookie, details } from '$lib/stores';
	import { onMount } from 'svelte';

	onMount(() => {
		cookie.set(Cookies.get('details') !== undefined ? true : false);
		// $details = Cookies.get('details')
		if (!$cookie || $details == undefined) {
			location.href = '/';
		}
	});
	// export let type: FormType = 'business';
	// const details: IIndividualApplication | IBusinessApplication | IInstitutionApplication | INominationApplication | IRaffleTicket = $detailsStore;

	// const getDetailsCookie = () => {
	//     const details = Cookies.get('details') ?? false;
	//     !details ?
	// }

	// if (!$cookie) {
	// 	location.href = '/';
	// } else {
	//     data.push(JSON.parse(Cookies.get('details') ?? "undefined"))
	// }

	const data = ($details);
</script>

{#if $cookie}
	<div>
		<div>
			<h3 class="text-lg leading-6 font-medium text-gray-900 capitalize">
				<!-- {type !== 'raffle' ? `${type} Grant Application` : `${type} Ticket`} -->
				Submission details
			</h3>
			<p class="mt-1 max-w-2xl text-sm text-gray-500">Your data has been successfully submitted.</p>
		</div>
		<div class="mt-5 border-t border-gray-200">
			<dl class="sm:divide-y sm:divide-gray-200">
				{#each Object.keys(data) as key}
					{#each Object.entries(data[key]) as [k, v]}
						<div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
							<dt class="text-sm font-medium text-gray-500">{k}</dt>
							<dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{v}</dd>
						</div>
					{/each}
				{/each}
				<div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
					<dt class="text-sm font-medium text-gray-500">Full name</dt>
					<dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">Margot Foster</dd>
				</div>
				<div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
					<dt class="text-sm font-medium text-gray-500">Application for</dt>
					<dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">Backend Developer</dd>
				</div>
				<div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
					<dt class="text-sm font-medium text-gray-500">Email address</dt>
					<dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">margotfoster@example.com</dd>
				</div>
				<div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
					<dt class="text-sm font-medium text-gray-500">Salary expectation</dt>
					<dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">$120,000</dd>
				</div>
				<div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
					<dt class="text-sm font-medium text-gray-500">About</dt>
					<dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
						Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim incididunt cillum culpa
						consequat. Excepteur qui ipsum aliquip consequat sint. Sit id mollit nulla mollit
						nostrud in ea officia proident. Irure nostrud pariatur mollit ad adipisicing
						reprehenderit deserunt qui eu.
					</dd>
				</div>
			</dl>
		</div>
	</div>
{/if}
