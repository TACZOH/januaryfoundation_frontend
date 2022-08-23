import type { Image, SEO } from "$lib/types";

export type IHomePage = {
    id: number;
    published_at: string;
    created_at: string;
    updated_at: string;
    SEO: SEO;
    image: any;
    Body: string;
    Title: string;
}
