import { isPlatformBrowser } from '@angular/common';
import { Component, ElementRef, HostListener, Inject, OnDestroy, PLATFORM_ID } from '@angular/core';

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
  private touchY: number | null = null;
  private intent = 0;
  private intentDirection = 0;
  private intentAt = 0;
  private exitTimer?: ReturnType<typeof setTimeout>;
  private scrollTimer?: ReturnType<typeof setTimeout>;
  private scrollLockTimer?: ReturnType<typeof setTimeout>;
  private readonly preventScroll = (event: Event): void => event.preventDefault();
  private readonly preventScrollKeys = (event: KeyboardEvent): void => {
    const keys = ['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' '];

    if (keys.includes(event.key)) {
      event.preventDefault();
    }
  };

  constructor(
    @Inject(PLATFORM_ID) private readonly platformId: object,
    private readonly host: ElementRef<HTMLElement>
  ) { }

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
    if (this.scrollLocked) {
      return;
    }

    if (event.isTrusted && event.deltaY !== 0) {
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
    this.touchY = event.touches[0]?.clientY ?? null;
  }

  @HostListener('window:touchmove', ['$event'])
  onTouchMove(event: TouchEvent): void {
    if (this.scrollLocked) {
      return;
    }

    const currentY = event.touches[0]?.clientY;
    const previousY = this.touchY;
    const movesDown = currentY !== undefined && previousY !== null && currentY < previousY;
    const movesUp = currentY !== undefined && previousY !== null && currentY > previousY;
    this.touchY = currentY ?? null;

    if (event.isTrusted && (movesDown || movesUp)) {
      this.userScrollAt = Date.now();

      if (movesDown && this.isAtBottom()) {
        this.addIntent(1);
      } else if (movesUp && this.isAtTop()) {
        this.addIntent(-1);
      }
    }
  }

  @HostListener('window:touchend')
  onTouchEnd(): void {
    this.touchY = null;
  }

  @HostListener('window:scroll')
  onScroll(): void {
    if (!isPlatformBrowser(this.platformId)) {
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

  setTab(tab: string): void {
    if (tab === this.tab) {
      return;
    }

    if (this.exitTimer) {
      clearTimeout(this.exitTimer);
    }

    this.prevTab = this.tab;
    this.tab = tab;

    if (isPlatformBrowser(this.platformId)) {
      this.lockScroll();

      if (this.scrollTimer) {
        clearTimeout(this.scrollTimer);
      }
      window.scrollTo({ top: 0, behavior: 'auto' });
    }

    this.exitTimer = setTimeout(() => {
      this.prevTab = '';
    }, 500);
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

    if (this.scrollTimer) {
      clearTimeout(this.scrollTimer);
    }

    this.unlockScroll();
  }

  private nextPage(): void {
    const nextTab = this.next;

    if (!nextTab) {
      return;
    }

    this.changingTab = true;
    this.lockScroll();
    this.setTab(nextTab);
  }

  private prevPage(): void {
    const prevTab = this.prev;

    if (!prevTab) {
      return;
    }

    this.changingTab = true;
    this.lockScroll();
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

    if (this.intent < 3) {
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

  private lockScroll(): void {
    this.scrollLocked = true;
    this.host.nativeElement.addEventListener('wheel', this.preventScroll, { passive: false, capture: true });
    this.host.nativeElement.addEventListener('touchmove', this.preventScroll, { passive: false, capture: true });
    window.addEventListener('keydown', this.preventScrollKeys);

    if (this.scrollLockTimer) {
      clearTimeout(this.scrollLockTimer);
    }

    this.scrollLockTimer = setTimeout(() => {
      this.unlockScroll();
      this.changingTab = false;
    }, 400);
  }

  private unlockScroll(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.scrollLocked = false;
    this.host.nativeElement.removeEventListener('wheel', this.preventScroll, true);
    this.host.nativeElement.removeEventListener('touchmove', this.preventScroll, true);
    window.removeEventListener('keydown', this.preventScrollKeys);

    if (this.scrollLockTimer) {
      clearTimeout(this.scrollLockTimer);
      this.scrollLockTimer = undefined;
    }
  }
}
