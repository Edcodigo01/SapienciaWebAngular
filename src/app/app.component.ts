import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit, OnDestroy {
  title = 'sapAngular';
  private routerSubscription?: Subscription;
  showEdwarNavbar = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.updateNavbarByUrl(this.router.url);

    this.routerSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.updateNavbarByUrl(event.urlAfterRedirects);
      }
    });
  }

  ngOnDestroy(): void {
    this.routerSubscription?.unsubscribe();
  }

  private updateNavbarByUrl(url: string): void {
    this.showEdwarNavbar = url.includes('edwar-villavicencio');
  }
}
