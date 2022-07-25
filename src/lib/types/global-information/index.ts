import type { Image } from "$lib/types";

export type IGlobal = {
  id: number;
  published_at: string;
  created_at: string;
  updated_at: string;
  logo: Image;
  favicon: Image;
}
