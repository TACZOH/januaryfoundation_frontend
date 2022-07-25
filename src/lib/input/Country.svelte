<script lang="ts">
	import {
		Listbox,
		ListboxButton,
		ListboxOptions,
		ListboxOption,
		ListboxLabel,
		Transition,
	} from "@rgossiaux/svelte-headlessui";
	import { countries } from "$lib/stores";

	export let country: string;
</script>

<div class="sm:col-span-3">
	<Listbox
		value={country}
		on:change={e => {
			country = country;
			country = e.detail;
		}}
		let:open>
		<ListboxLabel id="listbox-label" class="block text-sm font-medium text-gray-700"
			>Country</ListboxLabel>
		<div class="mt-1">
			<ListboxButton
				type="button"
				class="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
				aria-haspopup="listbox"
				aria-expanded="true"
				aria-labelledby="listbox-label"
				><span class="block truncate"> {country} </span>
				<span class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
					<svg
						class="h-5 w-5 text-gray-400"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 20 20"
						fill="currentColor"
						aria-hidden="true">
						<path
							fill-rule="evenodd"
							d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
							clip-rule="evenodd" />
					</svg>
				</span>
			</ListboxButton>
		</div>
		<Transition
			show={open}
			enter="transition duration-100 ease-out"
			enterFrom="transform scale-95 opacity-0"
			enterTo="transform scale-100 opacity-100"
			leave="transition duration-75 ease-out"
			leaveFrom="transform scale-100 opacity-100"
			leaveTo="transform scale-95 opacity-0">
			<div>
				<ListboxOptions
					unmount={false}
					class="absolute z-10 mt-1 bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
					tabindex={-1}
					role="listbox"
					aria-labelledby="listbox-label"
					aria-activedescendant="listbox-option-3">
					{#each $countries as country}
						<!-- Use the `active` state to conditionally style the active (focused) option -->
						<!-- Use the `selected` state to conditionally style the selected option -->
						<div>
							<ListboxOption
								value={country}
								id="listbox-option-0"
								role="option"
								class={({ active }) =>
									active
										? "text-white bg-indigo-600 cursor-default select-none relative py-2 pl-8 pr-4"
										: "text-gray-900 cursor-default select-none relative py-2 pl-8 pr-4"}
								let:selected>
								{#if selected}
									<span class="absolute inset-y-0 left-0 flex items-center pl-1.5">
										<svg
											class="h-5 w-5"
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 20 20"
											fill="currentColor"
											aria-hidden="true">
											<path
												fill-rule="evenodd"
												d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
												clip-rule="evenodd" />
										</svg>
									</span>
								{/if}
								<span class={`block truncate ${selected ? "font-semibold" : "font-normal"}`}
									>{country}</span>
							</ListboxOption>
						</div>
					{/each}
				</ListboxOptions>
			</div>
		</Transition>
	</Listbox>
</div>
