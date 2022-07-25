<script lang="ts">
	import { Swiper, SwiperSlide } from 'swiper/svelte';
	import { Navigation } from 'swiper';

	import 'swiper/css';
	import 'swiper/css/navigation';

	export let sliderImgs: string[];
</script>

<div class="md:px-12 lg:px-14 xl:px-16">
	<Swiper
		navigation={true}
		modules={[Navigation]}
		lazy={true}
		loading={'lazy'}
		class="relative w-full overflow-hidden lg:container"
	>
		{#each sliderImgs as slide}
			<SwiperSlide class="relative float-left w-full">
				<img
					loading="lazy"
					alt="slide"
					class="pointer-events-none h-[80vh] w-full object-cover lg:h-[90vh]"
					src={slide}
				/>
			</SwiperSlide>
		{/each}
	</Swiper>
</div>
