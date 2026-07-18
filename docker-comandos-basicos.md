# Referencia rápida de Docker

Abre `index.html` para consultar explicaciones detalladas, resultados y advertencias.

## Primeros pasos e imágenes

| Comando | Uso |
|---|---|
| `docker version` | Comprueba el cliente y el motor. |
| `docker info` | Resume el estado del entorno. |
| `docker image ls` | Lista imágenes locales. |
| `docker pull nginx:alpine` | Descarga una imagen etiquetada. |
| `docker build -t mi-app:1.0 .` | Construye una imagen desde un Dockerfile. |

## Contenedores

| Comando | Uso |
|---|---|
| `docker run -d --name web nginx:alpine` | Ejecuta Nginx en segundo plano. |
| `docker run --rm -it alpine sh` | Abre una terminal temporal. |
| `docker ps -a` | Lista todos los contenedores. |
| `docker logs -f --tail 50 web` | Sigue los registros. |
| `docker exec -it web sh` | Abre un shell en un contenedor activo. |
| `docker stop web` | Detiene un contenedor ordenadamente. |
| `docker start web` | Inicia un contenedor detenido. |
| `docker rm web` | Elimina un contenedor detenido. |

## Redes y datos

| Comando | Uso |
|---|---|
| `docker run -d -p 8080:80 --name web nginx:alpine` | Publica Nginx en `localhost:8080`. |
| `docker port web` | Consulta puertos publicados. |
| `docker network create mi-red` | Crea una red. |
| `docker volume create datos-app` | Crea un volumen persistente. |
| `docker volume ls` | Lista volúmenes. |

## Docker Compose

La sintaxis actual usa `docker compose` con un espacio.

| Comando | Uso |
|---|---|
| `docker compose up -d --build` | Construye e inicia servicios. |
| `docker compose ps` | Revisa el estado del proyecto. |
| `docker compose logs -f --tail 50` | Sigue registros de servicios. |
| `docker compose exec web sh` | Ejecuta un shell en el servicio `web`. |
| `docker compose down` | Elimina contenedores y redes; conserva volúmenes con nombre. |

## Limpieza

> **Precaución:** revisa los recursos antes de confirmar una eliminación.

| Comando | Uso |
|---|---|
| `docker system df -v` | Analiza el uso de disco. |
| `docker container prune` | Elimina contenedores detenidos. |
| `docker image prune` | Elimina imágenes colgantes. |
| `docker volume prune` | Elimina volúmenes sin uso. |
| `docker system prune` | Limpia varios recursos no utilizados. |
