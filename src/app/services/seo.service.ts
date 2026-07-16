import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { SeoData } from '../models/seo.model';

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  private readonly siteUrl = 'https://sapienciaweb.com';
  private readonly siteName = 'Sapiencia Web';
  private readonly defaultImage = `${this.siteUrl}/assets/img/default/logotipos/logo-background.png`;

  constructor(
    private readonly title: Title,
    private readonly meta: Meta,
    @Inject(DOCUMENT) private readonly document: Document
  ) {}

  update(seo: SeoData): void {
    const canonicalUrl = this.buildUrl(seo.path);
    const image = seo.image ? this.buildUrl(seo.image) : this.defaultImage;
    const type = seo.type ?? 'website';

    this.title.setTitle(seo.title);
    this.meta.updateTag({ name: 'description', content: seo.description });

    if (seo.keywords) {
      this.meta.updateTag({ name: 'keywords', content: seo.keywords });
    }

    this.meta.updateTag({ property: 'og:locale', content: 'es_CO' });
    this.meta.updateTag({ property: 'og:site_name', content: this.siteName });
    this.meta.updateTag({ property: 'og:type', content: type });
    this.meta.updateTag({ property: 'og:title', content: seo.title });
    this.meta.updateTag({ property: 'og:description', content: seo.description });
    this.meta.updateTag({ property: 'og:url', content: canonicalUrl });
    this.meta.updateTag({ property: 'og:image', content: image });

    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: seo.title });
    this.meta.updateTag({ name: 'twitter:description', content: seo.description });
    this.meta.updateTag({ name: 'twitter:image', content: image });

    this.updateCanonical(canonicalUrl);
  }

  private buildUrl(path: string): string {
    if (!path || path === '/') {
      return this.siteUrl;
    }

    return `${this.siteUrl}${path.startsWith('/') ? path : `/${path}`}`;
  }

  private updateCanonical(url: string): void {
    let link = this.document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;

    if (!link) {
      link = this.document.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.document.head.appendChild(link);
    }

    link.setAttribute('href', url);
  }
}
