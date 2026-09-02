import { Component } from '@angular/core';

interface TechGroup {
  name: string;
  items: string[];
  textOnly?: boolean;
}

@Component({
  selector: 'app-technologies',
  templateUrl: './technologies.component.html',
  styleUrls: ['./technologies.component.scss']
})
export class TechnologiesComponent {
  groups: TechGroup[] = [
    { name: 'Inteligencia artificial', textOnly: true, items: ['RAG', 'Embeddings', 'Chunking de documentos', 'Integración de LLM', 'Prompt Engineering'] },
    { name: 'Frontend', items: ['Angular', 'TypeScript', 'Vue.js', 'JavaScript', 'HTML', 'CSS', 'Bootstrap'] },
    { name: 'Backend', items: ['Laravel', 'NestJS', 'Node.js', 'Python', 'PHP'] },
    { name: 'Bases de datos', items: ['PostgreSQL', 'MySQL', 'PGVector', 'Redis'] },
    { name: 'Infraestructura y herramientas', items: ['Docker', 'AWS', 'Git'] },
    { name: 'Integraciones', items: ['WhatsApp', 'Twilio', 'SendGrid', 'Stripe', 'Mercado Pago'] },
    { name: 'Mapas y geolocalización', items: ['Mapbox', 'Google Maps'] },
  ];

  getIcon(technology: string): string {
    const icons: { [key: string]: string } = {
      angular: 'devicon-angularjs-plain', 'vue.js': 'devicon-vuejs-plain', bootstrap: 'devicon-bootstrap-plain',
      html: 'devicon-html5-plain', css: 'devicon-css3-plain', javascript: 'devicon-javascript-plain',
      typescript: 'devicon-typescript-plain', nestjs: 'devicon-nestjs-plain',
      laravel: 'devicon-laravel-plain', 'node.js': 'devicon-nodejs-plain', python: 'devicon-python-plain', postgresql: 'devicon-postgresql-plain',
      php: 'devicon-php-plain', mysql: 'devicon-mysql-plain', pgvector: 'fas fa-database', redis: 'devicon-redis-plain',
      docker: 'devicon-docker-plain', aws: 'devicon-amazonwebservices-plain', git: 'devicon-git-plain',
      whatsapp: 'fab fa-whatsapp', twilio: 'fas fa-phone', sendgrid: 'fas fa-envelope',
      mapbox: 'fas fa-map-marked-alt', 'google maps': 'fas fa-map-marker-alt', stripe: 'fas fa-credit-card',
      'mercado pago': 'fas fa-credit-card'
    };
    return icons[technology.toLowerCase()] || 'fas fa-code';
  }
}
