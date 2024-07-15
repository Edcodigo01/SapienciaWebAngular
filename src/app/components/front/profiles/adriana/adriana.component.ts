import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-adriana',
  templateUrl: './adriana.component.html',
  styleUrls: ['./adriana.component.css']
})
export class AdrianaComponent implements OnInit {

  constructor(private titleService: Title) { }

  ngOnInit(): void {

    this.titleService.setTitle('Adriana Vargas');


  }

}
