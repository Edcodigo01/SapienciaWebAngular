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
  { path: '',component:HomeComponent },
  { path: 'servicios-y-planes',component:ServicesPlansComponent },
  { path: 'nosotros',component:WePageComponent },
  { path: 'portafolio',component:PortfolioComponent },
  { path: 'contactanos',component:ContactUsComponent },
  { path: 'edwar-villavicencio',component:EdwarComponent },
  { path: 'adriana-vargas',component:AdrianaComponent },

  { path: '**', pathMatch: 'full', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled', initialNavigation: 'enabled' })],
  exports: [RouterModule]
})

export class AppRoutingModule { }
