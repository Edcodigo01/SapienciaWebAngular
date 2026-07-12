import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { isPlatformBrowser } from '@angular/common';
import {
  Component,
  HostListener,
  Inject,
  Input,
  OnInit,
  PLATFORM_ID,
  ViewChild,
} from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import worksEdwar from 'src/app/data-json/works-edwar.json';
import worksSap from 'src/app/data-json/works-sap.json';

@Component({
  selector: 'app-last-works',
  templateUrl: './last-works.component.html',
  styleUrls: ['./last-works.component.css'],
})
export class LastWorksComponent implements OnInit {
  @Input() worksOf: string;
  works: any;
  selected: any;
  selectedVideoUrl: string;
  selectedVideoEmbedUrl: SafeResourceUrl | null = null;
  technologyImages = new Set([
    'ajax.jpg',
    'angular.jpg',
    'apache.jpg',
    'bootstrap.jpg',
    'css.jpg',
    'docker.jpg',
    'git.png',
    'html.jpg',
    'javascript.jpg',
    'jquery.jpg',
    'js.jpg',
    'laravel.jpg',
    'mysql.jpg',
    'nestjs.jpg',
    'nodejs.jpg',
    'php.jpg',
    'postgres.jpg',
    'pg-vector.jpg',
    'python.jpg',
    'redis.jpg',
    'typescript.jpg',
    'vue.png',
  ]);
  technologyImageMap: { [key: string]: string } = {
    pgvector: 'pg-vector.jpg',
    redis: 'redis.jpg',
  };
  @ViewChild('modalWork') modalWork: any;
  @ViewChild('modalVideo') modalVideo: any;
  constructor(
    private modalS: NgbModal,
    private sanitizer: DomSanitizer,
    @Inject(PLATFORM_ID) private platformid: any
  ) {}

  ngOnInit(): void {
    if (this.worksOf == 'Edwar') this.works = worksEdwar.works;
    else this.works = worksSap.works;
  }

  location() {
    if (isPlatformBrowser(this.platformid)) {
      return window.location.href;
    } else {
      return '';
    }
  }

  openModal(name: string) {
    let select = this.works.filter((x: any) => x.name === name);
    this.selected = select[0];
    this.modalS.open(this.modalWork, { ariaLabelledBy: 'modal-basic-title' });
  }

  openVideoModal(videoUrl: string) {
    this.selectedVideoUrl = videoUrl;
    this.selectedVideoEmbedUrl = this.buildYoutubeEmbedUrl(videoUrl);
    this.modalS.open(this.modalVideo, {
      ariaLabelledBy: 'modal-video-title',
    });
  }

  buildYoutubeEmbedUrl(videoUrl: string): SafeResourceUrl | null {
    if (!videoUrl) {
      return null;
    }

    const shortUrlMatch = videoUrl.match(/youtu\.be\/([^?&]+)/);
    const longUrlMatch = videoUrl.match(/[?&]v=([^&]+)/);
    const embedUrlMatch = videoUrl.match(/youtube\.com\/embed\/([^?&]+)/);
    const videoId =
      shortUrlMatch?.[1] || longUrlMatch?.[1] || embedUrlMatch?.[1] || null;

    if (!videoId) {
      return null;
    }

    return this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.youtube.com/embed/${videoId}?rel=0`
    );
  }

  orderInverse(array: any) {
    array = array
      .map((item: any, index: any) => {
        return { value: item, index };
      })
      .sort((a: any, b: any) => b.index - a.index)
      .map((item: any) => {
        return item.value;
      });
    // console.log(array);
    if (array.includes('nodejs.png')) {
    }
    return array;
  }

  technologiesForCard(
    technologies: string[] = [],
    otherTechnologies: string[] = []
  ) {
    if (!Array.isArray(technologies)) {
      return [];
    }

    return technologies.slice(0, 6);
  }

  hasMoreTechnologies(
    technologies: string[] = [],
    otherTechnologies: string[] = []
  ) {
    const mainCount = Array.isArray(technologies) ? technologies.length : 0;
    const otherCount = Array.isArray(otherTechnologies)
      ? otherTechnologies.length
      : 0;

    return mainCount + otherCount > 6;
  }

  technologyLabel(techno: string) {
    const base = (techno || '').split('.')[0].toLowerCase();
    const labels: { [key: string]: string } = {
      ajax: 'AJAX',
      angular: 'Angular',
      apache: 'Apache',
      bootstrap: 'Bootstrap',
      css: 'CSS',
      docker: 'Docker',
      git: 'Git',
      html: 'HTML',
      javascript: 'JavaScript',
      jquery: 'jQuery',
      js: 'JavaScript',
      laravel: 'Laravel',
      mysql: 'MySQL',
      nestjs: 'NestJS',
      nodejs: 'Node.js',
      php: 'PHP',
      pgvector: 'PGVector',
      postgres: 'PostgreSQL',
      redis: 'Redis',
      langchain: 'LangChain',
      langgraph: 'LangGraph',
      typescript: 'TypeScript',
      vue: 'Vue',
    };

    return labels[base] || base;
  }

  hasTechnologyImage(techno: string) {
    return this.technologyImages.has(techno) || !!this.technologyImageMap[techno];
  }

  technologyImage(techno: string) {
    return this.technologyImageMap[techno] || techno;
  }
}
