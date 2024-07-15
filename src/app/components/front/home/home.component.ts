import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { NgwWowService } from 'ngx-wow';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  private wowSubscription: Subscription;
  constructor(private router: Router,
    private wowService:NgwWowService,
    private titleService: Title,
    private metaService: Meta) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(event => {
      this.wowService.init();
    });
   }

   ngOnInit() {
    // you can subscribe to WOW observable to react when an element is revealed
    this.titleService.setTitle('SapienciaWeb - Diseño y Desarrollo web');
    this.metaService.addTags([
      { name: 'keywords', content: 'SapienciaWeb, Desarrollo web, Diseño web, Marketing Digital' },
      { name: 'description', content: 'Diseño y desarrollo web / Marketing Digital / 097-9072010 / Somos un equipo de trabajo multidisciplinario dedicado al diseño y desarrollo de sitios web. Trabajamos con base en distintos lenguajes de programación y diversas herramientas de diseño, que nos permiten obtener resultados únicos adaptados a las necesidades de la marca del cliente.' },
    ]);
    this.wowSubscription = this.wowService.itemRevealed$.subscribe(
      (item:HTMLElement) => {
        // do whatever you want with revealed element
      });

  }

  ngOnDestroy() {
    this.wowSubscription.unsubscribe();
  }


}
