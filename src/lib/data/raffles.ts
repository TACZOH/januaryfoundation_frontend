import type { IRaffleTicketsList } from '$lib/types';
import { config } from '$lib/vars';
import axios from 'axios';

export const raffleList: Promise<IRaffleTicketsList[]> = axios
	.get(`${config.ENDPOINT_URL}raffle-applications`)
	.then((res) => {
		return res.data;
	});
