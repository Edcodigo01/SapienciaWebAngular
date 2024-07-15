import { Component, OnInit, ElementRef, ViewChild, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import SwiperCore, { SwiperOptions, Swiper } from "swiper";
import { SwiperComponent } from "swiper/angular";
import { isPlatformBrowser } from '@angular/common';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.css']
})
export class PlansComponent implements OnInit {
  @ViewChild("plans") private plansCards: ElementRef;
  plansArray: any[] = [];
  width: any;
  widthShowSwiper = 750;
  config: SwiperOptions;
  selected: any;
  @ViewChild('swiper', { static: false }) swiper?: SwiperComponent;
  @ViewChild('modalPlan') modalWork: any;
  constructor(private modalS: NgbModal, private deviceService: DeviceDetectorService,
    @Inject(PLATFORM_ID) private platformid: any) { }

  ngOnInit(): void {
    this.plansArray = [
      {
        name: "Web básica",
        content: `<h3 class="text-center">Web básica</h3>
        <hr>
        <p>Permite mostrar todo tipo de información (no editable).</p>
        <p class="mb-2"><strong class="text-gold-b">Contiene:</strong></p>
        <ul class="" style="">

          <li><i class="fas fa-check"></i> 4 pestañas (secciones): </li>
          <ul class="ml-3">
          <li> <strong>1) Inicio</strong>: resumen del sitio web.</li>
          <li> <strong>2) Nosotros</strong>: quiénes somos, misión, visión, historia, entre otros. </li>
          <li>  <strong>3) Servicios</strong>: detalle de los servicios ofrecidos por la marca. </li>
          <li>  <strong>4) Contáctanos</strong>: números de teléfono, correos, redes sociales, entre otros.</li>
          </ul>

           <li> <i class="fas fa-check"></i> Animaciones para textos e imágenes.</li>
           <li> <i class="fas fa-check"></i> Videos.</li>
           <li> <i class="fas fa-check"></i> Integración de Google Maps con la ubicación de la empresa o negocio.</li>
           <li> <i class="fas fa-check"></i> Acceso directo para enviar mensajes desde el sitio web a WhatsApp.</li>
           <li> <i class="fas fa-check"></i> Enlace a redes sociales.</li>
           <li> <i class="fas fa-check"></i> Formulario para envió de mensajes al correo de la empresa o negocio.</li>
            <li class=""><i class="fas fa-check"></i> Es posible agregar funciones o secciones extras, según lo requerido por el cliente (precio adicional).</li>
        </ul>`,
      },
      {
        name: "Web Tipo blog o sección noticias",
        content: `<h3 class="text-center">Web tipo blog o sección noticias</h3>
        <hr>

        <p class="text-justify">Incluye sección para mostrar información sobre artículos con cualquier tipo de texto, imágenes y/o videos incluidos, noticias, entre otros.</p>
        <p class="mb-2"><strong class="text-gold-b">Contiene:</strong></p>

        <ul class="text-justify">
        <li><i class="fas fa-check"></i> Todo lo incluido en el plan web básica.</li>

        <li><i class="fas fa-check"></i> Sección artículos: permite visualizar la lista de artículos disponibles y buscar según diversos parámetros.  Esta sección es autoadministrable, es decir, el administrador podrá subir, editar o suprimir información de esta sección, cada que lo desee o requiera.</li>

        <li><i class="fas fa-check"></i> Es posible agregar funciones o secciones extras, según lo requerido por el cliente (precio adicional).</li>

        </ul>`,
      },
      {
        name: "Tienda en línea",
        content: ` <h3 class="text-dark text-center">Tienda en línea</h3>
        <hr class="mt-2">
        <p class="text-justify">Permite publicar productos para su venta en línea.</p>

        <p class="mb-2"><strong class="text-gold-b">Contiene:</strong></p>


        <p class="">Estas características podrían variar mucho, sin embargo, se mencionan las más comunes:</p>
        <ul class="text-justify">
          <li><i class="fas fa-check"></i>
          Todo lo incluido en el plan web básica.
          </li>
          <li><i class="fas fa-check"></i>
          Sección productos: permite visualizar la lista de los productos disponibles y buscar / filtrar según diversos parámetros.
          </li>
          <li><i class="fas fa-check"></i>
          Detalle de producto: sección que muestra los detalles de un producto seleccionado.
          </li>
          <li><i class="fas fa-check"></i>
          Carrito de compras: permite agregar productos a la compra.
          </li>
          <li><i class="fas fa-check"></i>
          Sección pago: permite realizar el pago de productos a través de tarjetas de crédito y/o solicitar información sobre formas de pago.
          </li>
          <li><i class="fas fa-check"></i>
          Sección videos: para mostrar videos promocionales.
          </li>
          <li><i class="fas fa-check"></i>
          Historial: muestra lista de los productos visitados recientemente por el usuario en un navegador determinado.
          </li>
          <li><i class="fas fa-check"></i>
          Registro de cuenta de usuarios: opcionalmente se podría permitir registro de visitantes para que puedan almacenar sus datos para futuras compras, y crear lista de productos favoritos.
          </li>
          <li><i class="fas fa-check"></i>
          Esta sección es autoadministrable, es decir, el administrador podrá subir, editar o suprimir información de esta sección, cada que lo desee o requiera.
          </li>
          <li><i class="fas fa-check"></i>
          Es posible agregar funciones o secciones extras, según lo requerido por el cliente (precio adicional).
          </li>
        </ul>`,
      },
      {
        name: "Aplicación multiusuarios",
        content: `         <h3 class="text-dark text-center">Aplicación multiusuarios</h3>

        <hr class="mt-2">
        <p class="text-justify">Permite la interacción entre múltiples usuarios (compartir información o archivos, publicar anuncios, vender productos, entre otros). Referencias de este tipo de sitios webs podría ser: Alibaba, Mercado Libre, OLX, Amazon, entre otros.</p>
        <p class="mb-2"><strong class="text-gold-b">Contiene:</strong></p>

        <p class="">Estas características podrían variar mucho, sin embargo, se mencionan las más comunes:</p>
        <ul class="text-justify">
            <li><i class="fas fa-check"></i> Todo lo incluido en el plan web básica.</li>
            <li><i class="fas fa-check"></i> Registro de cuentas electrónicas: incluye confirmación por correo.</li>
            <li><i class="fas fa-check"></i> Sección de cuenta personal para los usuarios: incluye edición de datos, imágenes para cada usuario, entre otros.</li>
            <li><i class="fas fa-check"></i> Resumen de cuenta: muestra un resumen de las acciones realizadas por el usuario en el sitio web.</li>
            <li><i class="fas fa-check"></i> Publicaciones del usuario: muestra de forma ordenada las publicaciones realizadas por cada usuario.</li>
            <li><i class="fas fa-check"></i> Publicaciones de los usuarios: se muestra una lista de las publicaciones realizadas por todos los usuarios registrados, además permite buscar / filtrar según diversos parámetros, entre otros.</li>
            <li><i class="fas fa-check"></i> Sección notificaciones: permite alertar a un usuario sobre la interacción de otros usuarios, o de una tarea pendiente, por ejemplo, alertar sobre una venta pendiente o un mensaje recibido.</li>
            <li><i class="fas fa-check"></i> Chat en tiempo real: permite la comunicación entre 2 o más usuarios.</li>
            <li><i class="fas fa-check"></i> Recordatorios automatizados: envío de recordatorios de forma automatizada a los usuarios, cada que sea necesario, por ejemplo, recordatorio del vencimiento de un plan activo, o alguna tarea pendiente.</li>
            <li><i class="fas fa-check"></i> Favoritos: muestra una lista de los anuncios favoritos del usuario, seleccionados previamente por el mismo.</li>
            <li><i class="fas fa-check"></i> Historial: muestra una lista de los anuncios visitados por el usuario.</li>
            <li><i class="fas fa-check"></i> Sistema de calificaciones: serie de funciones que permitiría a los usuarios calificarse entre sí, y una sección donde puedan comprobarse estas calificaciones.</li>
            <li><i class="fas fa-check"></i> Esta sección es autoadministrable, es decir, el administrador podrá subir, editar o suprimir información de esta sección, cada que lo desee o requiera. </li>

            <li><i class="fas fa-check"></i> Es posible agregar funciones o secciones extras, según lo requerido por el cliente (precio adicional). </li>


        </ul>`,
      },
      {
        name: "Sistema de administración",
        content: `  <h3 class="text-dark text-center"> Sistema de administración</h3>
        <hr class="mt-2">
        <p class="text-justify"> Permite la ejecución de diversos cálculos, procesos y funciones para la organización de información en diversas tablas y/o secciones, teniendo la posibilidad de añadir gráficos, entre otros elementos que faciliten la representación de los datos.
        </p>

        <p class="mb-2"><strong class="text-gold-b">Contiene:</strong></p>

        <ul class="text-justify">
            <p class="">Estas características podrían variar mucho, sin embargo, se mencionan las más comunes:</p>
            <li><i class="fas fa-check"></i> Todo lo incluido en el plan web básica.</li>
            <li><i class="fas fa-check"></i> Todas o algunas funciones incluidas en el plan Aplicación Multiusuarios.</li>
            <li><i class="fas fa-check"></i> Una o varias secciones para la creación y edición de datos (productos, precios, inventario, entre otros, etc.).</li>
            <li><i class="fas fa-check"></i> Funciones para el cálculo de operaciones varias (total de tablas, combinaciones de tablas, cálculos de facturas, entre otros, etc.).</li>
            <li><i class="fas fa-check"></i> Opción para exportar datos (Excel, PDF, TXT, SQL) e imprimir.</li>
            <li><i class="fas fa-check"></i> Campos de búsqueda y filtros en la mayoría de las secciones.</li>
            <li><i class="fas fa-check"></i> Gráficos para la representación de datos.</li>
            <li><i class="fas fa-check"></i> Es posible agregar funciones o secciones extras, según lo requerido por el cliente (precio adicional).</li>



        </ul>`,


      },
      {
        name: "Web idea personal",
        content: `   <h3 class="text-dark text-center">Web idea personal</h3>
        <hr class="mt-2">
        <p class="text-justify">Ideal para aquellos que desean hacer de su web un sitio que realice cálculos y diversas tareas para un determinado fin en particular, que no resulta muy común entre los sitios webs que suelen ofrecerse.
        </p>

        <p class="mb-2"><strong class="text-gold-b">Contiene:</strong></p>
        <p class="">Estas características podrían variar mucho, sin embargo, se mencionan las más comunes:</p>
        <ul class="text-justify">
            <li><i class="fas fa-check"></i> Todo lo incluido en el plan web básica.</li>
            <li><i class="fas fa-check"></i> Todo lo acordado entre las partes (Cliente – Sapiencia Web).</li>
        </ul>`,

      },


    ]
    this.width = window.innerWidth;
    this.config = {
      pagination: {
        clickable: true
      },
      // navigation:true,
      loopFillGroupWithBlank: true,
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

  showModalPlan(name: string) {
    let select = this.plansArray.filter((x: any) => x.name === name);
    this.selected = select[0];
    this.modalS.open(this.modalWork, { ariaLabelledBy: 'modal-basic-title' })

  }

  slideNext() {
    this.swiper.swiperRef.slidePrev();
  }

  slidePrev() {
    this.swiper.swiperRef.slideNext();
  }

  ngAfterViewInit(): void {
    this.plans();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.width = window.innerWidth;
    this.plans();
  }

  @HostListener('document:click', ['$event'])
  clickout(event: any) {

    if (event.target.className.includes('clickShowMore')) {
      let overflow = event.target.parentElement.querySelector('.overflowCard');
      let button = event.target;

      if (overflow.classList.contains('limit')) {
        for (let child of this.plansCards.nativeElement.children) {
          child.querySelector('.overflowCard').removeAttribute("style");
          child.querySelector('.overflowCard').classList.add("limit");
          child.querySelector('.text-show-more').style.display = 'inherit';
          child.querySelector('.text-show-less').style.display = 'none';
        };

        let contentheigth = event.target.parentElement.querySelector('.contentCard').offsetHeight;
        overflow.classList.remove("limit");
        overflow.style.height = contentheigth + 'px';
        button.querySelector('.text-show-more').style.display = 'none';
        button.querySelector('.text-show-less').style.display = 'inherit';

      } else {
        overflow.removeAttribute("style");
        overflow.classList.add("limit");
        button.querySelector('.text-show-more').style.display = 'inherit';
        button.querySelector('.text-show-less').style.display = 'none';
      }
    } else if (event.target.className.includes('clickParent')) {
      event.target.parentElement.click();
    }
  }


  plans() {


    for (let child of this.plansCards.nativeElement.children) {
      let overflowCard = child.querySelector('.overflowCard');
      let contentCard = child.querySelector('.contentCard');
      if (contentCard.offsetHeight > overflowCard.offsetHeight) {
        child.querySelector('.showMore').style.visibility = 'visible';
      } else {
        child.querySelector('.showMore').style.visibility = 'hidden';
      }
    };
  }

  goWhatsapp(name: string) {
    let number = 593989558833
    if (isPlatformBrowser(this.platformid)) {

      if (this.deviceService.isMobile() || this.deviceService.isTablet()) {
        window.open('https://api.whatsapp.com/send?phone=' + number + '&text=Saludos, quisiera saber el precio del plan ofrecido en SapienciaWeb llamado: ' + name);
      } else {
        window.open('https://web.whatsapp.com/send?phone=' + number + '&text=Saludos, quisiera saber el precio del plan ofrecido en SapienciaWeb llamado: ' + name);
      }
    }
  }
}
