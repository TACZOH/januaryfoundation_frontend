<script lang="ts">
	import Icon from "@iconify/svelte";
	export let colors: string;
	// let colors = `bg-${color ?? "blue"}-600 hover:bg-${color ?? "blue"}-700 focus:ring-${color ?? "blue"}-500`;
</script>

<a
	href="https://www.sandbox.paypal.com/donate/?hosted_button_id=S96AADDRGMXDY"
	target="_blank"
	class="inline-flex items-center px-3 py-1 border border-transparent shadow-sm text-sm rounded-full text-white focus:outline-none focus:ring-2 focus:ring-offset-2 {colors}">
	<Icon icon="iconoir:donate" class="-ml-1 mr-1 h-4 w-4" />
	Donate
</a>
