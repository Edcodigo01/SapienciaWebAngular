
import { isPlatformBrowser } from '@angular/common';
import { Component, HostListener, Inject, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {
  navbar2 = false;
  saludo = '';

  @ViewChild('boxChat') boxChat: any;

  constructor( private deviceService: DeviceDetectorService,
  @Inject(PLATFORM_ID) private platformid:any) { }

  ngOnInit(): void {
    this.genrarSaludo();
  }

  ngAfterViewInit(): void {

  }


  genrarSaludo(){

    if (isPlatformBrowser(this.platformid)) {

    let texto = "";
    let ahora=new Date();
    let hora= ahora.getHours();
    console.log(hora);

    if(hora >= 1 && hora<12){
        this.saludo="Buenos días";
    }
    if(hora>=12 && hora<19){
        this.saludo="Buenas tardes";
    }
    if (hora>=19 || hora<1){
        this.saludo="Buenas noches";
    }
    let self = this;
    // setTimeout(function(){
    //   self.boxChat.nativeElement.style.display = "block";
    // },3000)

    }



  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(e: any) {
    if (isPlatformBrowser(this.platformid)) {
      let element: any = document.querySelector('#navbar');

      if (window.pageYOffset > (element.clientHeight - 34)) {
        this.navbar2 = true;
      } else {
        this.navbar2 = false;
      }
    }
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
