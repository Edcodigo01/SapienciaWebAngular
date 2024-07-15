
import { isPlatformBrowser } from '@angular/common';
import { Component, HostListener, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-edwar',
  templateUrl: './edwar.component.html',
  styleUrls: ['./edwar.component.css']
})
export class EdwarComponent implements OnInit {

  constructor( @Inject(PLATFORM_ID) private platformid:any,private titleService: Title ) { }

  goToLink(url: string){
    if (isPlatformBrowser(this.platformid)) {
      window.open(url, "_blank");
    }

  }

  ngOnInit(): void {
    this.titleService.setTitle('Edwar Villavicencio');
  }

}
