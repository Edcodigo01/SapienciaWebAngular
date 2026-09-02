import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.scss']
})
export class AboutMeComponent {
  private readonly whatsappNumber = '593979072010';

  constructor(
    private readonly deviceService: DeviceDetectorService,
    @Inject(PLATFORM_ID) private readonly platformId: object
  ) { }

  goWhatsapp(event: MouseEvent): void {
    event.preventDefault();

    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const message = encodeURIComponent('Saludos, estoy interesado/a en sus servicios de Sapiencia Web');
    const isMobile = this.deviceService.isMobile() || this.deviceService.isTablet();
    const baseUrl = isMobile
      ? 'https://api.whatsapp.com/send'
      : 'https://web.whatsapp.com/send';

    window.open(`${baseUrl}?phone=${this.whatsappNumber}&text=${message}`, '_blank', 'noopener,noreferrer');
  }
}
