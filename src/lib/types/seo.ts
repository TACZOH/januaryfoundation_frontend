export type SEO = SeoComponent

type SeoComponent = {
  id: number;
  title: string;
  description: string;
  keywords: Keyword[];
}

type Keyword = {
  id: number;
  keyword: string;
}
