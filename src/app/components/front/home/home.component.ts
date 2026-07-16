import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { NgwWowService } from 'ngx-wow';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  private wowSubscription?: Subscription;

  constructor(
    private readonly router: Router,
    private readonly wowService: NgwWowService
  ) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.wowService.init();
      });
  }

  ngOnInit(): void {
    this.wowSubscription = this.wowService.itemRevealed$.subscribe(() => {
      // Hook reserved for future reveal-driven interactions.
    });
  }

  ngOnDestroy(): void {
    this.wowSubscription?.unsubscribe();
  }
}
