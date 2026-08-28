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
    { name: 'Frontend', items: ['Angular', 'Vue.js', 'Bootstrap', 'HTML', 'CSS', 'JavaScript', 'TypeScript'] },
    { name: 'Backend', items: ['NestJS', 'Laravel', 'PHP', 'Node.js'] },
    { name: 'Bases de datos', items: ['PostgreSQL', 'MySQL', 'PGVector', 'Redis'] },
    { name: 'Infraestructura y herramientas', items: ['Docker', 'AWS', 'Git'] },
    { name: 'Comunicación', items: ['WhatsApp', 'Twilio', 'SendGrid'] },
    { name: 'Mapas y geolocalización', items: ['Mapbox', 'Google Maps'] },
    { name: 'Pasarelas de pago', items: ['Stripe', 'Mercado Pago'] }
  ];

  getIcon(technology: string): string {
    const icons: { [key: string]: string } = {
      angular: 'devicon-angularjs-plain', 'vue.js': 'devicon-vuejs-plain', bootstrap: 'devicon-bootstrap-plain',
      html: 'devicon-html5-plain', css: 'devicon-css3-plain', javascript: 'devicon-javascript-plain',
      typescript: 'devicon-typescript-plain', nestjs: 'devicon-nestjs-plain',
      laravel: 'devicon-laravel-plain', 'node.js': 'devicon-nodejs-plain', postgresql: 'devicon-postgresql-plain',
      php: 'devicon-php-plain', mysql: 'devicon-mysql-plain', pgvector: 'fas fa-database', redis: 'devicon-redis-plain',
      docker: 'devicon-docker-plain', aws: 'devicon-amazonwebservices-plain', git: 'devicon-git-plain',
      whatsapp: 'fab fa-whatsapp', twilio: 'fas fa-phone', sendgrid: 'fas fa-envelope',
      mapbox: 'fas fa-map-marked-alt', 'google maps': 'fas fa-map-marker-alt', stripe: 'fas fa-credit-card',
      'mercado pago': 'fas fa-credit-card'
    };
    return icons[technology.toLowerCase()] || 'fas fa-code';
  }
}
