# Estructura VPS y Despliegues

## Resumen

Este documento resume la estructura actual del VPS en Amazon Lightsail, los dominios publicados, los contenedores involucrados y la forma de desplegar cada proyecto sin afectar los demas.

## Datos base del VPS

- Proveedor: Amazon Lightsail
- Sistema operativo: Ubuntu 22.04.5 LTS
- Kernel: Linux 6.8.0-1051-aws
- Tipo de instancia: `t3.small`

## Estructura actual del VPS

```text
/opt/apps
├── docker
├── nginx
│   ├── docker-compose.yml
│   └── conf.d/
│       ├── 2v.conf
│       ├── sapienciaweb.com.conf
│       └── asistente-ia.sapienciaweb.com.conf
├── projects
│   ├── 2v-update-17-5-2026
│   │   ├── docker-compose.yml
│   │   ├── docker/
│   │   │   ├── nginx/default.conf
│   │   │   └── php/
│   │   ├── app/
│   │   ├── public/
│   │   ├── resources/
│   │   ├── routes/
│   │   ├── storage/
│   │   ├── vendor/
│   │   └── .env
│   ├── sapienciaweb-angular
│   │   ├── Dockerfile
│   │   ├── compose.yaml
│   │   ├── dist/
│   │   ├── deploy/
│   │   │   └── nginx/default.conf
│   │   ├── angular.json
│   │   ├── package.json
│   │   └── src/
│   └── ai-assistant
│       ├── compose.yaml
│       ├── compose.backend-only.yaml
│       ├── frontend/
│       │   ├── Dockerfile
│       │   ├── deploy/nginx/default.conf
│       │   └── src/
│       ├── backend/
│       │   ├── Dockerfile
│       │   ├── .env.prod
│       │   └── app/
│       └── deploy/
│           ├── nginx/ai-assistant.internal.conf
│           └── vps/asistente-ia.sapienciaweb.com.conf
└── shared
    ├── laravel-app/mysql-data
    ├── logs/nginx
    └── www/.well-known
```

## Arquitectura general

```text
Internet
   │
   ▼
main-nginx
(80/443)
   │
   ├── 2v-soluciones.com -> two_v_web_vps -> two_v_app_vps -> 2v-laravel-db
   ├── sapienciaweb.com -> sapiencia_web_vps
   └── asistente-ia.sapienciaweb.com -> ai_assistant_web_vps
                                      -> /api/ -> ai_assistant_api_vps
                                                 -> ai_assistant_db_vps
                                                 -> ai_assistant_redis_vps
```

## Contenedores

| Contenedor | Funcion |
| --- | --- |
| `main-nginx` | Reverse proxy publico de todos los dominios |
| `two_v_web_vps` | Nginx del proyecto Laravel |
| `two_v_app_vps` | PHP-FPM del proyecto Laravel |
| `2v-laravel-db` | MySQL 8 de `2v-soluciones.com` |
| `sapiencia_web_vps` | Frontend Angular de `sapienciaweb.com` |
| `ai_assistant_web_vps` | Frontend Angular estatico de `asistente-ia.sapienciaweb.com` |
| `ai_assistant_api_vps` | Backend Python/FastAPI |
| `ai_assistant_db_vps` | PostgreSQL con pgvector |
| `ai_assistant_redis_vps` | Redis |

## Redes Docker

- `proxy`: red externa compartida entre `main-nginx` y los contenedores web o API publicados.
- `internal`: red privada del proyecto Laravel.
- `ai-assistant_internal`: red privada del proyecto `ai-assistant`.

## Nginx principal del VPS

Ruta:

`/opt/apps/nginx/docker-compose.yml`

Contenido actual esperado:

```yaml
services:
  nginx:
    image: nginx:alpine
    container_name: main-nginx
    restart: always
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./conf.d:/etc/nginx/conf.d
      - ../shared/www:/usr/share/nginx/html
      - ../shared/logs/nginx:/var/log/nginx
      - /etc/letsencrypt:/etc/letsencrypt:ro
    networks:
      - proxy

networks:
  proxy:
    external: true
```

## Certificados SSL

- Los certificados se montan desde `/etc/letsencrypt`.
- El reto de Let's Encrypt usa `/opt/apps/shared/www/.well-known/acme-challenge`.
- Antes de pedir un certificado nuevo, el vhost HTTP debe tener este bloque:

```nginx
location ^~ /.well-known/acme-challenge/ {
    root /usr/share/nginx/html;
    default_type "text/plain";
    try_files $uri =404;
}
```

## Proyecto 1: 2v-soluciones.com

### Ruta

`/opt/apps/projects/2v-update-17-5-2026`

### Stack

- Laravel
- Nginx interno
- PHP-FPM
- MySQL 8

### Despliegue

```bash
cd /opt/apps/projects/2v-update-17-5-2026
docker compose up -d --build
```

### Publicacion

- Dominio: `2v-soluciones.com`
- WWW: `www.2v-soluciones.com`
- Vhost principal: `/opt/apps/nginx/conf.d/2v.conf`

## Proyecto 2: sapienciaweb.com

### Ruta

`/opt/apps/projects/sapienciaweb-angular`

### Stack

- Angular compilado
- Nginx dentro del contenedor
- Publicado a traves de `main-nginx`

### Contenedor

- `sapiencia_web_vps`

### Dockerfile usado

```dockerfile
FROM nginx:1.27-alpine

COPY deploy/nginx/default.conf /etc/nginx/conf.d/default.conf
COPY dist/sapAngular/browser /usr/share/nginx/html

EXPOSE 80
```

### Docker Compose

```yaml
services:
  sapiencia_web_vps:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: sapiencia_web_vps
    restart: unless-stopped
    networks:
      - proxy

networks:
  proxy:
    external: true
```

