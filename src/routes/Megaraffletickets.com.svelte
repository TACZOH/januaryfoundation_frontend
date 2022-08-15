<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';
	import axios from 'axios';
	import { config } from '$lib/vars';
	import SvelteMarkdown from 'svelte-markdown';
	import './styles.css'

	export const load: Load = async () => {
		const { data } = await axios.get(`${config.ENDPOINT_URL}raffle`);

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
	import '../app.css';
	import Header from '../components/Header.svelte';
	import Footer from '../components/Footer.svelte';
	import SvelteSeo from 'svelte-seo';
	import { setSubitems } from '$lib/menuSubitems';
	import type { MenuSubitems, MenuSubitem, FormType } from '$lib/types';
	import { onMount } from 'svelte';

	const type: FormType = 'raffle';
	export let logo: string;
	export let navData: any;
	export let footer: any;
	export let socialMedia: any;
	export let page: any;
	export let keywords: string;

	let Carousel: any; // for saving Carousel component class

	export let carousel: { goToNext: () => void }; // for calling methods of the carousel instance
	onMount(async () => {
		// @ts-ignore
		const module = await import('svelte-carousel');
		Carousel = module.default;
	});
	const handleNextClick = () => {
		carousel.goToNext();
	};
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

<SvelteSeo title={page?.SEO?.title} description={page?.SEO?.description} {keywords} />

<div class="bg-white overflow-hidden shadow px-6">
	<Header {logo} {nav} />

	<div class="w-4/5 mx-auto my-4">
		<svelte:component this={Carousel} bind:this={carousel} autoplay arrows={false}>
			{#each page.slider as { url } (url)}
				<img src={url} alt="" class="max-w-40 h-80" />
			{/each}
		</svelte:component>
	</div>
	<h2 class='text-center my-4'>{page.title}</h2>
	{#if page.description}
	<SvelteMarkdown source={page.description} />
	{/if}
	{#if page.ticketDetails.length > 0}
		<div
			class="mx-8 my-6 flex gap-2 max-w-screen h-72 text-xl font-semibold text-justify items-center"
		>
			{#each page.ticketDetails as props (props)}
				{#if props.thumbnail.url}
					<a href={props.link}>
						<img src={props.thumbnail.url} alt="" class="px-5 rounded w-60 h-60" />
					</a>
				{/if}
			{/each}
		</div>
	{/if}
	<Footer {logo} {footerNav} {socialMedia} />
</div>