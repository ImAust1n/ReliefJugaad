export interface NewsItem {
  id: string;
  title: string;
  description: string;
  source: string;
  imageUrl: string;
  url: string;
  publishedAt: string;
  category?: string;
}

export type NewsCategory = 'All' | 'Environment' ;