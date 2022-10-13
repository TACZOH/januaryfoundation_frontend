import type { Image } from '$lib/types';

export type IRaffleTicketsList = {
	id: number;
	title: string;
	slug: string;
	description: string;
	date?: string;
	slider?: any;
	content?: string;
	published_at: string;
	created_at: string;
	updated_at: string;
	length?: number;
	column?: any;
};
