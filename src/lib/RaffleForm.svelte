<script lang="ts">
	import type { FormType, Data } from '$lib/types';
	import { fee as defaultFee } from '$lib/fees';
	import { date } from '$lib/date';
	import { name, website, email, phone } from '$lib/stores';
	import { selectedCountry, selectedState, PhoneNumber, state as manualState } from '$lib/stores';

	import { paymentModal } from '$lib/stores';
	import Payment from '$lib/modals/Payment.svelte';
	import { writable } from 'svelte/store';

	import { config } from '$lib/vars';
	import { Form } from '$lib/form';
	import { PayPal } from '$lib/paypal';
	import { phone as PhoneCheck } from 'phone';

	import FullName from '$lib/input/FullName.svelte';
	import Email from '$lib/input/Email.svelte';
	import Body from '$lib/input/Body.svelte';
	import Address from '$lib/input/Address.svelte';
	import Country from '$lib/input/Country.svelte';
	import OrganizationDetails from '$lib/input/OrganizationDetails.svelte';
	import PhysicalLocation from '$lib/input/PhysicalLocation.svelte';
	import FormLoading from '$lib/FormLoading.svelte';

	import { fade } from 'svelte/transition';

	export let type: FormType;
	export let fee: number | undefined = undefined;
	export let page: any;
	export let user: any;

	export let form = new Form(type);
	const paypal = new PayPal(
		type,
		{
			'client-id': config.CLIENT,
			'disable-funding': 'paylater'
		},
		'#contribute',
		fee
	);

	paypal.loadScript();
	const username = writable(user.userName);
	const userEmail = writable(user.email);
	let data: Data;
	$: data = {
		Organization: {
			OrganizationLegalName: '',
			Email: '',
			PhoneNumber: '',
			Website: '',
			tellUsAboutYourBusiness: ''
		},
		tellUsAboutYourBusiness: '',
		PhysicalLocation: {
			country: $selectedCountry,
			state: $selectedState
		},
		FullName: $username,
		Email: $userEmail,
		PhoneNumber: $PhoneNumber,
		birthdate: '',
		idNumber: '',
		date: date,
		number: 0,
		orderDetails: {},
		Address: {
			country: $selectedCountry,
			state: $selectedState
		},
		body: '',
		FirstName: '',
		LastName: ''
	};

	let hideForm = false;
	$: disabled = true;
	$: switch (type) {
		case 'individual':
			disabled = !($name && $email);
			break;
		case 'business':
			disabled = !(
				data.Organization.OrganizationLegalName.length > 0 &&
				$email &&
				$website &&
				$phone
			);
			break;
		case 'institution':
			disabled = !(
				data.Organization.OrganizationLegalName.length > 0 &&
				$email &&
				$website &&
				$phone
			);
			break;
		case 'nomination':
			disabled = !($name && $email);
			break;
		case 'raffle':
			disabled = !(data.FullName && data.Email);
			break;
		default:
			disabled = true;
			break;
	}

	const onSubmit = async () => {
		form.valid = true;
		form.data = form.data;
		hideForm = hideForm;
		hideForm = true;
		return await paypal.checkout();
	};

	$: if ($paymentModal) {
		const paypal = document.getElementById('contribute')!;
		paypal.parentNode!.removeChild(paypal);
	}

	$: console.log(data);
</script>

{#await type !== 'nomination' ? form.setNumber() : 0}
	<FormLoading />
{:then number}
	{#if !hideForm}
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8" transition:fade>
			<div class="max-w-3xl mx-auto">
				<form on:submit|preventDefault={onSubmit} class="space-y-8">
					<div class="space-y-8">
						{#if type === 'raffle'}
							<div>
								<div>
									<h3 class="text-lg leading-6 font-medium text-gray-900 capitalize">
										{type === 'raffle' && `${page.title}`}
									</h3>
									<p class="mt-1 text-sm text-gray-500">
										{type === 'raffle'
											? `${page.description}`
											: `After submitting the form you will be prompted to pay fee of ${
													typeof fee == 'number' ? fee : defaultFee(type)
											  }.`}
									</p>
								</div>
								{#if type !== 'raffle' && type !== 'individual'}
									<p class="mt-1 text-sm text-gray-500">
										Once your application has been reviewed, we will contact you for additional
										information.
									</p>
								{/if}
								{#if type !== 'raffle'}
									<Body bind:value={data.body} {type} />
								{/if}
							</div>
						{/if}
						<div class="pt-8">
							<div>
								{#if type === 'raffle'}
									<h3 class="text-lg leading-6 font-medium text-gray-900 capitalize">
										{page?.column?.title}
									</h3>
									<p class="mt-1 text-sm text-gray-500">
										{page?.column?.description}
									</p>
								{/if}
							</div>
							<div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
								{#if page.column.nameField}
									<FullName bind:value={data.FullName} title={page.column.nameField} />
								{/if}
								{#if page.column.emailField}
									<Email bind:value={data.Email} title={page.column.emailField} />
								{/if}
								{#if page.column.countryField}
									<Country bind:country={data.Address.country} title={page.column.countryField} />
								{/if}
							</div>
						</div>
						{#if type === 'raffle'}
							<span />
						{:else}
							<div class="pt-8">
								<div>
									<h3 class="text-lg leading-6 font-medium text-gray-900">
										{type !== 'business' && type !== 'institution'
											? 'Address'
											: 'Physical Location'}
									</h3>
									<p class="mt-1 text-sm text-gray-500">
										Use a real physical address where {type === 'business' || type === 'institution'
											? 'your organization legally'
											: 'you are legally'} located.
									</p>
								</div>
								<div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
									{#if type === 'business' || type === 'institution'}
										<PhysicalLocation
											bind:country={data.PhysicalLocation.country}
											bind:state={data.PhysicalLocation.state}
										/>
									{:else}
										<Address bind:country={data.Address.country} bind:state={data.Address.state} />
									{/if}
								</div>
							</div>
						{/if}
					</div>

					<div class="pt-5">
						<div class="flex justify-center">
							<button
								type="submit"
								{disabled}
								class={disabled
									? `ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500`
									: `ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
								>Continue
							</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	{/if}
{/await}
<Payment />
