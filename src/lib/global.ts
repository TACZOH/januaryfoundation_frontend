import type { IGlobal } from "$lib/types";
import axios from 'axios';
import { config } from "$lib/vars";

export const global = async (): Promise<IGlobal> => {
    return await axios.get(`${config.ENDPOINT_URL}home-page`).then(async response => { return await response.data }).catch(error => { console.error(error); return error })
};
