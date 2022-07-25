import type { SEO } from "$lib/types";

export type IBlogPage = {
    id: number;
    published_at: string;
    created_at: string;
    updated_at: string;
    SEO: SEO;
}
