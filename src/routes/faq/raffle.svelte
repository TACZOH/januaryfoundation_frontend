<script context="module" lang="ts">
	import type { IFaq } from '$lib/types';
	import { config } from '$lib/vars';
	import type { Load } from '@sveltejs/kit';
	import { page as pages } from '$lib/page';
	import type { IFaqPage } from '$lib/types';
	import axios from 'axios';

	export const load: Load = async ({ fetch }) => {
		const res = await fetch(`${config.ENDPOINT_URL}raffle-faqs`);
		const faqs = await res.json();
		const page: IFaqPage = await pages.faq.raffle();
		const global = await axios.get(`${config.ENDPOINT_URL}global`);
		const resHeader = await axios.get(`${config.ENDPOINT_URL}header`);
		const resFooter = await axios.get(`${config.ENDPOINT_URL}footer`);
		const logo: string = global.data.logo.url

		if (faqs && page) {
			return {
				props: {
					page,
					keywords: page?.SEO?.keywords.join(', '),
					faqs,
					logo,
					navData: resHeader?.data?.nav,
					footer: resFooter?.data?.footer,
					socialMedia: resFooter?.data?.social_media
				}
			};
		} else {
			return {
				status: 500
			};
		}
	};

	// export const load: Load = async () => {
	// 	const data: IFaqPage = await pages.faq();

	// 	if (data) {
	// 		return { props: { page: data, keywords: data.SEO.keywords.join(', ') } };
	// 	} else {
	// 		return {
	// 			status: 500
	// 		};
	// 	}
	// };
</script>

<script lang="ts">
	import {
		Disclosure,
		DisclosureButton,
		DisclosurePanel,
		Transition
	} from '@rgossiaux/svelte-headlessui';
	import SvelteMarkdown from 'svelte-markdown';
	import SvelteSeo from 'svelte-seo';

	export let page: IFaqPage;
	export let keywords: string;
	export let faqs: IFaq[];

	import '../../app.css';
	import Header from '../../components/Header.svelte';
	import Footer from '../../components/Footer.svelte';
	import { setSubitems } from '$lib/menuSubitems';
	import type { MenuSubitems, MenuSubitem } from '$lib/types';
	import { fees } from '$lib/fees';

	export let logo: string;
	export let navData: any;
	export let footer: any;
	export let socialMedia: any;

	const applications: MenuSubitem[] = [];

	setSubitems('Individual').forEach(element => {
		applications.push(element);
	});
	setSubitems('Business').forEach(element => {
		applications.push(element);
	});
	setSubitems('Institution').forEach(element => {
		applications.push(element);
	});

	
	let nav: {
		text: string;
		link: string;
		subitems: {
			text: string;
			link: string;
			fee?: number;
			description?: string[];
			icon?: string;
		}[];
	}[] = []
	for(let i=0; i<navData.length; i++){
		
		let subitemsArray: any = []
		for(let j=0; j<navData[i].subitems.length; j++){
			const desc = navData[i]?.subitems[j]?.description?.split(`\n`) || []
			let feeHeader = null;
			if(navData[i].subitems[j].feesType === "individual"){
				feeHeader = 1
			}
			if(navData[i].subitems[j].feesType === "raffle"){
				feeHeader = 5
			}
			if(navData[i].subitems[j].feesType === "business"){
				feeHeader = 10
			}
			if(navData[i].subitems[j].feesType === "institution"){
				feeHeader = 100
			}
			if(navData[i].subitems[j].feesType === "nomination"){
				feeHeader = 10
			}
			let subObj = {
				text: navData[i]?.subitems[j]?.text || '',
				link: navData[i]?.subitems[j]?.link || '',
				description: desc,
				icon: navData[i]?.subitems[j]?.iconName || '',
				fee: feeHeader
			}
			subitemsArray = [...subitemsArray, subObj]
		}
		const obj = {
			text: navData[i].text || '',
			link: navData[i].link || '',
			subitems: subitemsArray
		}
		nav = [...nav, obj]
	}

	let footerNav: {
		text: string;
		link: string;
		subitems: MenuSubitems;
	}[] = []

	for(let i=0; i<footer.length; i++){
		let subitemsArray: any = []
		for(let j=0; j<footer[i].subitems.length; j++){
			const desc = footer[i]?.subitems[j]?.description?.split(`\n`) || []
		let feeHeader = 1;
			if(navData[i].subitems[j]?.feesType === "individual"){
				feeHeader = 1
			}
			if(navData[i].subitems[j]?.feesType === "raffle"){
				feeHeader = 5
			}
			if(navData[i].subitems[j]?.feesType === "business"){
				feeHeader = 10
			}
			if(navData[i].subitems[j]?.feesType === "institution"){
				feeHeader = 100
			}
			if(navData[i].subitems[j]?.feesType === "nomination"){
				feeHeader = 10
			}
			let subObj = {
				text: footer[i]?.subitems[j]?.text || '',
				link: footer[i]?.subitems[j]?.link || '',
				description: desc,
				icon: footer[i]?.subitems[j]?.iconName || '',
				fee: feeHeader
			}
			subitemsArray = [...subitemsArray, subObj]
		}
		const obj = {
			text: footer[i].text || '',
			link: footer[i].link || '',
			subitems: subitemsArray
		}
		footerNav = [...footerNav, obj]
	}
</script>

<SvelteSeo title={page?.SEO?.title} description={page?.SEO?.description} {keywords} />

<div class='bg-white overflow-hidden shadow divide-y divide-gray-200'>

	<Header {logo} {nav} />
<section class="max-w-7xl mx-auto pb-32">
	<div class="mb-20 text-center">
		<h2 class="mt-8 md:text-5xl font-bold text-3xl">Raffle</h2>
	</div>

	<div class="max-w-4xl mx-auto min-h-[360px]">
		{#each faqs as faq, index}
			<Disclosure class="mb-7" let:open>
				<DisclosureButton class="flex flex-row items-center w-full justify-between">
					<div class="w-auto mr-8">
						<span
							class="flex items-center justify-center w-10 h-10 text-lg font-bold bg-blue-100 rounded-full"
							>{index + 1}</span
						>
					</div>

					<div class="flex justify-between text-left w-full">
						<h3 class="text-md font-bold">{faq.question}</h3>
						<span class="ml-4">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class={`h-5 w-5 ${open ? 'rotate-180' : ''}`}
								viewBox="0 0 20 20"
								fill="currentColor"
							>
								<path
									fill-rule="evenodd"
									d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z"
									clip-rule="evenodd"
								/>
							</svg>
						</span>
					</div>
				</DisclosureButton>

				<Transition
					enter="transition duration-100 ease-out"
					enterFrom="transform scale-95 opacity-0"
					enterTo="transform scale-100 opacity-100"
					leave="transition duration-75 ease-out"
					leaveFrom="transform scale-100 opacity-100"
					leaveTo="transform scale-95 opacity-0"
				>
					<DisclosurePanel class="text-base w-10/12 ml-20">
						<SvelteMarkdown source={faq.answer} />
					</DisclosurePanel>
				</Transition>
			</Disclosure>
		{/each}
	</div>
</section>

<Footer {logo} {footerNav} {socialMedia} />
</div>