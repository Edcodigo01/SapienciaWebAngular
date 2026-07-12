# Contexto VPS Sesion

## Objetivo de este archivo

Este archivo sirve para retomar rapidamente el contexto del VPS y del despliegue de `sapienciaweb.com` desde otra sesion, sin tener que reconstruir toda la conversacion.

## VPS actual

- Proveedor: Amazon Lightsail
- Sistema operativo: Ubuntu 22.04.5 LTS
- Tipo de instancia: `t3.small`
- Ruta base de proyectos: `/opt/apps/projects`
- Nginx publico principal: contenedor `main-nginx`
- Red Docker publica compartida: `proxy`

## Dominios y proyectos actuales

- `2v-soluciones.com`
  proyecto Laravel ya existente
- `sapienciaweb.com`
  proyecto Angular de este repositorio
- `asistente-ia.sapienciaweb.com`
  otro proyecto separado con Angular + Python

## Punto importante sobre sapienciaweb.com

El problema principal del VPS fue que se colgaba al intentar compilar Angular dentro del servidor con:

```bash
docker compose up -d --build
```

Por eso se cambio el flujo de despliegue para que:

1. Angular se compile en local.
2. Se suba `dist/sapAngular/browser` al VPS.
3. El VPS solo construya una imagen liviana con `nginx`.

## Cambio clave aplicado en este repositorio

Antes el `Dockerfile` compilaba Angular dentro del contenedor usando Node.

Ahora el `Dockerfile` solo hace esto:

```dockerfile
FROM nginx:1.27-alpine

COPY deploy/nginx/default.conf /etc/nginx/conf.d/default.conf
COPY dist/sapAngular/browser /usr/share/nginx/html

EXPOSE 80
```

Tambien se quito `dist` de `.dockerignore` para que el build compilado localmente si se sincronice al VPS.

## Flujo correcto actual para desplegar sapienciaweb.com

### 1. Compilar localmente

```bash
cd /home/eavc531/apps_dev/SapienciaWebAngular
npm install
npm run build
```

### 2. Verificar build local

Debe existir:

```bash
/home/eavc531/apps_dev/SapienciaWebAngular/dist/sapAngular/browser
```

### 3. Sincronizar al VPS

```bash
rsync -avz --progress \
  --exclude '.git' \
  --exclude 'node_modules' \
  --exclude '.angular' \
  -e "ssh -i /home/eavc531/.ssh/LightsailDefaultKey-us-east-1.pem" \
  /home/eavc531/apps_dev/SapienciaWebAngular/ \
  ubuntu@32.196.146.120:/opt/apps/projects/sapienciaweb-angular/
```

### 4. Entrar al VPS

```bash
ssh -i /home/eavc531/.ssh/LightsailDefaultKey-us-east-1.pem ubuntu@32.196.146.120
```

### 5. Levantar el contenedor

```bash
cd /opt/apps/projects/sapienciaweb-angular
docker compose down
docker compose up -d --build
```

Nota:
Aunque aqui sigue apareciendo `--build`, ya no compila Angular dentro del VPS. Solo arma una imagen de `nginx` copiando el `dist` ya generado en local.

## Como detectar el problema clasico

Si `sapienciaweb.com` devuelve `502 Bad Gateway`, normalmente significa que `main-nginx` esta arriba, pero `sapiencia_web_vps` no quedo levantado.

Comandos utiles:

```bash
docker ps | grep -E "main-nginx|sapiencia_web_vps"
docker compose -f /opt/apps/projects/sapienciaweb-angular/compose.yaml ps
docker logs sapiencia_web_vps
```

## Configuracion esperada del proxy principal

El vhost de `sapienciaweb.com` en el VPS debe apuntar a:

```nginx
proxy_pass http://sapiencia_web_vps:80;
```

Archivo esperado:

```text
/opt/apps/nginx/conf.d/sapienciaweb.com.conf
```

## Verificacion despues del despliegue

En el VPS:

```bash
docker ps | grep sapiencia_web_vps
docker exec main-nginx wget -qO- http://sapiencia_web_vps:80 | head
```

Si responde HTML, el proxy deberia funcionar.

## Archivos importantes de este repositorio

- `Dockerfile`
- `.dockerignore`
- `compose.yaml`
- `deploy/nginx/default.conf`
- `deploy/vps/sapienciaweb.com.conf`
- `deploy/vps/README.md`
- `ESTRUCTURA_VPS_Y_DESPLIEGUES.md`

## Contexto adicional

- En este proyecto `sapienciaweb-angular`, el problema no era SSR reactivado.
- El problema real era el peso de compilar Angular dentro del VPS.
- El proyecto `asistente-ia.sapienciaweb.com` si tuvo mas trabajo de ajuste aparte, pero vive en otro repositorio y otra carpeta del VPS.
