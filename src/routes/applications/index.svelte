<script context="module" lang="ts">
	import { page as pages } from '$lib/page';
	import type { IRafflePage } from '$lib/types';
	import type { Load } from '@sveltejs/kit';
	import axios from 'axios';
	import { config } from '$lib/vars';

	export const load: Load = async () => {
		const data: IRafflePage = await pages.grant();
		const global = await axios.get(`${config.ENDPOINT_URL}global`);
		const resHeader = await axios.get(`${config.ENDPOINT_URL}header`);
		const resFooter = await axios.get(`${config.ENDPOINT_URL}footer`);

		const logo: string = global.data.logo.url;
		if (data) {
			return {
				props: {
					page: data,
					keywords: data?.SEO?.keywords.join(', '),
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
</script>

<script lang="ts">
	import SvelteSeo from 'svelte-seo';
	export let page: any;
	export let keywords: string;
	console.log(page);
	import '../../app.css';
	import Header from '../../components/Header.svelte';
	import Footer from '../../components/Footer.svelte';
	import { setSubitems } from '$lib/menuSubitems';
	import type { MenuSubitems, MenuSubitem, FormType } from '$lib/types';
	import Business from './business.svelte';

	const type: FormType = 'business';
	export let logo: string;
	export let navData: any;
	export let footer: any;
	export let socialMedia: any;

	const applications: MenuSubitem[] = [];

	setSubitems('Individual').forEach((element) => {
		applications.push(element);
	});
	setSubitems('Business').forEach((element) => {
		applications.push(element);
	});
	setSubitems('Institution').forEach((element) => {
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
	}[] = [];
	for (let i = 0; i < navData.length; i++) {
		let subitemsArray: any = [];
		for (let j = 0; j < navData[i].subitems.length; j++) {
			const desc = navData[i]?.subitems[j]?.description?.split(`\n`) || [];
			let feeHeader = null;
			if (navData[i].subitems[j].feesType === 'individual') {
				feeHeader = 1;
			}
			if (navData[i].subitems[j].feesType === 'raffle') {
				feeHeader = 5;
			}
			if (navData[i].subitems[j].feesType === 'business') {
				feeHeader = 10;
			}
			if (navData[i].subitems[j].feesType === 'institution') {
				feeHeader = 100;
			}
			if (navData[i].subitems[j].feesType === 'nomination') {
				feeHeader = 10;
			}
			let subObj = {
				text: navData[i]?.subitems[j]?.text || '',
				link: navData[i]?.subitems[j]?.link || '',
				description: desc,
				icon: navData[i]?.subitems[j]?.iconName || '',
				fee: feeHeader
			};
			subitemsArray = [...subitemsArray, subObj];
		}
		const obj = {
			text: navData[i].text || '',
			link: navData[i].link || '',
			subitems: subitemsArray
		};
		nav = [...nav, obj];
	}

	let footerNav: {
		text: string;
		link: string;
		subitems: MenuSubitems;
	}[] = [];

	for (let i = 0; i < footer.length; i++) {
		let subitemsArray: any = [];
		for (let j = 0; j < footer[i].subitems.length; j++) {
			const desc = footer[i]?.subitems[j]?.description?.split(`\n`) || [];
			let feeHeader = 1;
			if (navData[i].subitems[j]?.feesType === 'individual') {
				feeHeader = 1;
			}
			if (navData[i].subitems[j]?.feesType === 'raffle') {
				feeHeader = 5;
			}
			if (navData[i].subitems[j]?.feesType === 'business') {
				feeHeader = 10;
			}
			if (navData[i].subitems[j]?.feesType === 'institution') {
				feeHeader = 100;
			}
			if (navData[i].subitems[j]?.feesType === 'nomination') {
				feeHeader = 10;
			}
			let subObj = {
				text: footer[i]?.subitems[j]?.text || '',
				link: footer[i]?.subitems[j]?.link || '',
				description: desc,
				icon: footer[i]?.subitems[j]?.iconName || '',
				fee: feeHeader
			};
			subitemsArray = [...subitemsArray, subObj];
		}
		const obj = {
			text: footer[i].text || '',
			link: footer[i].link || '',
			subitems: subitemsArray
		};
		footerNav = [...footerNav, obj];
	}
</script>

<!-- <SvelteSeo title="Education Grant" description="Education Grant" {keywords} /> -->
<div class="bg-white overflow-hidden shadow divide-y divide-gray-200">
	<Header {logo} {nav} />
	<section class="max-w-7xl mx-auto flex flex-col items-center">
		<h2 class="md:text-5xl text-3xl font-bold my-5">Education Grant</h2>
		<!-- {#if page?.description}
			<p class="md:text-md text-md mb-32 text-center px-12">{page?.description}</p>
		{/if} -->

		<div class="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3 max-w-7xl mx-auto my-8">
			{#if page.business}
				<a
					href={`/applications/business`}
					class="overflow-hidden bg-white shadow-lg border border-slate-100 cursor-pointer group rounded-2xl last:mr-0 lg:mr-6 lg:mb-10"
				>
					<div class="flex flex-col p-5">
						<h1 class="mb-2 text-xl font-bold">{page.business.title}</h1>
					</div>

					<!-- <img
							class="m-0 transition-transform duration-300 w-full max-h-60 group-hover:scale-110"
							src={raffle?.slider[0]?.url}
							loading="lazy"
							alt={raffle.title}
						/> -->
				</a>
			{/if}
			{#if page.individual}
				<a
					href={`/applications/individual`}
					class="overflow-hidden bg-white shadow-lg border border-slate-100 cursor-pointer group rounded-2xl last:mr-0 lg:mr-6 lg:mb-10"
				>
					<div class="flex flex-col p-5">
						<h1 class="mb-2 text-xl font-bold">{page.individual.title}</h1>
					</div>

					<!-- <img
							class="m-0 transition-transform duration-300 w-full max-h-60 group-hover:scale-110"
							src={raffle?.slider[0]?.url}
							loading="lazy"
							alt={raffle.title}
						/> -->
				</a>
			{/if}
			{#if page.education}
				<a
					href={`/applications/education-institution`}
					class="overflow-hidden bg-white shadow-lg border border-slate-100 cursor-pointer group rounded-2xl last:mr-0 lg:mr-6 lg:mb-10"
				>
					<div class="flex flex-col p-5">
						<h1 class="mb-2 text-xl font-bold">{page?.education?.title}</h1>
					</div>

					<!-- <img
							class="m-0 transition-transform duration-300 w-full max-h-60 group-hover:scale-110"
							src={raffle?.slider[0]?.url}
							loading="lazy"
							alt={raffle.title}
						/> -->
				</a>
			{/if}
			{#if page.community}
				<a
					href={`/applications/community-benefit`}
					class="overflow-hidden bg-white shadow-lg border border-slate-100 cursor-pointer group rounded-2xl last:mr-0 lg:mr-6 lg:mb-10"
				>
					<div class="flex flex-col p-5">
						<h1 class="mb-2 text-xl font-bold">{page?.community?.title}</h1>
					</div>

					<!-- <img
							class="m-0 transition-transform duration-300 w-full max-h-60 group-hover:scale-110"
							src={raffle?.slider[0]?.url}
							loading="lazy"
							alt={raffle.title}
						/> -->
				</a>
			{/if}
			{#if page.partner}
				<a
					href={`/applications/global-partner`}
					class="overflow-hidden bg-white shadow-lg border border-slate-100 cursor-pointer group rounded-2xl last:mr-0 lg:mr-6 lg:mb-10"
				>
					<div class="flex flex-col p-5">
						<h1 class="mb-2 text-xl font-bold">{page?.partner?.title}</h1>
					</div>

					<!-- <img
							class="m-0 transition-transform duration-300 w-full max-h-60 group-hover:scale-110"
							src={raffle?.slider[0]?.url}
							loading="lazy"
							alt={raffle.title}
						/> -->
				</a>
			{/if}
		</div>
	</section>

	<Footer {logo} {footerNav} {socialMedia} />
</div>
