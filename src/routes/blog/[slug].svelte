<script context="module" lang="ts">
	import { post as fetchPost } from '$lib/data';
	import type { IBlogPost } from '$lib/types';
	import type { Load } from '@sveltejs/kit';
	import axios from 'axios';
	import { config } from '$lib/vars';

	export const load: Load = async ({ params }) => {
		const { slug } = params;
		const post: IBlogPost = await fetchPost(slug);
		const global = await axios.get(`${config.ENDPOINT_URL}global`);
		const resHeader = await axios.get(`${config.ENDPOINT_URL}header`);
		const resFooter = await axios.get(`${config.ENDPOINT_URL}footer`);
		const logo: string = global.data.logo.url
		return { props: { post: post, logo,
				navData: resHeader?.data?.nav,
				footer: resFooter?.data?.footer,
				socialMedia: resFooter?.data?.social_media
			} };
	};
</script>

<script lang="ts">
	import SvelteMarkdown from 'svelte-markdown';

	export let post: IBlogPost;

	import '../../app.css';
	import Header from '../../components/Header.svelte';
	import Footer from '../../components/Footer.svelte';
	import SvelteSeo from 'svelte-seo';
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
<div class='bg-white overflow-hidden shadow divide-y divide-gray-200'>

	<Header {logo} {nav} />
<div class="container flex flex-col items-center mx-auto pt-20 pb-10">
	<h1 class="mb-6 w-11/12 text-center text-2xl font-bold md:w-1/2 md:text-left md:text-5xl">
		{post.title}
	</h1>
	<!-- <img class="mb-8 md:max-w-3xl" src={`https://assets.${config.SITE_URL}/${post.image.hash}${post.image.ext}`} alt={post.title} /> -->
	<div class="prose mb-20 flex flex-col items-center">
		<SvelteMarkdown source={post.content} />
	</div>
</div>

<Footer {logo} {footerNav} {socialMedia} />
</div>