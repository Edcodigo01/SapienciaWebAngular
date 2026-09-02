export interface SeoData {
  title: string;
  description: string;
  keywords?: string;
  path: string;
  canonicalUrl?: string;
  image?: string;
  type?: 'website' | 'article' | 'profile';
}
