import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-we-page',
  templateUrl: './we-page.component.html',
  styleUrls: ['./we-page.component.css']
})
export class WePageComponent implements OnInit {

  constructor(private titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle('Nosotros');
  }

}


