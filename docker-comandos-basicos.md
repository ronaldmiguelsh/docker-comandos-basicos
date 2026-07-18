# Comandos Básicos de Docker

## Información

| Comando | Descripción |
|---|---|
| `docker version` | Muestra la versión de Docker |
| `docker info` | Información del sistema Docker |

## Imágenes

| Comando | Descripción |
|---|---|
| `docker images` | Lista imágenes locales |
| `docker pull <imagen>` | Descarga una imagen desde un registro (ej. Docker Hub) |
| `docker rmi <imagen>` | Elimina una imagen local |
| `docker build -t <tag> .` | Construye una imagen desde un Dockerfile |

## Contenedores

| Comando | Descripción |
|---|---|
| `docker ps` | Lista contenedores en ejecución |
| `docker ps -a` | Lista todos los contenedores (activos y detenidos) |
| `docker run <imagen>` | Crea y ejecuta un contenedor |
| `docker run -d <imagen>` | Ejecuta un contenedor en segundo plano (detached) |
| `docker run -it <imagen> sh` | Ejecuta un contenedor interactivo con terminal |
| `docker run --name <nombre> <imagen>` | Asigna un nombre personalizado al contenedor |
| `docker stop <id o nombre>` | Detiene un contenedor |
| `docker start <id o nombre>` | Inicia un contenedor detenido |
| `docker restart <id o nombre>` | Reinicia un contenedor |
| `docker rm <id o nombre>` | Elimina un contenedor |
| `docker logs <id o nombre>` | Muestra los logs de un contenedor |
| `docker exec -it <id o nombre> sh` | Accede a un contenedor en ejecución de forma interactiva |

## Puertos y Volúmenes

| Comando | Descripción |
|---|---|
| `docker run -p 8080:80 <imagen>` | Mapea el puerto 80 del contenedor al puerto 8080 del host |
| `docker run -v <host>:<contenedor> <imagen>` | Monta un volumen del host en el contenedor |

## Docker Compose

| Comando | Descripción |
|---|---|
| `docker-compose up` | Levanta los servicios definidos en `docker-compose.yml` |
| `docker-compose up -d` | Levanta los servicios en segundo plano |
| `docker-compose down` | Detiene y elimina los servicios |
| `docker-compose logs` | Muestra los logs de todos los servicios |
| `docker-compose ps` | Lista los servicios activos |

## Limpieza

| Comando | Descripción |
|---|---|
| `docker system prune` | Elimina contenedores, redes e imágenes no usados |
| `docker system prune -a` | Elimina todo lo no usado, incluyendo imágenes sin etiquetar |
| `docker container prune` | Elimina todos los contenedores detenidos |
| `docker image prune` | Elimina imágenes no usadas |
