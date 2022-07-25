<script lang="ts">
	import Icon from '@iconify/svelte';
	import { donateModal } from '$lib/stores';
</script>

<button
	type="button"
	on:click={() => ($donateModal = !$donateModal)}
	class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-full text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
>
	<Icon icon="iconoir:donate" class="-ml-1 mr-2 h-5 w-5" />
	Donate
</button>
