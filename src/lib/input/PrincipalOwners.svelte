<script lang="ts">
	import type { IPrincipalOwners } from '$lib/types';
	import { validate } from '$lib/formValidation';
	import { fade } from 'svelte/transition';

	$: valid = false;
	$: name = '';

	const onInput = () => {
		valid = valid;
		valid = validate.name(name);
	};

	const addOwner = (name: string) => {
		if (valid) {
			value = value;
			value.push({
				FullName: name
			});
		}
	};

	const deleteOwner = (owner: IPrincipalOwners) => {
		const index = value.indexOf(owner, 0);
		if (index > -1) {
			value = value;
			value.splice(index, 1);
		}
	};

	$: disabled = !valid;

	export let value: IPrincipalOwners[] = [];
</script>

<div class="max-w-lg mx-auto">
	<div>
		<div class="text-center">
			<svg
				class="mx-auto h-12 w-12 text-gray-400"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 48 48"
				aria-hidden="true"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M34 40h10v-4a6 6 0 00-10.712-3.714M34 40H14m20 0v-4a9.971 9.971 0 00-.712-3.714M14 40H4v-4a6 6 0 0110.713-3.714M14 40v-4c0-1.313.253-2.566.713-3.714m0 0A10.003 10.003 0 0124 26c4.21 0 7.813 2.602 9.288 6.286M30 14a6 6 0 11-12 0 6 6 0 0112 0zm12 6a4 4 0 11-8 0 4 4 0 018 0zm-28 0a4 4 0 11-8 0 4 4 0 018 0z"
				/>
			</svg>
			<h2 class="mt-2 text-lg font-medium text-gray-900">Add principal owners</h2>
			{#if value.length == 0}
				<p class="mt-1 text-sm text-gray-500" transition:fade={{ duration: 300 }}>
					You haven't specified any principal owners of your organization yet. You can add them to
					your application simply by typing full name and submitting.
				</p>
			{/if}
		</div>
		<div class="mt-6 flex">
			<label for="fullname" class="sr-only">Full Name</label>
			<input
				bind:value={name}
				on:input={onInput}
				type="text"
				name="fullname"
				id="fullname"
				placeholder="John Doe"
				class={`shadow-sm ${
					!valid && name.length > 0
						? `focus:ring-red-500 focus:border-red-500 border-red-300`
						: `focus:ring-indigo-500 focus:border-indigo-500 border-gray-300`
				} block w-full sm:text-sm rounded-md`}
			/>
			<button
				on:click={() => addOwner(name)}
				type="button"
				{disabled}
				class={disabled
					? `ml-4 flex-shrink-0 px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500`
					: `ml-4 flex-shrink-0 px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
				>Add principal owner</button
			>
		</div>
		<p class={`mt-2 text-sm ${!valid && name.length > 0 ? `text-red-500` : `hidden`}`}>
			Name doesn't match the correct format.
		</p>
	</div>
	{#if value.length > 0}
		<div class="mt-10">
			<h3 class="text-xs font-semibold text-gray-500 uppercase tracking-wide">Principal Owners</h3>
			<!-- svelte-ignore a11y-no-redundant-roles -->
			<ul role="list" class="mt-4 border-t border-b border-gray-200 divide-y divide-gray-200">
				{#each value as owner}
					<li class="py-4 flex items-center justify-between space-x-3" transition:fade>
						<div class="min-w-0 flex-1 flex items-center space-x-3">
							<div class="min-w-0 flex-1">
								<p class="text-sm font-medium text-gray-900 truncate">{owner.FullName}</p>
								<!-- <p class="text-sm font-medium text-gray-500 truncate">Front-end Developer</p> -->
							</div>
						</div>
						<div>
							<button
								on:click={() => deleteOwner(owner)}
								type="button"
								class="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
								>Remove</button
							>
						</div>
					</li>
				{/each}
			</ul>
		</div>
	{/if}
</div>
