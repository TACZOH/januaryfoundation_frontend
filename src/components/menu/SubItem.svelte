<script lang="ts">
	export let item: {
		text: string;
		link: string;
	};
	export let mobile: boolean = false;
</script>

{#if mobile}
<a href={item.link} class="-m-3 p-3 flex items-center rounded-md hover:bg-gray-50">
    <!-- Heroicon name: outline/cursor-click -->
    <svg
        class="flex-shrink-0 h-6 w-6 text-indigo-600"
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
            d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
        />
    </svg>
    <span class="ml-3 text-base font-medium text-gray-900"> {item.text} </span>
</a>
{:else}
	<a href={item.link} class="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50">
		<!-- Heroicon name: outline/chart-bar -->
		<!-- <svg
			class="flex-shrink-0 h-6 w-6 text-indigo-600"
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
				d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
			/>
		</svg> -->
		<div class="ml-4">
			<p class="text-base font-medium text-gray-900">{item.text}</p>
			<!-- <p class="mt-1 text-sm text-gray-500">
				Get a better understanding of where your traffic is coming from.
			</p> -->
		</div>
	</a>
{/if}
