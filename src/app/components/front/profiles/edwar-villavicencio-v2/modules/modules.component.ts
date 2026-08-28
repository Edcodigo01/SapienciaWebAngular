import { Component } from '@angular/core';

@Component({
  selector: 'app-modules',
  templateUrl: './modules.component.html',
  styleUrls: ['./modules.component.scss']
})
export class ModulesComponent {
  modules = [
    'Desarrollo de aplicaciones potenciadas con IA, integrando LLM, RAG, embeddings, búsqueda semántica y automatización de procesos inteligentes.',
    'Optimización de bases de datos y rendimiento, incluyendo consultas para grandes volúmenes de información, filtros, ordenamientos, agrupaciones, paginación, desnormalización, modelado orientado al rendimiento e implementación de caché con Redis.',
    'Desarrollo de arquitecturas multi-tenant, con bases de datos independientes por cliente para mejorar el aislamiento, la seguridad y el rendimiento.',
    'Procesamiento de tareas en segundo plano mediante colas, optimizando el envío masivo de correos electrónicos y la ejecución de procesos por lotes.',
    'Programación de tareas automáticas (Cron Jobs) para la ejecución de procesos periódicos.',
    'Diseño y desarrollo de interfaces web modernas, responsivas e interactivas, enfocadas en usabilidad y experiencia de usuario, incluyendo agendas, drag & drop, agrupación de elementos y componentes visuales avanzados.',
    'Optimización del rendimiento de aplicaciones web, identificando y corrigiendo cuellos de botella en JavaScript, renderizado de componentes y procesamiento del lado del cliente.',
    'Despliegue y administración de aplicaciones en servidores Linux (VPS), utilizando Docker, Nginx y herramientas de administración para entornos de producción.',
    'Desarrollo de mapas interactivos mediante Google Maps, Mapbox y tecnologías similares, con geolocalización, rutas, marcadores dinámicos, arrastre de elementos y visualización de recorridos.',
    'Planificación y optimización de rutas de vehículos, con cálculo automático de recorridos, optimización por distancia y tiempo, agrupación por zonas, ordenamiento de paradas, reasignación entre vehículos y restricciones horarias.',
    'Desarrollo de sistemas de facturación e inventario, con gestión de facturas, notas de crédito y débito, compras, ventas, inventario, cuentas por cobrar y pagar, entre otras funcionalidades orientadas a la gestión empresarial.',
    'Implementación de módulos de conversión de voz a texto para automatizar el procesamiento de contenido de audio.',
    'Integración de servicios de comunicación, incluyendo SMS (Twilio), WhatsApp, correo electrónico, recordatorios, plantillas de WhatsApp, chats, notificaciones y mensajería en tiempo real mediante WebSockets, Node.js o servicios de terceros.',
    'Integración con APIs de terceros y Webhooks, incluyendo WhatsApp, servicios de identificación, información geográfica, clima, sincronización de datos y automatización de procesos.',
    'Integración con pasarelas de pago, incluyendo Mercado Pago, PayPal, Stripe y otros proveedores.',
    'Integración con servicios gubernamentales, incluyendo consultas al SRI, generación de XML y firma electrónica de documentos.',
    'Integración y gestión de almacenamiento de archivos en servidores locales y plataformas en la nube, incluyendo AWS S3, MinIO y servicios compatibles.',
    'Generación dinámica de documentos personalizados, incorporando logos, datos fiscales, tablas, códigos de barras y otros elementos en formatos PDF, CSV y similares.',
    'Desarrollo de módulos de reportes y dashboards, incluyendo ventas, compras, impuestos, ganancias, inventario e indicadores del negocio mediante gráficos estadísticos.',
    'Desarrollo de arquitecturas backend escalables, aplicando principios de modularidad, mantenibilidad, desacoplamiento y alto rendimiento.',
    'Implementación de sistemas de roles y permisos, con control de acceso granular según perfiles y funcionalidades.'
  ];
}
