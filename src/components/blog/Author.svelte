<script lang="ts">
	import moment from "moment";
	export let author: { name: string; avatar: string };
	export let date: string;
</script>

<section class="mb-16 flex items-center text-lg">
	<div class="mr-6 flex items-center">
		<img
			class="mr-2 rounded-full h-6"
			src={author.avatar}
			loading="lazy"
			width={24}
			height={24}
			alt={author.name}
		/>
		<p class="font-bold text-gray-500 hover:text-black">{author.name}</p>
	</div>
	<p class="text-gray-400">{moment(date).format("MMMM Do, YYYY")}</p>
</section>
