<script context="module" lang="ts">
	import { page as pages } from '$lib/page';
	import type { IHomePage, IGlobal } from '$lib/types';
	import type { Load } from '@sveltejs/kit';
	import axios from 'axios';
	import { config } from '$lib/vars';

	export const load: Load = async () => {
		const data: IHomePage = await pages.home();
		const global = await axios.get(`${config.ENDPOINT_URL}global`);
		const resHeader = await axios.get(`${config.ENDPOINT_URL}header`);
		const resFooter = await axios.get(`${config.ENDPOINT_URL}footer`);
		const logo: string = global.data.logo.url
		if (data) {
			return { props: { 
				page: data,
				keywords: data?.SEO?.keywords?.join(', '),
				logo,
				navData: resHeader?.data?.nav,
				footer: resFooter?.data?.footer,
				socialMedia: resFooter?.data?.social_media
			 } };
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
	import HomeBlock from './../components/HomeBlock.svelte';
	import SvelteSeo from 'svelte-seo';
	import { setSubitems } from '$lib/menuSubitems';
	import type { MenuSubitems, MenuSubitem } from '$lib/types';
	import { fees } from '$lib/fees';

	export let logo: string;
	export let page: IHomePage;
	export let keywords: string;
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

<HomeBlock {page} />

<Footer {logo} {footerNav} {socialMedia} />

</div>