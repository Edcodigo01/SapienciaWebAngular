import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-project-gallery',
  templateUrl: './project-gallery.component.html',
  styleUrls: ['./project-gallery.component.scss']
})
export class ProjectGalleryComponent {
  @Input() images: string[] = [];
  @Input() index = 0;
  @Input() cacheKey = '';
  @Input() showVideo = false;
  @Input() showExpand = false;
  @Input() large = false;
  @Output() indexChange = new EventEmitter<number>();
  @Output() videoClick = new EventEmitter<void>();
  @Output() expandClick = new EventEmitter<void>();

  private touchStartX: number | null = null;
  private mouseStartX: number | null = null;

  get imageUrl(): string {
    if (!this.images.length) {
      return '';
    }

    const imageIndex = this.index % this.images.length;
    return this.cacheKey
      ? `${this.images[imageIndex]}?${this.cacheKey}&image=${imageIndex}`
      : this.images[imageIndex];
  }

  previous(): void {
    if (this.images.length < 2) {
      return;
    }
    this.setIndex(this.index > 0 ? this.index - 1 : this.images.length - 1);
  }

  next(): void {
    if (this.images.length < 2) {
      return;
    }
    this.setIndex((this.index + 1) % this.images.length);
  }

  startTouch(event: TouchEvent): void {
    this.touchStartX = event.touches[0]?.clientX ?? null;
  }

  endTouch(event: TouchEvent): void {
    if (this.touchStartX === null) {
      return;
    }
    const endX = event.changedTouches[0]?.clientX;
    const distance = endX === undefined ? 0 : endX - this.touchStartX;
    this.touchStartX = null;
    this.swipe(distance);
  }

  startDrag(event: MouseEvent): void {
    if (event.button === 0) {
      this.mouseStartX = event.clientX;
    }
  }

  endDrag(event: MouseEvent): void {
    if (this.mouseStartX === null) {
      return;
    }
    const distance = event.clientX - this.mouseStartX;
    this.mouseStartX = null;
    this.swipe(distance);
  }

  private swipe(distance: number): void {
    if (Math.abs(distance) < 30) {
      return;
    }
    distance < 0 ? this.next() : this.previous();
  }

  private setIndex(index: number): void {
    this.index = index;
    this.indexChange.emit(index);
  }
}
