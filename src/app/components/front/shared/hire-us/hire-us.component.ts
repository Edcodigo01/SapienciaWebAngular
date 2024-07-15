
import { isPlatformBrowser } from '@angular/common';
import { Component, HostListener, Inject, OnInit, PLATFORM_ID } from '@angular/core';
@Component({
  selector: 'app-hire-us',
  templateUrl: './hire-us.component.html',
  styleUrls: ['./hire-us.component.css']
})
export class HireUsComponent implements OnInit {
  location:any;
  constructor( @Inject(PLATFORM_ID) private platformid:any ) {
    if (isPlatformBrowser(this.platformid)) {
      this.location = window.location.href;
    }
   }

  ngOnInit(): void {

  }


}
