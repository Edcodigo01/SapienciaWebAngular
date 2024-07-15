import { isPlatformBrowser } from '@angular/common';
import { DeviceDetectorService } from 'ngx-device-detector';

import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(private deviceService: DeviceDetectorService,@Inject(PLATFORM_ID) private platformid: any) { }

  ngOnInit(): void {
  }

  goWhatsapp(number = 593989558833){

    if (isPlatformBrowser(this.platformid)) {

    if(this.deviceService.isMobile() || this.deviceService.isTablet()){
      window.open('https://api.whatsapp.com/send?phone='+number+'&text=Saludos, estoy interesado/a en sus servicios de sapiencia web');
    }else{
       window.open('https://web.whatsapp.com/send?phone='+number+'&text=Saludos, estoy interesado/a en sus servicios de sapiencia web');
    }
    }
  }
}
