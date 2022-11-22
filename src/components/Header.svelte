<script lang="ts">
	import Item from '../components/menu/Item.svelte';

	// import Donate from './Donate.svelte';
	// import DonateModal from '$lib/modals/DonateModal.svelte';

	export let logo: string;
	let isLoggedIn: boolean;
	if (typeof localStorage !== 'undefined') {
		const userName = localStorage.getItem('username') || '';
		isLoggedIn = userName ? true : false;
	}
	export let nav: {
		text: string;
		link: string;
		subitems: {
			text: string;
			link: string;
			description?: string[];
			icon?: string;
			fee?: number;
		}[];
	}[];
	function signout() {
		if (typeof localStorage !== 'undefined') {
			localStorage.removeItem('username');
			localStorage.removeItem('email');
			isLoggedIn = false;
		}
	}
	$: open = false;
</script>

<div class="relative bg-white">
	<div class="max-w-7xl mx-auto px-4 sm:px-6">
		<div class="flex justify-between items-center py-3 md:justify-start md:space-x-10">
			<div class="flex justify-start lg:w-0 lg:flex-1">
				<a href="/">
					<span class="sr-only">January Foundation</span>
					<img class="h-10 w-auto" src={logo} alt="January Foundation" />
				</a>
			</div>
			<!-- <div class="-mr-28 -my-2 md:hidden">
				<Donate colors="bg-blue-600 hover:bg-blue-700 focus:ring-blue-500" />
			</div> -->
			<div class="-mr-2 -my-2 md:hidden">
				<button
					type="button"
					class="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
					aria-expanded="false"
					on:click={() => (open = !open)}
				>
					<span class="sr-only">Open menu</span>
					<!-- Heroicon name: outline/menu -->
					<svg
						class="h-6 w-6"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="2"
						stroke="currentColor"
						aria-hidden="true"
					>
						<path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
					</svg>
				</button>
			</div>
			{#each nav as item}
				<Item {item} />
			{/each}
			{#if isLoggedIn}
				<div
					class="hidden cursor-pointer text-base font-medium text-gray-500 hover:text-gray-900 md:flex"
					on:click={() => signout()}
				>
					Sign out
				</div>
			{:else}
				<a
					href="/signin"
					class="hidden text-base font-medium text-gray-500 hover:text-gray-900 md:flex">Sign in</a
				>
			{/if}
			<!-- <div class="hidden md:flex">
				<Donate colors="bg-blue-600 hover:bg-blue-700 focus:ring-blue-500" />
			</div> -->
		</div>
	</div>
</div>

<div class="z-10 absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden">
	{#if open}
		<div
			class="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50"
		>
			<div class="pt-5 pb-6 px-5">
				<div class="flex items-center justify-between">
					<div>
						<img class="h-10 w-auto" src={logo} alt="Workflow" />
					</div>
					<div class="-mr-2">
						<button
							on:click={() => (open = !open)}
							type="button"
							class="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
						>
							<span class="sr-only">Close menu</span>
							<!-- Heroicon name: outline/x -->
							<svg
								class="h-6 w-6"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="2"
								stroke="currentColor"
								aria-hidden="true"
							>
								<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
							</svg>
						</button>
					</div>
				</div>
			</div>
			<div class="py-8 px-5 space-y-6">
				<div class="grid grid-cols-2 gap-y-4 gap-x-8">
					{#each nav as item}
						<Item {item} mobile={true} />
					{/each}
					{#if isLoggedIn}
						<div class="ml-4 text-base font-medium text-gray-900" on:click={() => signout()}>
							Sign out
						</div>
					{:else}
						<a href="/signin" class="ml-4 text-base font-medium text-gray-900">Sign in</a>
					{/if}
				</div>
			</div>
		</div>
	{/if}
</div>

<!-- <DonateModal /> -->
