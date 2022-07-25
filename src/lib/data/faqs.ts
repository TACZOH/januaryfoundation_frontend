import type { IFaq } from '$lib/types';
import { config } from '$lib/vars';
import axios from 'axios';

export const faqs: Promise<IFaq[]> = axios.get(`${config.ENDPOINT_URL}faqs`).then((res) => { return res.data });
