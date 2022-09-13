<script lang="ts">
	import { fee } from "$lib/stores";
	import type { MenuSubitems } from "$lib/types";
	import Donate from "./Donate.svelte";
	import Icon from "@iconify/svelte";
	import SvelteMarkdown from 'svelte-markdown';
	import './styles.css'
	export let footerNav: {
		text: string;
		link: string;
		subitems: MenuSubitems;
	}[];

	export let logo: string;
	export let socialMedia: any;

	const date = new Date().getFullYear();
</script>

<footer class="bg-white" aria-labelledby="footer-heading">
	<h2 id="footer-heading" class="sr-only bg-red">Footer</h2>
	<div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
		<div class="xl:grid md:grid-cols-3 xl:gap-8">
			<div class="mt-12 grid md:grid-cols-3 gap-8 xl:mt-0 xl:col-span-2">
				{#each footerNav as item, index}
					<div class="md:grid md:grid-cols-1 md:gap-8">
						<div>
							<a href={item.link}>
								<h3 class="text-sm font-bold text-gray-900 tracking-wider capitalize">
									{item.text}
								</h3>
							</a>
							<ul class="mt-4 space-y-1">
								{#each item.subitems as subitem, subindex}
									<li>
										<a
											href={subitem.link}
											class="text-sm text-gray-500 hover:text-gray-900"
											on:click={() => ($fee = subitem.fee)}>
											<p class={`text-xs font-medium text-gray-800`}>
												{subitem.text}
											</p>
											{#if subitem.description}
												{#each subitem.description as desc}
													<p class="mt-1 ml-2 text-xs text-gray-700">{desc ? `• ${desc}` : ""}</p>
												{/each}
											{/if}
										</a>
									</li>
								{/each}
							</ul>
						</div>
					</div>
				{/each}
			</div>
			<div class="xl:col-span-1">
				<img class="h-32" src={logo} alt="January Foundation" />
				{#if socialMedia?.rightsText}
					<div class="text-xs text-gray-700 capitalize font-semibold">
						<SvelteMarkdown source={socialMedia?.rightsText} />
					</div>
				{/if}
				<div class="flex space-x-6 mt-6">
					{#if socialMedia?.facebook}
						<a
							href={socialMedia?.facebook}
							class="text-gray-400 hover:text-gray-500">
								<span class="sr-only">Facebook</span>
								<Icon class="h-6 w-6" icon="ci:facebook" />
						</a>
					{/if}
					{#if socialMedia?.twitter}
						<a href={socialMedia?.twitter} class="text-gray-400 hover:text-gray-500">
							<span class="sr-only">Twitter</span>
							<Icon class="h-6 w-6" icon="ci:twitter" />
						</a>
					{/if}
					{#if socialMedia?.linkedin}
						<a
							href={socialMedia?.linkedin}
							class="text-gray-400 hover:text-gray-500">
							<span class="sr-only">Linkedin</span>
							<Icon class="h-6 w-6" icon="ci:linkedin" />
						</a>
					{/if}

				</div>
			</div>
		</div>
		<!-- <div class="mt-12 border-t border-gray-200 pt-8">
			<p class="text-base text-gray-400 xl:text-center">
				&copy; {date} January Foundation, Inc. All rights reserved.
			</p>
		</div> -->
		<div class="mt-8 text-xs font-semibold text-black/80">
			{#if socialMedia?.copyrightText}
				<SvelteMarkdown source={socialMedia?.copyrightText} />
			{/if}

			<div class="mt-4 grid place-items-center">
				<Donate colors="bg-red-600 hover:bg-red-700 focus:ring-red-500" />
			</div>
		</div>
	</div>
</footer>
