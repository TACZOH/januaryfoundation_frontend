<script lang="ts">
	import Icon from '@iconify/svelte';
	const items = [
		{
			name: 'Individual Application',
			description: 'Duis sint duis pariatur qui excepteur Lorem labore labore laborum.',
			link: '/applications/individual',
			icon: 'ic:baseline-person'
		},
		{
			name: 'Business Application',
			description: 'Duis sint duis pariatur qui excepteur Lorem labore labore laborum.',
			link: '/applications/business',
			icon: 'ic:baseline-miscellaneous-services'
		},
		{
			name: 'Institution Application',
			description: 'Duis sint duis pariatur qui excepteur Lorem labore labore laborum.',
			link: '/applications/institution',
			icon: 'ic:twotone-school'
		},
		{
			name: 'Nomination Application',
			description: 'Duis sint duis pariatur qui excepteur Lorem labore labore laborum.',
			link: '/applications/nomination',
			icon: 'mdi:handshake-outline'
		},
		{
			name: 'Raffle Ticket',
			description: 'Duis sint duis pariatur qui excepteur Lorem labore labore laborum.',
			link: '/raffle-ticket',
			icon: 'ic:twotone-sticky-note-2'
		}
	];
</script>

<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
	<div>
		<h2 class="text-xl font-bold text-gray-900">Welcome to Human Rights Go</h2>
		<div class="text-gray-500 space-y-3 mt-5">
			<div>
				<h4 class="font-bold text-lg">Who we are</h4>
				<span
					>Human Rights Go is a human rights advocacy organization, a steward of the planet, and a
					grant-making foundation, supporting hardship grants for at-risk creatures big and small on
					land and sea.</span
				>
			</div>

			<div>
				<span
					><b class="text-lg">Our mission</b> is to alleviate human suffering around the world by providing
					hardship grants to individuals, businesses and institutions. (Fill out our simple one-page
					form, no grant writing require)</span
				>
			</div>

			<div>
				<h4 class="font-bold text-lg">Raffle Ticket</h4>
				<span
					>Our raffle ticket is available to all adults over the age of 18; the winning prize is a
					New Winnebago Voyage or you can opt for ($100,000) one hundred thousand US dollar cash
					payout... Good luck!!</span
				>
			</div>

			<p>
				Human Rights Go Is a steward of the planet Our grant is open to all the citizens of this
				planet.
			</p>
		</div>
		<p class="text-sm text-gray-500 mt-5">Choose your way to contribute:</p>

		<!-- <div class="grid lg:grid-cols-2"> -->
				<div class="flex flex-wrap flex-col-reverse justify-between lg:flex-row lg:flex-nowrap">
			<ul class="mt-6 py-6 grid grid-cols-1 gap-10">
				{#each items as item}
					<li class="flow-root">
						<div
							class="relative -m-2 p-2 flex items-center space-x-4 rounded-xl hover:bg-gray-50 focus-within:ring-2 focus-within:ring-indigo-500"
						>
							<div
								class={`flex-shrink-0 flex items-center justify-center h-16 w-16 rounded-full bg-indigo-50 text-indigo-500`}
							>
								<Icon icon={item.icon} class="h-6 w-6" />
							</div>
							<div>
								<h3 class="text-sm font-medium text-gray-900">
									<a href={item.link} class="focus:outline-none">
										<span class="absolute inset-0" aria-hidden="true" />
										{item.name}<span class="ml-1" aria-hidden="true">&rarr;</span>
									</a>
								</h3>
								<p class="mt-1 text-sm text-gray-500">{item.description}</p>
							</div>
						</div>
					</li>
				{/each}
			</ul>
			<div class="mt-8 grid grid-cols-1 lg:mx-6">
				<img class="rounded-2xl xl:w-[100%] mt-4" src="/human-rights.jpg" alt="human rights" />
			</div>
		</div>
		<!-- </div> -->
	</div>
</div>
