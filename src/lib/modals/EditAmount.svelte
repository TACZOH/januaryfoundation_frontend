<script lang="ts">
	import { Dialog, DialogOverlay, Transition } from '@rgossiaux/svelte-headlessui';
	import { donation, donate } from '$lib/stores';
	import Icon from '@iconify/svelte';
import { onMount } from 'svelte';

	let container: HTMLElement;
	onMount(() => (container = container, container = document.getElementById('donate')!))

	export let open: boolean;
	let value: number;

	$: active = false;

	$: if (typeof $donation === 'number' && $donation > 0) {
		active = true;
	} else {
		active = false;
	}

    $: $donate = open;

    // $: if ($donate) {
	// 	const paypal = document.getElementById('donate')!;
	// 	paypal.parentNode!.removeChild(paypal);
	// }
</script>

<Transition
	show={open}
	enter="transition duration-100 ease-out"
	enterFrom="transform scale-95 opacity-0"
	enterTo="transform scale-100 opacity-100"
	leave="transition duration-75 ease-out"
	leaveFrom="transform scale-100 opacity-100"
	leaveTo="transform scale-95 opacity-0"
>
	<Dialog
		on:close={() => {
			open = false;
		}}
	>
		<DialogOverlay />
		<div class="overlay relative" aria-labelledby="modal-title" role="dialog" aria-modal="true">
			<!--
      Background backdrop, show/hide based on modal state.
  
      Entering: "ease-out duration-300"
        From: "opacity-0"
        To: "opacity-100"
      Leaving: "ease-in duration-200"
        From: "opacity-100"
        To: "opacity-0"
    -->
			<div class="fixed inset-0 bg-gray-500 bg-opacity-100 transition-opacity" />

			<div class="fixed z-10 inset-0 overflow-y-auto">
				<div
					class="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0"
				>
					<!--
          Modal panel, show/hide based on modal state.
  
          Entering: "ease-out duration-300"
            From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            To: "opacity-100 translate-y-0 sm:scale-100"
          Leaving: "ease-in duration-200"
            From: "opacity-100 translate-y-0 sm:scale-100"
            To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        -->
					<div
						class="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full"
					>
						<div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
							<div class="sm:flex sm:items-start">
								<div
									class="mx-auto flex-shrink-0 flex items-center justify-center h-16 w-16 rounded-full bg-gray-100 sm:mx-0 sm:h-10 sm:w-10"
								>
									<Icon icon="iconoir:donate" class="h-10 w-10 text-gray-800 sm:h-6 sm:w-6" />
								</div>
								<div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
									<h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">
										Edit Amount to Donate
									</h3>
									<div class="mt-2">
										<p class="text-sm text-gray-500">
											After you press continue, you will be able to continue to the checkout with
											new amount.
										</p>

										<div class="pt-4">
											<!-- <label for="price" class="block text-sm font-medium text-gray-700"
												>Amount</label
											> -->
											<div class="mt-1 relative rounded-md shadow-sm">
												<div
													class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
												>
													<span class="text-gray-500 sm:text-sm"> $ </span>
												</div>
												<input
													type="number"
													bind:value
													name="price"
													id="price"
													class="focus:ring-gray-500 focus:border-gray-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
													required
													placeholder="0.00"
													aria-describedby="price-currency"
												/>
												<div
													class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"
												>
													<span class="text-gray-500 sm:text-sm" id="price-currency"> USD </span>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
							<button
								type="button"
								on:click={() => {
									if (active) {
										open = false;
                                        $donation = value;
									}
								}}
								disabled={!active}
								class={active
									? 'w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-200 text-base font-medium text-indigo-900 hover:bg-indigo-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm'
									: 'w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-gray-200 text-base font-medium text-gray-800 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:ml-3 sm:w-auto sm:text-sm'}
								>Continue</button
							>
							<button
								type="button"
								on:click={() => (open = false)}
								class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
								>Cancel</button
							>
						</div>
					</div>
				</div>
			</div>
		</div>
	</Dialog>
</Transition>

<style>
	.overlay {
		z-index: 999;
	}
</style>
