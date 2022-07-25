<script>
	import { getContext } from 'svelte';
	import { TABS } from './Tabs.svelte';
	import { active } from '$lib/stores';

	const tab = {};
	const { registerTab, selectTab, selectedTab } = getContext(TABS);

	$: $active = $selectedTab === tab ? true : false;
	registerTab(tab);
</script>

<button class:selected={$selectedTab === tab} on:click={() => selectTab(tab)}>
	<slot active={$active} />
</button>
