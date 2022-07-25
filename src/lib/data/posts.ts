import type { IBlogPost } from "$lib/types";
import { config } from "$lib/vars";
import axios from "axios";

export const posts: Promise<IBlogPost[]> = axios.get(`${config.ENDPOINT_URL}blog-posts`).then(res => { return res.data });
