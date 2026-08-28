import { isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  OnDestroy,
  Output,
  PLATFORM_ID,
  ViewChild
} from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements AfterViewInit, OnDestroy {
  @ViewChild('mapa') mapa?: ElementRef<HTMLElement>;
  @Input() active = 'SOBRE MÍ';
  @Input() tabs: string[] = [];
  @Output() tabChange = new EventEmitter<string>();
  navHeight = 100;
  private resizeObserver?: ResizeObserver;

  constructor(
    @Inject(PLATFORM_ID) private readonly platformId: object,
    private readonly changeDetector: ChangeDetectorRef
  ) { }

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId) || !this.mapa) {
      return;
    }

    this.setHeight();
    this.changeDetector.detectChanges();

    if (typeof ResizeObserver !== 'undefined') {
      this.resizeObserver = new ResizeObserver(() => this.setHeight());
      this.resizeObserver.observe(this.mapa.nativeElement);
    }
  }

  select(tab: string): void {
    this.tabChange.emit(tab);
  }

  ngOnDestroy(): void {
    this.resizeObserver?.disconnect();
  }

  private setHeight(): void {
    if (this.mapa) {
      this.navHeight = Math.ceil(this.mapa.nativeElement.getBoundingClientRect().height);
    }
  }
}
