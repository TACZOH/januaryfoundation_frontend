import type { SEO } from "$lib/types";
import axios from 'axios';
import { config } from '$lib/vars';

export const seo = {
    home: async (): Promise<SEO> => {
        return await axios.get(`${config.ENDPOINT_URL}home-page`)
    }
}

// type GetSeo = {}
