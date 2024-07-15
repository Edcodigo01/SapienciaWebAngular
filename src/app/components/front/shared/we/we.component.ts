import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import SwiperCore, { SwiperOptions, Swiper } from "swiper";
import { SwiperComponent } from "swiper/angular";



@Component({
  selector: 'app-we',
  templateUrl: './we.component.html',
  styleUrls: ['./we.component.css']
})
export class WeComponent implements OnInit {
  config: SwiperOptions;
  width:any;
  widthShowSwiper = 980;
  @ViewChild('swiper', { static: false }) swiper?: SwiperComponent;
  constructor() { }



  ngOnInit(): void {
    this.width = window.innerWidth;
    this.config = {
      pagination:{
      clickable: true
    },

      // navigation:true,
      loopFillGroupWithBlank:true,
      slidesPerView: 1,


      freeMode: true,
      loop: true,
      breakpoints: {

            0: {
              slidesPerView: 1,

          },
        }
    };
  }

  @HostListener('window:resize', ['$event'])
  onResize(event:any) {

    this.width = window.innerWidth;
  }

  slideNext(){
    this.swiper.swiperRef.slidePrev();
  }
  slidePrev(){
    this.swiper.swiperRef.slideNext();
  }

  ngAfterViewInit():void{


  }
}
