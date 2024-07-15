
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { isPlatformBrowser } from '@angular/common';
import { Component, HostListener, Inject, OnInit, PLATFORM_ID,ViewChild } from '@angular/core';

@Component({
  selector: 'app-last-works',
  templateUrl: './last-works.component.html',
  styleUrls: ['./last-works.component.css']
})
export class LastWorksComponent implements OnInit {
  works: any;
  selected:any;
  @ViewChild('modalWork') modalWork: any;
  constructor(private modalS: NgbModal,@Inject(PLATFORM_ID) private platformid:any) { }

  ngOnInit(): void {
    this.works = [
      {
        name: "belizabethmontilla.com" ,
        link:"https://belizabethmontilla.com",
        description: "Web Blog-Videos" ,
        description_lg:["belizabethmontilla.com es un sitio web diseñado y desarrollado para ofrecer servicios relacionados a la psicología."],
        images: [
          "assets/img/portafolio/belizabeth/home.png",
          "assets/img/portafolio/belizabeth/videos-home.png",
          "assets/img/portafolio/belizabeth/video-play-home.png",
          "assets/img/portafolio/belizabeth/services.jpg",
          "assets/img/portafolio/belizabeth/sobre-mi.png",
          "assets/img/portafolio/belizabeth/blog.jpg",
          "assets/img/portafolio/belizabeth/article.jpg",
          "assets/img/portafolio/belizabeth/testimonios.png",
          "assets/img/portafolio/belizabeth/admin-articles.png",
          "assets/img/portafolio/belizabeth/editar-article.png",
          "assets/img/portafolio/belizabeth/add-video.png",
          "assets/img/portafolio/belizabeth/admin-videos.png",
        ],
        autoadministrables:[
          "Blog:  artículos con diversas categorías",
          "Videos: permite compartir videos alojados en Youtube",
          "Cambio de contraseña del administrador."
        ],
        main_technologies:[
          "angular.jpg",
          "laravel.jpg",
          "mysql.jpg",
          "css.jpg",
          "bootstrap.jpg",
        ],
        technologies:[
          "angular.jpg",
          "laravel.jpg",
          "mysql.jpg",
          "css.jpg",
          "bootstrap.jpg",

        ]
      }
    ,
    {
      name: "sapienciaweb.com" ,
      link:"https://sapienciaweb.com/",
      description: "Web Portafolio",
      description_lg:["sapienciaweb.com es un sitio web diseñado y desarrollado para ofrecer servicios relacionados al diseño y desarrollo web y marketing digital, a través del portafolio se pueden visualizar los trabajos recientes, e incluso con un click, ir a los distintos sitios web desarrollados por la marca."],
      images: [
        "assets/img/portafolio/sapiencia/inicio.png",
        "assets/img/portafolio/sapiencia/servicios-y-planes.png",
        "assets/img/portafolio/sapiencia/nosotros.png",
        "assets/img/portafolio/sapiencia/portafolio.png",
        "assets/img/portafolio/sapiencia/portafolio-modal.png",
        "assets/img/portafolio/sapiencia/contactanos.png",
      ],
      autoadministrables:[
        "Portafolio: permite visualizar los últimos trabajos realizados por la marca.",

      ],
      main_technologies:[
        "angular.jpg",
        "laravel.jpg",
        "mysql.jpg",
        "css.jpg",
        "bootstrap.jpg",
      ],
      technologies:[
        "angular.jpg",
        "laravel.jpg",
        "mysql.jpg",
        "css.jpg",
        "bootstrap.jpg",
      ]
    },
    {
      name: "masterpaintingflorida.net" ,
      link:"https://www.masterpaintingflorida.net",
      description: "Web Portafolio-Videos-Testimonios",
      description_lg:["masterpaintingflorida.net es un sitio web diseñado y desarrollado para ofrecer servicios de pintura, para interiores y exteriores de diversas infraestructuras."],
      images: [
        "assets/img/portafolio/master-painting/home.jpg",
        "assets/img/portafolio/master-painting/mision_vision.png",
        "assets/img/portafolio/master-painting/videos.png",
        "assets/img/portafolio/master-painting/our-works.png",
        "assets/img/portafolio/master-painting/work-modal.png",
        "assets/img/portafolio/master-painting/about-us.png",
        "assets/img/portafolio/master-painting/contact-us.png",
        "assets/img/portafolio/master-painting/admin.png",
        "assets/img/portafolio/master-painting/addvideos.png",
        "assets/img/portafolio/master-painting/addWork.png",
        "assets/img/portafolio/master-painting/changuepass.png",
      ],
      autoadministrables:[
        "Portafolio: se muestran algunos trabajos realizados por la marca",
        "Videos: permite compartir videos alojados en Youtube",
        "Cambio de contraseña del administrador.",
        "Testimonios",
      ],
      main_technologies:[
        "laravel.jpg",
        "mysql.jpg",
        "ajax.jpg",
        "html.jpg",
        "css.jpg",
      ],
      technologies:[
        "laravel.jpg",
        "mysql.jpg",
        "ajax.jpg",
        "jquery.jpg",
        "html.jpg",
        "css.jpg",
        "bootstrap.jpg",
        "js.jpg",
      ]
    },

    {
      name: "eskadental.com",
      link:"https://www.eskadental.com",
      description: "Web Blog",
      description_lg:["eskadental.com es un sitio web diseñado y desarrollado para ofrecer servicios relacionados a la salud dental."],
      images: [
        "assets/img/portafolio/eskadental/inicio.png",
        "assets/img/portafolio/eskadental/inicio2.png",
        "assets/img/portafolio/eskadental/servicios.png",
        "assets/img/portafolio/eskadental/instalaciones.png",
        "assets/img/portafolio/eskadental/nosotros.png",
        "assets/img/portafolio/eskadental/contacto.png",
        "assets/img/portafolio/eskadental/add-article.png",
        "assets/img/portafolio/eskadental/admin-cate.png",
      ],
      autoadministrables:[
        "Blog: artículos con diversas categorías",
      ],
      main_technologies:[
        "laravel.jpg",
        "mysql.jpg",
        "ajax.jpg",
        "html.jpg",
        "css.jpg",
      ],
      technologies:[
        "laravel.jpg",
        "mysql.jpg",
        "ajax.jpg",
        "jquery.jpg",
        "html.jpg",
        "css.jpg",
        "bootstrap.jpg",
        "js.jpg",
      ]
    },
    {
      name: "2v-soluciones.com",
      link:"https://2v-soluciones.com/",
      description: "Web Blog-Videos-Testimonios",
      description_lg:["2v-soluciones.com es un sitio web diseñado y desarrollado para ofrecer servicios académicos y empresariales.",
      "Cuenta con una sección de Testimonios, donde las personas pueden dejar su opinión a través de su perfil de Facebook, esta opinión o testimonio se verá reflejado única y exclusivamente en el sitio web; y además se podrá visualizar el usuario de Facebook que escribió el comentario.  De ningún modo será invadido el perfil de Facebook de la persona que escriba su opinión "],
      images: [
        "assets/img/portafolio/2v/inicio.png",
        "assets/img/portafolio/2v/servicios.png",
        "assets/img/portafolio/2v/Nosotros.png",
        "assets/img/portafolio/2v/testimonios.png",
        "assets/img/portafolio/2v/videos.png",
        "assets/img/portafolio/2v/blog.png",
        "assets/img/portafolio/2v/contactanos.png",
      ],
      autoadministrables:[
        "Blog: artículos con diversas categorías",
        "Videos: permite compartir videos alojados en Youtube.",
        "Testimonios",
        "Cambio de contraseña del administrador."
      ],
      main_technologies:[
        "laravel.jpg",
        "mysql.jpg",
        "ajax.jpg",
        "html.jpg",
        "css.jpg",
      ],
      technologies:[
        "laravel.jpg",
        "mysql.jpg",
        "ajax.jpg",
        "jquery.jpg",
        "html.jpg",
        "css.jpg",
        "bootstrap.jpg",
        "js.jpg",
      ]
    },
    {
      name: 'Tienda de muebles',
      description: "Web tienda en línea",
      description_lg:["Tienda en línea de muebles con carrito de compras (en desarrollo)."],
      images: [
        "assets/img/portafolio/tienda-muebles/cart.png",
        "assets/img/portafolio/tienda-muebles/productos.png",
        "assets/img/portafolio/tienda-muebles/vista-producto.png",
        "assets/img/portafolio/tienda-muebles/videos.png",
        "assets/img/portafolio/tienda-muebles/video-play.png",
      ],
      autoadministrables:[
        "Sección de productos (categorías, subcategorías y productos)",
        "Sección de videos",
        "Cambio de contraseña del administrador."
      ],
      main_technologies:[
        "laravel.jpg",
        "mysql.jpg",
        "ajax.jpg",
        "html.jpg",
        "css.jpg",
      ],
      technologies:[
        "laravel.jpg",
        "mysql.jpg",
        "ajax.jpg",
        "jquery.jpg",
        "html.jpg",
        "css.jpg",
        "bootstrap.jpg",
        "js.jpg",

      ]
    }
  ]

  }

  location(){
    if (isPlatformBrowser(this.platformid)) {
      return window.location.href;
    }else{
      return '';
    }
  }

  openModal(name:string){
    let select = this.works.filter((x:any) => x.name === name);
    this.selected = select[0];
    this.modalS.open(this.modalWork, { ariaLabelledBy: 'modal-basic-title' })
  }


}
