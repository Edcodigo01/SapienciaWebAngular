import { Component } from '@angular/core';

interface Experience {
  title: string;
  company: string;
  period: string;
  place: string;
  description: string;
  technologies: string[];
  link: string;
}

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss']
})
export class ExperienceComponent {
  experiences: Experience[] = [
    {
      title: 'Programador full stack',
      company: 'SOFTDEVEL CIA · Jornada completa',
      period: 'abr. 2025 - jun. 2026 · 1 año 3 meses',
      place: 'Quito, Pichincha, Ecuador · En remoto',
      description: 'Desarrollo de soluciones para PrimeFyre, plataforma multi-tenant especializada en la planificación y optimización de rutas para operaciones de campo. Diseño, implementación y optimización de funcionalidades para el procesamiento de grandes volúmenes de datos, consultas de alto rendimiento, mapas interactivos, generación y visualización de rutas, envío masivo de correos electrónicos, mensajería SMS, generación de reportes e integración con APIs y servicios de terceros.',
      technologies: ['Laravel', 'MySQL', 'Docker', 'Vue.js', 'Bootstrap', 'CSS', 'Redis', 'Git', 'AWS', 'WhatsApp', 'Twilio', 'SendGrid', 'Mapbox', 'Google Maps', 'Stripe'],
      link: 'https://www.linkedin.com/in/edwar-villavicencio-876155226/edit/forms/position/2949848900/'
    },
    {
      title: 'Programador full stack',
      company: 'KeoTecnología · Jornada parcial',
      period: 'oct. 2023 - mar. 2025 · 1 año 6 meses',
      place: 'Chile · En remoto',
      description: 'Desarrollo de aplicaciones web y sistemas de gestión, incluyendo agendas, plataformas web, redes sociales, chats con comunicación en tiempo real e interfaces de usuario. Implementación de funcionalidades frontend y backend, diseño de bases de datos e integración de servicios.',
      technologies: ['Node.js', 'PostgreSQL', 'Docker', 'Angular', 'Bootstrap', 'CSS', 'Git', 'AWS', 'WhatsApp', 'Stripe', 'Mercado Pago'],
      link: 'https://www.linkedin.com/in/edwar-villavicencio-876155226/edit/forms/position/2516712105/'
    },
    {
      title: 'Programador full stack',
      company: 'GLOBONET MEDIA · Jornada completa',
      period: 'sept. 2021 - ago. 2023 · 2 años',
      place: 'Quito · Híbrido',
      description: 'Desarrollador Backend y Frontend responsable del desarrollo, mantenimiento y evolución de aplicaciones web, principalmente sistemas de facturación. Implementación de nuevas funcionalidades, optimización del rendimiento y resolución de incidencias.',
      technologies: ['Laravel', 'MySQL', 'Vue.js', 'Bootstrap', 'CSS', 'Git', 'Twilio', 'SendGrid', 'Emails masivos', 'WhatsApp', 'PHP', 'Docker', 'Redis', 'REST APIs'],
      link: 'https://www.linkedin.com/in/edwar-villavicencio-876155226/edit/forms/position/2142143095/'
    },
    {
      title: 'Programador full stack',
      company: 'Sapiencia web · Autónomo',
      period: 'jul. 2020 - ago. 2021 · 1 año 2 meses',
      place: 'Quito, Pichincha, Ecuador',
      description: 'Programador Backend y Frontend encargado del desarrollo de sistemas de información y páginas web.',
      technologies: ['Laravel', 'PHP', 'MySQL', 'JavaScript', 'Angular', 'HTML', 'CSS', 'Bootstrap'],
      link: 'https://www.linkedin.com/in/edwar-villavicencio-876155226/edit/forms/position/1873046392/'
    },
    {
      title: 'Programador full-stack / Servicio técnico de equipos de computación',
      company: 'CRIVADRON.COM · Jornada completa',
      period: 'oct. 2018 - jun. 2020 · 1 año 9 meses',
      place: 'Quito, Pichincha, Ecuador · Presencial',
      description: 'Desarrollo de sistemas de información y páginas web. Servicio técnico de equipos de computación.',
      technologies: ['Laravel', 'PHP', 'MySQL', 'JavaScript', 'jQuery', 'HTML', 'CSS', 'Bootstrap'],
      link: 'https://www.linkedin.com/in/edwar-villavicencio-876155226/edit/forms/position/1873053077/'
    }
  ];

  getIcon(technology: string): string {
    const name = technology.toLowerCase();
    const icons: { [key: string]: string } = {
      laravel: 'devicon-laravel-plain colored', mysql: 'devicon-mysql-plain colored',
      php: 'devicon-php-plain colored',
      docker: 'devicon-docker-plain colored', 'node.js': 'devicon-nodejs-plain colored',
      postgresql: 'devicon-postgresql-plain colored', 'vue.js': 'devicon-vuejs-plain colored',
      bootstrap: 'devicon-bootstrap-plain colored', css: 'devicon-css3-plain colored',
      redis: 'devicon-redis-plain colored', git: 'devicon-git-plain colored',
      aws: 'devicon-amazonwebservices-plain colored', whatsapp: 'fab fa-whatsapp',
      twilio: 'fas fa-phone', sendgrid: 'fas fa-envelope', 'emails masivos': 'fas fa-envelope-open-text',
      mapbox: 'fas fa-map-marked-alt',
      'google maps': 'fas fa-map-marker-alt', stripe: 'fas fa-credit-card', 'mercado pago': 'fas fa-credit-card'
    };
    return icons[name] || 'fas fa-code';
  }
}
