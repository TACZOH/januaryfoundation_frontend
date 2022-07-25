<script lang="ts">
	import {
		Dialog,
		DialogOverlay,
		DialogTitle,
		DialogDescription,
		Transition,
		TransitionChild
	} from '@rgossiaux/svelte-headlessui';
	import { paymentModal, paymentStatus } from '$lib/stores';
	import { goto } from '$app/navigation';
</script>

<Dialog open={$paymentModal} on:close={() => ($paymentModal = false)}>
	<Transition show={$paymentModal}>
		<div class="overlay relative" aria-labelledby="modal-title" role="dialog" aria-modal="true">
			<TransitionChild
				show={$paymentModal}
				enter="ease-out duration-300"
				enterFrom="opacity-0"
				enterTo="opacity-100"
				leave="ease-in duration-200"
				leaveFrom="opacity-100"
				leaveTo="opacity-0"
			>
				<!-- <DialogOverlay /> -->
				<div class="fixed inset-0 bg-gray-500 bg-opacity-100 transition-opacity" />

				<div class="fixed inset-0 overflow-y-auto">
					<div
						class="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0"
					>
						<TransitionChild
							show={$paymentModal}
							enter="ease-out duration-300"
							enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
							enterTo="opacity-100 translate-y-0 sm:scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 translate-y-0 sm:scale-100"
							leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
						>
							<div
								class="relative bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-sm sm:w-full sm:p-6"
							>
								<div>
									{#if $paymentStatus}
										<div
											class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100"
										>
											<svg
												class="h-6 w-6 text-red-600"
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												viewBox="0 0 24 24"
												stroke-width="2"
												stroke="currentColor"
												aria-hidden="true"
											>
												<path
													stroke-linecap="round"
													stroke-linejoin="round"
													d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
												/>
											</svg>
										</div>
									{:else}
										<div
											class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100"
										>
											<svg
												class="h-6 w-6 text-green-600"
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												viewBox="0 0 24 24"
												stroke-width="2"
												stroke="currentColor"
												aria-hidden="true"
											>
												<path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
											</svg>
										</div>
									{/if}
									<div class="mt-3 text-center sm:mt-5">
										<h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">
											{$paymentStatus ? 'Something went wrong' : 'Payment successful'}
										</h3>
										<div class="mt-2">
											<p class="text-sm text-gray-500">
												{$paymentStatus
													? 'Try again or you can contact support'
													: 'Thanks for your submission.'}
											</p>
										</div>
									</div>
								</div>
								<div class="mt-5 sm:mt-6">
									<button
										type="button"
										on:click={() => (($paymentModal = false), goto('/'))}
										class={`inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white ${
											$paymentStatus
												? 'bg-red-600 hover:bg-red-500 focus:ring-red-500'
												: 'bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500'
										} focus:outline-none focus:ring-2 focus:ring-offset-2 sm:text-sm`}
										>Go back to homepage</button
									>
								</div>
							</div>
						</TransitionChild>
					</div>
				</div>
			</TransitionChild>
		</div>
	</Transition>
</Dialog>

<style>
	.overlay {
		z-index: 999;
	}
</style>
