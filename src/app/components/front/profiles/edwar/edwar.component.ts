import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-edwar',
  templateUrl: './edwar.component.html',
  styleUrls: ['./edwar.component.css']
})
export class EdwarComponent implements OnInit {
  constructor(@Inject(PLATFORM_ID) private readonly platformid: any) { }

  goToLink(url: string): void {
    if (isPlatformBrowser(this.platformid)) {
      window.open(url, '_blank');
    }
  }

  ngOnInit(): void {}
}
