import type { Image } from "$lib/types";

export type IBlogPost = {
    id: number;
    title: string;
    slug: string;
    description: string;
    date?: string;
    image: Image;
    content: string;
    published_at: string;
    created_at: string;
    updated_at: string;
}
