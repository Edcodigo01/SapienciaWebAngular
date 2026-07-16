import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactUsComponent } from './components/front/contact-us/contact-us.component';
import { HomeComponent } from './components/front/home/home.component';
import { PortfolioComponent } from './components/front/portfolio/portfolio.component';
import { AdrianaComponent } from './components/front/profiles/adriana/adriana.component';
import { EdwarComponent } from './components/front/profiles/edwar/edwar.component';
import { ServicesPlansComponent } from './components/front/services-plans/services-plans.component';
import { WePageComponent } from './components/front/we-page/we-page.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: {
      seo: {
        title: 'Sapiencia Web | Diseno y Desarrollo Web',
        description: 'Sapiencia Web crea sitios web, landing pages y soluciones digitales con enfoque en diseno, desarrollo, rendimiento y posicionamiento SEO.',
        keywords: 'Sapiencia Web, diseno web, desarrollo web, SEO, marketing digital, paginas web',
        path: '/'
      }
    }
  },
  {
    path: 'servicios-y-planes',
    component: ServicesPlansComponent,
    data: {
      seo: {
        title: 'Servicios y Planes | Sapiencia Web',
        description: 'Conoce los servicios y planes de Sapiencia Web para diseno, desarrollo y optimizacion de sitios web adaptados a cada negocio.',
        keywords: 'servicios web, planes web, diseno web, desarrollo web, SEO',
        path: '/servicios-y-planes'
      }
    }
  },
  {
    path: 'nosotros',
    component: WePageComponent,
    data: {
      seo: {
        title: 'Nosotros | Sapiencia Web',
        description: 'Conoce al equipo de Sapiencia Web y nuestra experiencia en diseno, desarrollo web, marketing digital y soluciones personalizadas.',
        keywords: 'nosotros, equipo web, Sapiencia Web, desarrollo web, marketing digital',
        path: '/nosotros'
      }
    }
  },
  {
    path: 'portafolio',
    component: PortfolioComponent,
    data: {
      seo: {
        title: 'Portafolio | Sapiencia Web',
        description: 'Explora el portafolio de Sapiencia Web con proyectos de sitios web, plataformas y experiencias digitales desarrolladas para distintos clientes.',
        keywords: 'portafolio web, proyectos web, casos de exito, Sapiencia Web',
        path: '/portafolio'
      }
    }
  },
  {
    path: 'contactanos',
    component: ContactUsComponent,
    data: {
      seo: {
        title: 'Contactanos | Sapiencia Web',
        description: 'Contacta a Sapiencia Web para cotizar tu sitio web, resolver dudas o recibir asesoria sobre desarrollo, diseno y SEO.',
        keywords: 'contacto, cotizacion web, asesoria SEO, Sapiencia Web',
        path: '/contactanos'
      }
    }
  },
  {
    path: 'edwar-villavicencio',
    component: EdwarComponent,
    data: {
      seo: {
        title: 'Edwar Villavicencio | Sapiencia Web',
        description: 'Perfil profesional de Edwar Villavicencio dentro del equipo de Sapiencia Web.',
        keywords: 'Edwar Villavicencio, Sapiencia Web, perfil profesional',
        path: '/edwar-villavicencio',
        type: 'profile'
      }
    }
  },
  {
    path: 'adriana-vargas',
    component: AdrianaComponent,
    data: {
      seo: {
        title: 'Adriana Vargas | Sapiencia Web',
        description: 'Perfil profesional de Adriana Vargas dentro del equipo de Sapiencia Web.',
        keywords: 'Adriana Vargas, Sapiencia Web, perfil profesional',
        path: '/adriana-vargas',
        type: 'profile'
      }
    }
  },
  { path: '**', pathMatch: 'full', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled', initialNavigation: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
