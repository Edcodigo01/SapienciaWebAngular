import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Component, ElementRef, TemplateRef, ViewChild } from '@angular/core';
import works from '../../../../../data-json/works-edwar.json';

interface Project {
  name: string;
  link?: string;
  link_demo?: string;
  video_url?: string;
  description: string;
  description_lg?: string[];
  images: string[];
  features?: string[];
  technologies: string[];
  other_technologies?: string[];
  other_version?: string[];
}

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent {
  @ViewChild('modalVideo') modalVideo?: TemplateRef<any>;
  @ViewChild('modalImage') modalImage?: TemplateRef<any>;
  @ViewChild('topCarousel') topCarousel?: ElementRef<HTMLElement>;
  private imageModalRef?: NgbModalRef;
  projects: Project[] = works.works;
  selectedIndex = 0;
  imageIndex = 0;
  selectedVideoEmbedUrl: SafeResourceUrl | null = null;
  private dragging = false;
  private dragStartX = 0;
  private dragStartScroll = 0;
  private touchStartX: number | null = null;

  constructor(private modal: NgbModal, private sanitizer: DomSanitizer) {}

  get selected(): Project {
    return this.projects[this.selectedIndex];
  }

  get selectedDescription(): string {
    return this.selected.description_lg?.join(' ') || this.selected.description;
  }

  get prevProject(): Project | null {
    return this.selectedIndex > 0 ? this.projects[this.selectedIndex - 1] : null;
  }

  get nextProject(): Project | null {
    return this.selectedIndex < this.projects.length - 1 ? this.projects[this.selectedIndex + 1] : null;
  }

  get visibleProjects(): Project[] {
    const start = Math.min(
      Math.max(this.selectedIndex - 1, 0),
      Math.max(this.projects.length - 2, 0)
    );

    return this.projects.slice(start, start + 3);
  }

  select(project: Project): void {
    const index = this.projects.indexOf(project);
    if (index === this.selectedIndex) {
      return;
    }

    this.selectedIndex = index;
    this.imageIndex = 0;
    this.scrollTop();
  }

  previous(): void {
    if (this.selectedIndex > 0) {
      this.selectedIndex -= 1;
      this.imageIndex = 0;
      this.scrollTop();
    }
  }

  next(): void {
    if (this.selectedIndex < this.projects.length - 1) {
      this.selectedIndex += 1;
      this.imageIndex = 0;
      this.scrollTop();
    }
  }

  startDrag(event: MouseEvent): void {
    if (event.button !== 0 || !this.topCarousel) {
      return;
    }

    this.dragging = true;
    this.dragStartX = event.clientX;
    this.dragStartScroll = this.topCarousel.nativeElement.scrollLeft;
  }

  drag(event: MouseEvent): void {
    if (!this.dragging || !this.topCarousel) {
      return;
    }

    event.preventDefault();
    const distance = event.clientX - this.dragStartX;
    this.topCarousel.nativeElement.scrollLeft = this.dragStartScroll - distance;
  }

  endDrag(): void {
    this.dragging = false;
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

    if (Math.abs(distance) < 30) {
      return;
    }

    if (distance < 0) {
      this.next();
    } else {
      this.previous();
    }
  }

  openVideo(): void {
    if (!this.selected.video_url || !this.modalVideo) {
      return;
    }

    if (this.imageModalRef) {
      this.imageModalRef.close();
      this.imageModalRef = undefined;
    }

    this.selectedVideoEmbedUrl = this.youtubeUrl(this.selected.video_url);
    this.modal.open(this.modalVideo, {
      ariaLabelledBy: 'video-title',
      centered: true,
      size: 'xl',
      windowClass: 'video-modal-window'
    });
  }

  openImage(): void {
    if (!this.modalImage || !this.selected.images.length) {
      return;
    }

    this.imageModalRef = this.modal.open(this.modalImage, {
      ariaLabelledBy: 'image-title',
      centered: true,
      size: 'xl',
      windowClass: 'image-modal-window'
    });

    this.imageModalRef.result.finally(() => {
      this.imageModalRef = undefined;
    });
  }

  private youtubeUrl(url: string): SafeResourceUrl | null {
    const short = url.match(/youtu\.be\/([^?&]+)/);
    const long = url.match(/[?&]v=([^&]+)/);
    const embed = url.match(/youtube\.com\/embed\/([^?&]+)/);
    const id = short?.[1] || long?.[1] || embed?.[1];

    return id
      ? this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${id}?rel=0`)
      : null;
  }

  getIcon(technology: string): string {
    switch (technology.toLowerCase()) {
      case 'angular.jpg': return 'devicon-angularjs-plain colored';
      case 'nestjs.jpg': return 'devicon-nestjs-plain colored';
      case 'laravel.jpg': return 'devicon-laravel-plain colored';
      case 'mysql.jpg': return 'devicon-mysql-plain colored';
      case 'postgres.jpg': return 'devicon-postgresql-plain colored';
      case 'docker.jpg': return 'devicon-docker-plain colored';
      case 'vue.png': return 'devicon-vuejs-plain colored';
      case 'bootstrap.jpg': return 'devicon-bootstrap-plain colored';
      case 'css.jpg': return 'devicon-css3-plain colored';
      case 'javascript.jpg': return 'devicon-javascript-plain colored';
      case 'nodejs.jpg': return 'devicon-nodejs-plain colored';
      case 'python': return 'devicon-python-plain colored';
      case 'git.png': return 'devicon-git-plain colored';
      case 'aws':
      case 'aws.jpg': return 'devicon-amazonwebservices-plain colored';
      case 'whatsapp': return 'fab fa-whatsapp';
      case 'twilio': return 'fas fa-phone';
      case 'sendgrid': return 'fas fa-envelope';
      case 'stripe': return 'fas fa-credit-card';
      case 'mapbox': return 'fas fa-map-marked-alt';
      case 'google maps': return 'fas fa-map-marker-alt';
      case 'mercado pago': return 'fas fa-credit-card';
      case 'redis':
      case 'redis.jpg': return 'devicon-redis-plain colored';
      case 'rag':
      case 'embeddings':
      case 'chunking de documentos':
      case 'integración de llm':
      case 'prompt engineering': return 'fas fa-brain';
      default: return 'fas fa-code';
    }
  }

  getName(technology: string): string {
    const name = technology.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' ').toLowerCase();
    const names: { [key: string]: string } = {
      nestjs: 'NestJS',
      nodejs: 'Node.js',
      postgres: 'PostgreSQL',
      pgvector: 'PGVector',
      angular: 'Angular',
      mysql: 'MySQL',
      vue: 'Vue.js',
      css: 'CSS',
      javascript: 'JavaScript',
      redis: 'Redis',
      git: 'Git',
      rag: 'RAG',
      embeddings: 'Embeddings',
      'prompt engineering': 'Prompt Engineering',
      'integración de llm': 'Integración de LLM'
    };

    return names[name] || name.charAt(0).toUpperCase() + name.slice(1);
  }

  getTitle(name: string): string {
    return name.replace(/\.(com|net|org|io|co)(?=\s|\(|$)/gi, '');
  }

  private scrollTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
