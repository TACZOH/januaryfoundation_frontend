<script lang="ts">
	import type { FormType, Data } from '$lib/types';
	import { fee as defaultFee } from '$lib/fees';
	import { date } from '$lib/date';
	import { name, website, email, phone, tellUsAboutYourBusiness } from '$lib/stores';
	import { selectedCountry, selectedState, PhoneNumber, state as manualState } from '$lib/stores';

	import { paymentModal } from '$lib/stores';
	import Payment from '$lib/modals/Payment.svelte';

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
	export let user: any;

	const form = new Form(type);
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
		FullName: user?.userName || '',
		Email: user?.email || '',
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
		body: ''
	};
	let hideForm = false;
	$: disabled = true;
	$: switch (type) {
		case 'business':
			disabled = !(
				data.Organization.OrganizationLegalName.length > 0 &&
				$email &&
				$website &&
				$phone &&
				$tellUsAboutYourBusiness
			);
			break;
		case 'institution':
			disabled = !(
				data.Organization.OrganizationLegalName.length > 0 &&
				$email &&
				$website &&
				$phone &&
				$tellUsAboutYourBusiness
			);
			break;
		case 'nomination':
			disabled = !($name && $email);
			break;
		case 'raffle':
			// disabled = !($fName && $lName && $email && $age && $idValidity && $phone);
			disabled = !($name && $email);
			break;
		default:
			disabled = true;
			break;
	}
	const onSubmit = async () => {
		switch (type) {
			case 'individual':
				if ($email) {
					form.valid = true;
					form.data = form.data;
					form.data = form.define.application.individual(data);
					hideForm = hideForm;
					hideForm = true;
					return await paypal.checkout();
				}
				break;
			case 'business':
				if (
					data.Organization.OrganizationLegalName !== '' &&
					$email &&
					$website &&
					$phone &&
					$tellUsAboutYourBusiness
				) {
					data.Organization.PhoneNumber = data.Organization.PhoneNumber;
					data.Organization.PhoneNumber = PhoneCheck($PhoneNumber).phoneNumber ?? $PhoneNumber;
					form.valid = true;
					form.data = form.data;
					form.data = form.define.application.business(data);
					hideForm = hideForm;
					hideForm = true;
					return await paypal.checkout();
				}
				break;
			case 'institution':
				if (data.Organization.OrganizationLegalName !== '' && $email && $website && $phone) {
					data.Organization.PhoneNumber = data.Organization.PhoneNumber;
					data.Organization.PhoneNumber = PhoneCheck($PhoneNumber).phoneNumber ?? $PhoneNumber;
					form.valid = true;
					form.data = form.data;
					form.data = form.define.application.institution(data);
					hideForm = hideForm;
					hideForm = true;
					return await paypal.checkout();
				}
				break;
			case 'nomination':
				if ($name && $email) {
					form.valid = true;
					form.data = form.data;
					form.data = form.define.application.nomination(data);
					hideForm = hideForm;
					hideForm = true;
					console.log(form.data);
					return await paypal.checkout();
				}
				break;
			case 'raffle':
				// if ($fName && $lName && $email && $age && $idValidity && $phone) {
				// 	data.PhoneNumber = data.PhoneNumber;
				// 	data.PhoneNumber = PhoneCheck($PhoneNumber).phoneNumber ?? $PhoneNumber;
				// 	form.valid = true;
				// 	form.data = form.data;
				// 	form.data = form.define.ticket.raffle(data);
				// 	hideForm = hideForm;
				// 	hideForm = true;
				// 	return await paypal.checkout();
				// }
				if ($name && $email) {
					form.valid = true;
					form.data = form.data;
					form.data = form.define.ticket.raffle(data);
					hideForm = hideForm;
					hideForm = true;
					return await paypal.checkout();
				}
				break;
			default:
				break;
		}
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
	{#if (type === 'nomination' || (data.number = number), number < 40000)}
		{#if !hideForm}
			<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" transition:fade>
				<div class="max-w-3xl mx-auto">
					<form on:submit|preventDefault={onSubmit} class="space-y-8">
						<div class="space-y-8 divide-y divide-gray-200">
							{#if type === 'raffle'}
								<div>
									<div>
										<h3 class="text-lg leading-6 font-medium text-gray-900 capitalize">
											{type === 'raffle' && `${type} Ticket`}
										</h3>
										<p class="mt-1 text-sm text-gray-500">
											After submitting the form you will be prompted to pay fee of ${typeof fee ==
											'number'
												? fee
												: defaultFee(type)}.
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
									<h3 class="text-lg leading-6 font-medium text-gray-900 capitalize">
										{type === 'business' || type === 'institution' ? type : 'Personal'} Information
									</h3>
									<p class="mt-1 text-sm text-gray-500">
										Use a permanent email address {type === 'business' || type === 'institution'
											? 'of your organization'
											: ''} where you can receive mail.
									</p>
								</div>
								<div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
									{#if type === 'business' || type === 'institution'}
										<OrganizationDetails
											bind:value={data.Organization}
											yourselfTitle={type === 'institution'
												? 'In a few words tell us about your community and how can we be of help.'
												: 'In a few words tell us about your business and how can we be of help.'}
										/>
									{:else if type === 'nomination'}
										<FullName
											bind:value={data.FullName}
											title="Full name
										"
										/>
										<Email
											bind:value={data.Email}
											title="Email address
										"
										/>
									{:else if type === 'individual'}
										<FullName
											bind:value={data.FullName}
											title="Full name
										"
										/>
										<Email
											bind:value={data.Email}
											title="Email address
										"
										/>

										<div class="sm:col-span-3">
											<label
												for="tellUsAboutYourBusiness"
												class="block text-sm font-medium text-gray-700"
											>
												In a few words tell us about yourself and how can we be of help.
											</label>
											<div class="mt-1">
												<textarea
													bind:value={data.tellUsAboutYourBusiness}
													id="tellUsAboutYourBusiness"
													name="Tell Us About Your Business"
													type="text"
													required
													autocomplete="organization"
													rows={2}
													class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
												/>
											</div>
										</div>
										<!-- <ID bind:value={data.idNumber} /> -->
										<!-- <Phone /> -->
										<!-- <Birthday bind:value={data.birthdate} /> -->
									{/if}
									<!-- if personal info -->

									<!-- FLName or FullName -->
									<!-- Email -->
									<!-- Website -->
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
											Use a real physical address where {type === 'business' ||
											type === 'institution'
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
											<Address
												bind:country={data.Address.country}
												bind:state={data.Address.state}
											/>
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
										? `ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 cursor-pointer`
										: `ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer`}
									>Continue
								</button>
							</div>
						</div>
					</form>
				</div>
			</div>
		{/if}
	{:else}
		<h1 class="text-lg leading-6 font-medium text-gray-900" transition:fade>
			You cannot create a new tickets today, try again tomorrow
		</h1>
	{/if}
{/await}
<Payment />
