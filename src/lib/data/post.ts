import type { IBlogPost } from '$lib/types';
import { config } from '$lib/vars';
import axios from 'axios';

export const post = async (slug: string): Promise<IBlogPost> => {
    const response: IBlogPost = await axios.get(`${config.ENDPOINT_URL}blog-posts?slug=${slug}`).then(async response => { return await response.data[0] });
    return response;
}
