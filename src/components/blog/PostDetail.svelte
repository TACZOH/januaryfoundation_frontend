<script lang="ts">
	import type { IBlogPost } from "$lib/types";
	import SvelteMarkdown from 'svelte-markdown';

	export let post: IBlogPost;
</script>

<div class="container flex flex-col items-center mx-auto pt-20 pb-10">
	<h1 class="mb-6 w-11/12 text-center text-2xl font-bold md:w-1/2 md:text-left md:text-5xl">
		{post.title}
	</h1>

	<!-- <Author author={post.author} date={post.date} /> -->

	<img class="mb-8 md:max-w-3xl" src={post.image} alt={post.title} />

	<div class="prose mb-20 flex flex-col items-center">
		<SvelteMarkdown source={post.content} />
	</div>

	<div class="w-full md:w-11/12">
		<!-- <Slider sliderImgs={post?.sliderImgs} /> -->
	</div>
</div>
