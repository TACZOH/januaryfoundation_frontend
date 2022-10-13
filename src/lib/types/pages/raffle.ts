import type { SEO } from '$lib/types';

export type IRafflePage = {
	id: number;
	published_at: string;
	created_at: string;
	updated_at: string;
	SEO: SEO;
};
