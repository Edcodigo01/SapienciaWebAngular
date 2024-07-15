import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-services-plans',
  templateUrl: './services-plans.component.html',
  styleUrls: ['./services-plans.component.css']
})
export class ServicesPlansComponent implements OnInit {

  constructor(private titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle('Servicios y planes');
  }

}



