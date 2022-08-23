<script lang="ts">
	import type { IHomePage } from "$lib/types";
	import SvelteMarkdown from 'svelte-markdown';
	import './styles.css'
	
	export let page: IHomePage;
	
</script>

<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
	<div>
		{#if page.Title}
		<h2 class="text-xl font-bold text-gray-900">{page.Title}</h2>
		{/if}
		{#if page.Body}
		<div class="text-gray-500 space-y-3 mt-5">
		<SvelteMarkdown source={page.Body} />
		</div>
		{/if}
	</div>
</div>
