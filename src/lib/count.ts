import { date } from '$lib/date';
import { config } from '$lib/vars';
import type { FormType, StrapiAPIEndpoint } from "$lib/types";
import { API } from '$lib/api';
import axios from 'axios';

let api: StrapiAPIEndpoint;

export async function count({ type }: { type: FormType; }): Promise<number> {
	api = API(type);
	return await axios
		.get(`${config.ENDPOINT_URL}${api}/count?date=${date}`)
		.then(async (response) => {
			return await response.data + 1;
		}).catch((error) => {
			if (error instanceof Error) {
				console.error(error);
				throw new Error(error.message);
			}
		});
}
