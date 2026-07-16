import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { SeoData } from './models/seo.model';
import { SeoService } from './services/seo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'sapAngular';
  private routerSubscription?: Subscription;
  showEdwarNavbar = false;

  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly seoService: SeoService
  ) {}

  ngOnInit(): void {
    this.updateNavbarByUrl(this.router.url);
    this.updateSeoFromRoute();

    this.routerSubscription = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        const navigation = event as NavigationEnd;
        this.updateNavbarByUrl(navigation.urlAfterRedirects);
        this.updateSeoFromRoute();
      });
  }

  ngOnDestroy(): void {
    this.routerSubscription?.unsubscribe();
  }

  private updateNavbarByUrl(url: string): void {
    this.showEdwarNavbar = url.includes('edwar-villavicencio');
  }

  private updateSeoFromRoute(): void {
    let route = this.activatedRoute;

    while (route.firstChild) {
      route = route.firstChild;
    }

    const seo = route.snapshot.data.seo as SeoData | undefined;

    if (seo) {
      this.seoService.update(seo);
    }
  }
}
