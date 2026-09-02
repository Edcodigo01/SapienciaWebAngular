import { isPlatformBrowser } from '@angular/common';
import { Component, HostListener, Inject, OnDestroy, PLATFORM_ID } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-edwar-villavicencio-v2',
  templateUrl: './edwar-villavicencio-v2.component.html',
  styleUrls: ['./edwar-villavicencio-v2.component.scss']
})
export class EdwarVillavicencioV2Component implements OnDestroy {
  tabs = [
    'SOBRE MÍ',
    'PROYECTOS RECIENTES',
    'MÓDULOS DESARROLLADOS',
    'EXPERIENCIA',
    'FORMACIÓN',
    'TECNOLOGÍAS'
  ];
  tab = 'SOBRE MÍ';
  prevTab = '';
  private prevScrollY = 0;
  private userScrollAt = 0;
  private changingTab = false;
  private scrollLocked = false;
  private readonly allowScrollTabChange: boolean;
  private touchY: number | null = null;
  private touchX: number | null = null;
  private touchDirection = 0;
  private intent = 0;
  private intentDirection = 0;
  private intentAt = 0;
  private readonly transitionTime = 500;
  private exitTimer?: ReturnType<typeof setTimeout>;
  private scrollFrame?: number;
  private readonly preventScroll = (event: Event): void => event.preventDefault();
  private readonly preventScrollKeys = (event: KeyboardEvent): void => {
    const keys = ['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' '];

    if (keys.includes(event.key)) {
      event.preventDefault();
    }
  };

  constructor(
    @Inject(PLATFORM_ID) private readonly platformId: object,
    deviceService: DeviceDetectorService
  ) {
    this.allowScrollTabChange = isPlatformBrowser(this.platformId) && deviceService.isDesktop();
  }

  get prev(): string | null {
    const index = this.tabs.indexOf(this.tab);
    return index > 0 ? this.tabs[index - 1] : null;
  }

  get next(): string | null {
    const index = this.tabs.indexOf(this.tab);
    return index >= 0 && index < this.tabs.length - 1 ? this.tabs[index + 1] : null;
  }

  @HostListener('window:wheel', ['$event'])
  onWheel(event: WheelEvent): void {
    if (!this.allowScrollTabChange || this.scrollLocked) {
      return;
    }

    const isVertical = Math.abs(event.deltaY) >= Math.abs(event.deltaX) && event.deltaY !== 0;

    if (event.isTrusted && isVertical) {
      this.userScrollAt = Date.now();

      if (event.deltaY > 0 && this.isAtBottom()) {
        this.addIntent(1);
      } else if (event.deltaY < 0 && this.isAtTop()) {
        this.addIntent(-1);
      }
    }
  }

  @HostListener('window:touchstart', ['$event'])
  onTouchStart(event: TouchEvent): void {
    if (!this.allowScrollTabChange) {
      return;
    }

    this.touchY = event.touches[0]?.clientY ?? null;
    this.touchX = event.touches[0]?.clientX ?? null;
    this.touchDirection = 0;
  }

  @HostListener('window:touchmove', ['$event'])
  onTouchMove(event: TouchEvent): void {
    if (!this.allowScrollTabChange || this.scrollLocked) {
      return;
    }

    const currentY = event.touches[0]?.clientY;
    const currentX = event.touches[0]?.clientX;
    const previousY = this.touchY;
    const previousX = this.touchX;
    const movesDown = currentY !== undefined && previousY !== null && currentY < previousY;
    const movesUp = currentY !== undefined && previousY !== null && currentY > previousY;
    const isVertical = currentX !== undefined && previousX !== null
      ? Math.abs(currentY! - previousY!) >= Math.abs(currentX - previousX)
      : true;
    this.touchY = currentY ?? null;
    this.touchX = currentX ?? null;

    if (event.isTrusted && isVertical && (movesDown || movesUp)) {
      this.userScrollAt = Date.now();
      this.touchDirection = movesDown ? 1 : -1;
    }
  }

  @HostListener('window:touchend')
  onTouchEnd(): void {
    if (this.allowScrollTabChange && this.touchDirection !== 0) {
      if (this.touchDirection > 0 && this.isAtBottom()) {
        this.addIntent(1);
      } else if (this.touchDirection < 0 && this.isAtTop()) {
        this.addIntent(-1);
      }
    }

    this.touchY = null;
    this.touchX = null;
    this.touchDirection = 0;
  }

  @HostListener('window:scroll')
  onScroll(): void {
    if (!this.allowScrollTabChange) {
      return;
    }

    const currentScrollY = window.scrollY;
    const movedDown = currentScrollY > this.prevScrollY;
    const isHumanScroll = Date.now() - this.userScrollAt <= 500;
    this.prevScrollY = currentScrollY;

    if (this.changingTab || !movedDown || !isHumanScroll) {
      return;
    }

    if (this.isAtTop()) {
      this.resetIntent();
    }
  }

  setTab(tab: string, lockDuringChange = false): void {
    if (tab === this.tab) {
      return;
    }

    if (this.exitTimer) {
      clearTimeout(this.exitTimer);
    }

    this.prevTab = this.tab;
    this.tab = tab;

    if (isPlatformBrowser(this.platformId)) {
      if (lockDuringChange) {
        this.lockScroll();
      }
      this.scrollToTop();
    }

    this.exitTimer = setTimeout(() => {
      this.prevTab = '';
      window.scrollTo({ top: 0, behavior: 'auto' });
      this.prevScrollY = 0;
      this.changingTab = false;
      this.unlockScroll();
    }, this.transitionTime);
  }

  goNext(): void {
    const nextTab = this.next;

    if (nextTab) {
      this.setTab(nextTab);
    }
  }

  ngOnDestroy(): void {
    if (this.exitTimer) {
      clearTimeout(this.exitTimer);
    }

    if (isPlatformBrowser(this.platformId) && this.scrollFrame !== undefined) {
      cancelAnimationFrame(this.scrollFrame);
    }

    this.unlockScroll();
  }

  private nextPage(): void {
    const nextTab = this.next;

    if (!nextTab) {
      return;
    }

    this.changingTab = true;
    this.setTab(nextTab, true);
  }

  private prevPage(): void {
    const prevTab = this.prev;

    if (!prevTab) {
      return;
    }

    this.changingTab = true;
    this.setTab(prevTab);
  }

  private isAtTop(): boolean {
    return isPlatformBrowser(this.platformId) && window.scrollY <= 2;
  }

  private isAtBottom(): boolean {
    if (!isPlatformBrowser(this.platformId)) {
      return false;
    }

    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    return maxScroll > 0 && window.scrollY >= maxScroll - 2;
  }

  private addIntent(direction: number): void {
    const now = Date.now();

    if (this.intentDirection !== direction || now - this.intentAt > 600) {
      this.intent = 0;
    }

    this.intentDirection = direction;
    this.intentAt = now;
    this.intent += 1;

    if (this.intent < 4) {
      return;
    }

    this.resetIntent();

    if (direction > 0) {
      this.nextPage();
    } else {
      this.prevPage();
    }
  }

  private resetIntent(): void {
    this.intent = 0;
    this.intentDirection = 0;
    this.intentAt = 0;
  }

  private scrollToTop(): void {
    const start = window.scrollY;
    const startedAt = performance.now();

    if (this.scrollFrame !== undefined) {
      cancelAnimationFrame(this.scrollFrame);
    }

    const move = (time: number): void => {
      const progress = Math.min((time - startedAt) / this.transitionTime, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      window.scrollTo(0, Math.round(start * (1 - eased)));

      if (progress < 1) {
        this.scrollFrame = requestAnimationFrame(move);
      } else {
        this.scrollFrame = undefined;
      }
    };

    this.scrollFrame = requestAnimationFrame(move);
  }

  private lockScroll(): void {
    this.scrollLocked = true;
    window.addEventListener('wheel', this.preventScroll, { passive: false, capture: true });
    window.addEventListener('touchmove', this.preventScroll, { passive: false, capture: true });
    window.addEventListener('keydown', this.preventScrollKeys);
  }

  private unlockScroll(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.scrollLocked = false;
    window.removeEventListener('wheel', this.preventScroll, true);
    window.removeEventListener('touchmove', this.preventScroll, true);
    window.removeEventListener('keydown', this.preventScrollKeys);
  }
}
