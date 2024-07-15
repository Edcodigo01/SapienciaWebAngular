import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/front/shared/navbar/navbar.component';
import { HomeComponent } from './components/front/home/home.component';
import { ContactUsComponent } from './components/front/contact-us/contact-us.component';
import { PortfolioComponent } from './components/front/portfolio/portfolio.component';
import { WeComponent } from './components/front/shared/we/we.component';


import { FooterComponent } from './components/front/shared/footer/footer.component';
import { NgwWowModule } from 'ngx-wow';
import { PlansComponent } from './components/front/shared/plans/plans.component';
import { ServicesComponent } from './components/front/shared/services/services.component';
import { QuoteComponent } from './components/front/shared/quote/quote.component';
import { ServicesPlansComponent } from './components/front/services-plans/services-plans.component';
import { WePageComponent } from './components/front/we-page/we-page.component';
import { HireUsComponent } from './components/front/shared/hire-us/hire-us.component';
import { EdwarComponent } from './components/front/profiles/edwar/edwar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SwiperModule } from 'swiper/angular';
import { LastWorksComponent } from './components/front/shared/last-works/last-works.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { MessageValidateFormPipe } from './pipes/message-validate-form.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdrianaComponent } from './components/front/profiles/adriana/adriana.component';
import { ImgSmPipe } from './pipes/img-sm.pipe';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    ContactUsComponent,
    PortfolioComponent,
    WeComponent,
    WePageComponent,
    FooterComponent,
    PlansComponent,
    ServicesComponent,
    QuoteComponent,
    ServicesPlansComponent,
    HireUsComponent,
    EdwarComponent,
    LastWorksComponent,
    AdrianaComponent,
    ImgSmPipe
  ],
  imports: [

    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    NgwWowModule,
    NgbModule,
    SwiperModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({maxOpened:2,closeButton:true,autoDismiss:true, enableHtml: true,timeOut: 4000,positionClass: 'toast-center-center'}),
    HttpClientModule,

  ],
  providers: [
    MessageValidateFormPipe,

  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