### Despliegue

```bash
cd /home/eavc531/apps_dev/SapienciaWebAngular
npm install
npm run build
```

```bash
rsync -avz --progress \
  --exclude '.git' \
  --exclude 'node_modules' \
  --exclude '.angular' \
  -e "ssh -i /home/eavc531/.ssh/LightsailDefaultKey-us-east-1.pem" \
  /home/eavc531/apps_dev/SapienciaWebAngular/ \
  ubuntu@32.196.146.120:/opt/apps/projects/sapienciaweb-angular/
```

```bash
cd /opt/apps/projects/sapienciaweb-angular
docker compose up -d --build
```

### Nota operativa

- El VPS ya no debe compilar Angular.
- Si el frontend cambia, primero recompila en local y luego sincroniza `dist`.

### Vhost principal

Ruta:

`/opt/apps/nginx/conf.d/sapienciaweb.com.conf`

Configuracion final esperada:

```nginx
server {
    listen 80;
    server_name sapienciaweb.com www.sapienciaweb.com;

    location ^~ /.well-known/acme-challenge/ {
        root /usr/share/nginx/html;
        default_type "text/plain";
        try_files $uri =404;
    }

    location / {
        return 301 https://$host$request_uri;
    }
}

server {
    listen 443 ssl http2;
    server_name sapienciaweb.com www.sapienciaweb.com;

    ssl_certificate /etc/letsencrypt/live/sapienciaweb.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/sapienciaweb.com/privkey.pem;

    client_max_body_size 20M;

    location / {
        proxy_pass http://sapiencia_web_vps:80;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

## Proyecto 3: asistente-ia.sapienciaweb.com

### Ruta

`/opt/apps/projects/ai-assistant`

### Stack

- Frontend Angular compilado y servido con Nginx
- Backend Python/FastAPI
- PostgreSQL con pgvector
- Redis

### Contenedores

- `ai_assistant_web_vps`
- `ai_assistant_api_vps`
- `ai_assistant_db_vps`
- `ai_assistant_redis_vps`

### Despliegue completo

```bash
cd /opt/apps/projects/ai-assistant
docker compose up -d --build
```

### Despliegue solo backend

```bash
cd /opt/apps/projects/ai-assistant
docker compose -f compose.backend-only.yaml up -d --build
```

### Reiniciar solo backend tras cambiar `.env.prod`

```bash
cd /opt/apps/projects/ai-assistant
docker compose up -d --force-recreate --no-deps ai_assistant_api_vps
```

### Archivo privado requerido

Crear en el VPS:

`/opt/apps/projects/ai-assistant/backend/.env.prod`

Base local:

`backend/.env.prod.example`

### Vhost principal

Ruta:

`/opt/apps/nginx/conf.d/asistente-ia.sapienciaweb.com.conf`

Configuracion HTTP inicial:

```nginx
server {
    listen 80;
    server_name asistente-ia.sapienciaweb.com;

    location ^~ /.well-known/acme-challenge/ {
        root /usr/share/nginx/html;
        default_type "text/plain";
        try_files $uri =404;
    }

    location /api/ {
        proxy_pass http://ai_assistant_api_vps:8000/api/;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location / {
        proxy_pass http://ai_assistant_web_vps:80;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### Configuracion HTTPS final esperada

```nginx
server {
    listen 80;
    server_name asistente-ia.sapienciaweb.com;

    location ^~ /.well-known/acme-challenge/ {
        root /usr/share/nginx/html;
        default_type "text/plain";
        try_files $uri =404;
    }

    location / {
        return 301 https://$host$request_uri;
    }
}

server {
    listen 443 ssl http2;
    server_name asistente-ia.sapienciaweb.com;

    ssl_certificate /etc/letsencrypt/live/asistente-ia.sapienciaweb.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/asistente-ia.sapienciaweb.com/privkey.pem;

    client_max_body_size 20M;

    location /api/ {
        proxy_pass http://ai_assistant_api_vps:8000/api/;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location / {
        proxy_pass http://ai_assistant_web_vps:80;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

## Comandos utiles del VPS

### Reiniciar el proxy principal

```bash
cd /opt/apps/nginx
docker compose restart
```

### Ver contenedores levantados

```bash
docker ps
```

### Ver contenedores de un proyecto

```bash
docker compose -f /opt/apps/projects/ai-assistant/compose.yaml ps
docker compose -f /opt/apps/projects/sapienciaweb-angular/compose.yaml ps
```

### Ver si un contenedor esta unido a `proxy`

```bash
docker network inspect proxy
```

### Emitir certificado SSL nuevo

```bash
sudo certbot certonly --webroot -w /opt/apps/shared/www -d dominio.com -d www.dominio.com
```

### Recargar Nginx principal

```bash
cd /opt/apps/nginx
docker compose restart
```

## Flujo recomendado al agregar un nuevo proyecto

1. Crear carpeta en `/opt/apps/projects/<nombre>`.
2. Preparar su `docker-compose` y su Dockerfile.
3. Conectar el contenedor publicado a la red `proxy`.
4. Crear el archivo `/opt/apps/nginx/conf.d/<dominio>.conf`.
5. Probar primero por HTTP.
6. Emitir el certificado con Certbot.
7. Activar el bloque HTTPS.
8. Reiniciar `main-nginx`.

## Notas importantes

- `main-nginx` es el unico Nginx publico del VPS.
- Cada proyecto puede tener su propio Nginx interno si sirve frontend estatico o hace de web server intermedio.
- No hace falta instalar Node.js o Nginx en el host si todo corre en Docker.
- Para Angular, compilar dentro de Docker evita instalar Node en el VPS, pero consume mas recursos.
- Cuando el frontend Angular da problemas de build en el VPS, una alternativa es compilar en local y subir el resultado ya listo.
