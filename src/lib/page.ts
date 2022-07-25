import type { IHomePage, IFaqPage, IBlogPage } from "$lib/types";
import axios from 'axios';
import { config } from "$lib/vars";

export const page: PromisePage = {
    home: async (): Promise<IHomePage> => {
        return await axios.get(`${config.ENDPOINT_URL}home-page`).then(async response => { return await response.data }).catch(error => { console.error(error); return error })
    },
    faq: {
        application: async (): Promise<IFaqPage> => {
            return await axios.get(`${config.ENDPOINT_URL}faq-page`).then(async response => { return await response.data }).catch(error => { console.error(error); return error })
        },
        raffle: async (): Promise<IFaqPage> => {
            return await axios.get(`${config.ENDPOINT_URL}raffle-faq-page`).then(async response => { return await response.data }).catch(error => { console.error(error); return error })
        }
    },
    blog: async (): Promise<IBlogPage> => {
        return await axios.get(`${config.ENDPOINT_URL}blog-page`).then(async response => { return await response.data }).catch(error => { console.error(error); return error })
    }
}

type PromisePage = {
    home:  () => Promise<IHomePage>;
    faq: {
        application: () => Promise<IFaqPage>;
        raffle: () => Promise<IFaqPage>;
    };
    blog: () => Promise<IBlogPage>;
}
