# Despliegue de SapienciaWebAngular en el VPS

## Objetivo

Publicar `sapienciaweb.com` en el mismo VPS donde ya existe `2v-soluciones.com`, reutilizando el contenedor `main-nginx` y la red Docker externa `proxy`.

## Lo que ya deja listo este repositorio

- `Dockerfile`: sirve con Nginx el build Angular ya compilado localmente.
- `compose.yaml`: crea el contenedor `sapiencia_web_vps` conectado a la red `proxy`.
- `deploy/nginx/default.conf`: configuracion interna del contenedor Angular.
- `src/environments/environment.prod.ts`: usa `https://sapienciaweb.com/sapienciaBackend/api/`.

## Estructura sugerida en el VPS

```text
/opt/apps/projects/sapienciaweb-angular
├── compose.yaml
├── Dockerfile
├── dist/
│   └── sapAngular/browser
├── deploy/
│   ├── nginx/default.conf
│   └── vps/README.md
├── angular.json
├── package.json
├── package-lock.json
└── src/...
```

## Flujo recomendado

1. Compilar localmente:

```bash
cd /home/eavc531/apps_dev/SapienciaWebAngular
npm install
npm run build
```

2. Verificar que exista `dist/sapAngular/browser`.
3. Copiar este proyecto a `/opt/apps/projects/sapienciaweb-angular`, incluyendo `dist`.
4. Entrar a la carpeta:

```bash
cd /opt/apps/projects/sapienciaweb-angular
```

5. Construir y levantar el contenedor:

```bash
docker compose up -d --build
```

6. Verificar que el contenedor se una a la red `proxy`:

```bash
docker network inspect proxy
```

Debes ver el contenedor `sapiencia_web_vps`.

## Importante

- El VPS ya no compila Angular.
- El contenedor solo sirve `dist/sapAngular/browser` con Nginx.
- Si cambias el frontend, primero debes volver a ejecutar `npm run build` en local y luego sincronizar.

## Configuracion del proxy principal

Crear el archivo:

`/opt/apps/nginx/conf.d/sapienciaweb.com.conf`

Contenido sugerido:

```nginx
server {
    listen 80;
    server_name sapienciaweb.com www.sapienciaweb.com;

    location /.well-known/acme-challenge/ {
        root /var/www/certbot;
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

## SSL del nuevo dominio

1. Asegurar que `sapienciaweb.com` y `www.sapienciaweb.com` apunten al VPS.
2. Emitir el certificado Let's Encrypt para el nuevo dominio.
3. Reiniciar `main-nginx`.

Ejemplo general:

```bash
docker compose -f /opt/apps/nginx/docker-compose.yml restart
```

## Punto importante del backend

El formulario de contacto del frontend envia peticiones a:

`https://sapienciaweb.com/sapienciaBackend/api/send-message`

Eso significa que **ademas del contenedor Angular**, necesitas una de estas dos opciones:

### Opcion A

Publicar un backend real en el mismo dominio bajo la ruta `/sapienciaBackend/`.

### Opcion B

Cambiar `environment.prod.ts` para apuntar a otro dominio o subdominio de API, por ejemplo:

`https://api.sapienciaweb.com/api/`

## Si el backend va en el mismo dominio

Tienes dos formas validas:

### Forma 1

Hacer que `main-nginx` enrute `/sapienciaBackend/` a otro contenedor distinto del Angular.

Ejemplo:

```nginx
location /sapienciaBackend/ {
    proxy_pass http://sapiencia_backend_vps:80;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
}
```

### Forma 2

Dejar que `main-nginx` envie todo a `sapiencia_web_vps` y que el Nginx interno del frontend redirija `/sapienciaBackend/` al backend. Para eso debes descomentar el bloque ya incluido en `deploy/nginx/default.conf`.

## Recomendacion practica

Para este VPS, la opcion mas clara es:

- `main-nginx` publica `sapienciaweb.com`
- `sapiencia_web_vps` sirve el frontend Angular
- `sapiencia_backend_vps` sirve la API si realmente existe
- ambos contenedores comparten la red `proxy` o una red privada adicional segun tu preferencia

## Notas tecnicas

- Angular 12 da problemas de build con Node 20. Por eso conviene compilar localmente con una version de Node compatible.
- El frontend usa rutas HTML5, por eso Nginx necesita `try_files $uri $uri/ /index.html;`.
- `2v-soluciones.com` no deberia verse afectado mientras mantengas un archivo `.conf` separado y no cambies su upstream actual.
