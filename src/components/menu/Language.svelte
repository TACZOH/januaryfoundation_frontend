<script lang="ts">
	import { Popover, PopoverButton, PopoverPanel, Transition } from '@rgossiaux/svelte-headlessui';
	import Icon from '@iconify/svelte';
	import { fee } from '$lib/stores';
	import { writable } from 'svelte/store';

	let activeLang = '';
	if (typeof localStorage !== 'undefined') {
		activeLang = localStorage.getItem('language')?.toString() || '';
	}
	console.log('activeLang:', activeLang);
	export let item = {
		text: 'Language',
		subitems: [
			{
				text: 'English',
				link: '',
				description: '',
				icon: '',
				fee: ''
			},
			{
				text: 'Spanish',
				link: '',
				description: '',
				icon: '',
				fee: ''
			},
			{
				text: 'French',
				code: '',
				description: '',
				icon: '',
				fee: ''
			}
		],
		link: ''
	};
	export let mobile = false;
</script>

{#if mobile}
	{#if item.subitems.length > 0}
		{#each item.subitems as subitem}
			<a href={subitem.link} class="-m-3 p-3 flex items-center rounded-md hover:bg-gray-50">
				{#if subitem.icon}
					<Icon icon={subitem.icon} class="flex-shrink-0 h-6 w-6 text-indigo-600" />
				{/if}
				<span class="ml-3 text-base font-medium text-gray-900 w-full">{subitem.text}</span>
			</a>
		{/each}
	{:else}
		<div class="flex">
			<!-- <Icon icon="mdi:ticket" class="flex-shrink-0 h-6 w-6 text-indigo-600" /> -->
			<a href={item.link} class="ml-3 text-base font-medium text-gray-900 hover:text-gray-700">
				{item.text}
			</a>
		</div>
	{/if}
{:else if item.subitems.length > 0}
	<div class="relative hidden md:flex">
		<Popover>
			<PopoverButton>
				<button
					type="button"
					class="text-gray-500 group bg-white rounded-md inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
					aria-expanded="false"
				>
					<span>{item.text}</span>
					<svg
						class="text-gray-400 ml-2 h-5 w-5 group-hover:text-gray-500"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 20 20"
						fill="currentColor"
						aria-hidden="true"
					>
						<path
							fill-rule="evenodd"
							d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
							clip-rule="evenodd"
						/>
					</svg>
				</button>
			</PopoverButton>
			<Transition
				enter="transition duration-100 ease-out"
				enterFrom="transform scale-95 opacity-0"
				enterTo="transform scale-100 opacity-100"
				leave="transition duration-75 ease-out"
				leaveFrom="transform scale-100 opacity-100"
				leaveTo="transform scale-95 opacity-0"
			>
				<PopoverPanel>
					<div
						class="absolute z-10 -ml-4 mt-3 px-2 w-screen max-w-md sm:px-0 lg:ml-0 lg:left-1/2 lg:-translate-x-1/2"
					>
						<div class="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
							<div class="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
								{#each item.subitems as subitem}
									<PopoverButton
										as="a"
										on:click={() => localStorage.setItem('language', subitem.text)}
										class="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50"
									>
										<Icon icon={subitem.icon} class="flex-shrink-0 h-6 w-6 text-indigo-600" />
										<div class="ml-4">
											<p class="text-base font-medium text-gray-900">{subitem.text}</p>
											{#if subitem.description}
												{#each subitem.description as desc}
													<p class="mt-1 text-sm text-gray-700">{desc ? `• ${desc}` : ''}</p>
												{/each}
											{/if}
										</div>
									</PopoverButton>
								{/each}
							</div>
						</div>
					</div>
				</PopoverPanel>
			</Transition>
		</Popover>
	</div>
{:else}
	<button
		class="hidden text-base font-medium text-gray-500 hover:text-gray-900 md:flex"
		on:click={() => localStorage.setItem('language', item.text)}
	>
		{item.text}
	</button>
{/if}
