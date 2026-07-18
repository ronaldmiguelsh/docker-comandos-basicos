window.DOCKER_GUIDE = {
  categories: [
    { id: "essentials", label: "Primeros pasos", icon: "01" },
    { id: "images", label: "Imágenes", icon: "02" },
    { id: "containers", label: "Contenedores", icon: "03" },
    { id: "network", label: "Redes y puertos", icon: "04" },
    { id: "storage", label: "Datos", icon: "05" },
    { id: "compose", label: "Compose", icon: "06" },
    { id: "maintenance", label: "Limpieza", icon: "07" }
  ],

  learningPath: [
    { category: "essentials", title: "Conoce tu entorno", text: "Comprueba la instalación y entiende qué recursos administra Docker.", icon: "⌁" },
    { category: "images", title: "Trabaja con imágenes", text: "Descarga, inspecciona y construye las plantillas de tus contenedores.", icon: "◇" },
    { category: "containers", title: "Ejecuta contenedores", text: "Crea, observa, detén y depura aplicaciones aisladas.", icon: ">_" },
    { category: "compose", title: "Coordina servicios", text: "Levanta aplicaciones completas desde un archivo Compose.", icon: "::" }
  ],

  commands: [
    {
      id: "version", category: "essentials", level: "beginner", command: "docker version", example: "docker version",
      summary: "Muestra las versiones del cliente y del motor de Docker.",
      description: "Comprueba que la CLI puede comunicarse con Docker Engine. Si aparece información de Client y Server, el entorno está listo.",
      breakdown: ["docker invoca la herramienta de línea de comandos.", "version consulta las versiones y la API disponibles."],
      result: "Verás dos bloques: Client para la CLI y Server para el motor que ejecuta los contenedores."
    },
    {
      id: "info", category: "essentials", level: "beginner", command: "docker info", example: "docker info",
      summary: "Resume el estado, almacenamiento y recursos del motor.",
      description: "Ofrece una vista general del entorno: contenedores, imágenes, redes, CPU, memoria y controlador de almacenamiento.",
      breakdown: ["info solicita datos del daemon activo.", "No modifica ningún recurso; es seguro para diagnóstico."],
      result: "Obtendrás un informe del sistema Docker y del contexto que está seleccionado."
    },
    {
      id: "help", category: "essentials", level: "beginner", command: "docker --help", example: "docker run --help",
      summary: "Consulta comandos y opciones sin salir de la terminal.",
      description: "La ayuda integrada es la referencia más rápida cuando no recuerdas una opción o el orden de los argumentos.",
      breakdown: ["Añade --help después de docker para la ayuda general.", "Añádelo después de un subcomando para ver opciones específicas."],
      result: "La terminal mostrará la sintaxis, una descripción y todas las opciones admitidas."
    },
    {
      id: "image-ls", category: "images", level: "beginner", command: "docker image ls", example: "docker image ls",
      summary: "Lista las imágenes disponibles localmente.",
      description: "Permite ver qué imágenes están descargadas, sus etiquetas, identificadores, fecha y tamaño.",
      breakdown: ["image agrupa las operaciones sobre imágenes.", "ls lista las imágenes locales."],
      result: "Verás una tabla con repositorio, etiqueta, ID, fecha de creación y tamaño."
    },
    {
      id: "pull", category: "images", level: "beginner", command: "docker pull <imagen>:<tag>", example: "docker pull nginx:alpine",
      summary: "Descarga una imagen desde Docker Hub u otro registro.",
      description: "Trae al equipo las capas de una imagen. Es buena práctica indicar una etiqueta concreta para obtener resultados reproducibles.",
      breakdown: ["pull inicia la descarga desde el registro.", "nginx es el repositorio y alpine la etiqueta elegida."],
      result: "Docker descargará solo las capas ausentes y guardará la imagen en el almacén local."
    },
    {
      id: "inspect-image", category: "images", level: "intermediate", command: "docker image inspect <imagen>", example: "docker image inspect nginx:alpine",
      summary: "Muestra la configuración y metadatos de una imagen.",
      description: "Sirve para conocer variables, arquitectura, comando de inicio, capas y otros metadatos antes de usar una imagen.",
      breakdown: ["image inspect abre la información de bajo nivel.", "Puedes identificar la imagen por nombre, etiqueta o ID."],
      result: "Recibirás un documento JSON con la configuración completa de la imagen."
    },
    {
      id: "build", category: "images", level: "intermediate", command: "docker build -t <nombre>:<tag> .", example: "docker build -t mi-app:1.0 .",
      summary: "Construye una imagen a partir de un Dockerfile.",
      description: "Procesa las instrucciones del Dockerfile y crea una imagen reutilizable con tu aplicación y sus dependencias.",
      breakdown: ["build inicia la construcción.", "-t asigna nombre y etiqueta.", "El punto usa la carpeta actual como contexto."],
      result: "Al terminar tendrás una nueva imagen llamada mi-app con la etiqueta 1.0."
    },
    {
      id: "history", category: "images", level: "intermediate", command: "docker image history <imagen>", example: "docker image history nginx:alpine",
      summary: "Muestra las capas que forman una imagen.",
      description: "Ayuda a entender el tamaño de la imagen y qué instrucciones aportaron cada una de sus capas.",
      breakdown: ["history recorre el historial de construcción.", "La imagen puede indicarse por nombre o ID."],
      result: "Verás cada capa, su fecha, instrucción aproximada y tamaño."
    },
    {
      id: "run", category: "containers", level: "beginner", command: "docker run <imagen>", example: "docker run --name saludo hello-world",
      summary: "Crea e inicia un contenedor desde una imagen.",
      description: "Es la operación fundamental: si la imagen no existe localmente, Docker la descarga, crea el contenedor y ejecuta su proceso principal.",
      breakdown: ["run combina create y start.", "--name asigna un nombre fácil de recordar.", "hello-world es la imagen utilizada."],
      result: "Se creará un contenedor llamado saludo y verás el mensaje de prueba de Docker."
    },
    {
      id: "run-detached", category: "containers", level: "beginner", command: "docker run -d <imagen>", example: "docker run -d --name web nginx:alpine",
      summary: "Ejecuta un contenedor en segundo plano.",
      description: "El modo detached libera la terminal mientras el proceso principal continúa ejecutándose.",
      breakdown: ["-d activa el modo detached.", "--name web facilita operar el contenedor después."],
      result: "Docker imprimirá el ID largo del contenedor y devolverá el control de la terminal."
    },
    {
      id: "run-interactive", category: "containers", level: "beginner", command: "docker run -it <imagen> sh", example: "docker run --rm -it alpine sh",
      summary: "Abre una terminal interactiva dentro de un contenedor.",
      description: "Combina una entrada interactiva con una terminal. Resulta útil para explorar imágenes pequeñas o probar comandos.",
      breakdown: ["-i mantiene abierta la entrada estándar.", "-t crea una terminal.", "--rm elimina el contenedor al salir.", "sh es el proceso iniciado."],
      result: "El prompt cambiará al shell del contenedor. Escribe exit para volver a tu equipo."
    },
    {
      id: "container-ls", category: "containers", level: "beginner", command: "docker ps", example: "docker ps -a",
      summary: "Lista contenedores activos o todos con la opción -a.",
      description: "Permite revisar estado, imagen, puertos, nombre y tiempo de ejecución de los contenedores.",
      breakdown: ["ps sin opciones muestra solo los activos.", "-a incluye contenedores detenidos y finalizados."],
      result: "Verás una tabla; STATUS indica si cada contenedor sigue activo o ya terminó."
    },
    {
      id: "logs", category: "containers", level: "intermediate", command: "docker logs <contenedor>", example: "docker logs --follow --tail 50 web",
      summary: "Consulta y sigue la salida de un contenedor.",
      description: "Es el primer lugar que debes revisar cuando una aplicación no inicia o se comporta de forma inesperada.",
      breakdown: ["--follow mantiene la salida en vivo.", "--tail 50 limita el historial a las últimas 50 líneas.", "web es el nombre del contenedor."],
      result: "Verás la salida estándar y los errores producidos por el proceso principal."
    },
    {
      id: "exec", category: "containers", level: "intermediate", command: "docker exec -it <contenedor> sh", example: "docker exec -it web sh",
      summary: "Ejecuta un comando dentro de un contenedor activo.",
      description: "Abre un proceso adicional sin reiniciar el contenedor. Es útil para inspección y diagnóstico puntual.",
      breakdown: ["exec actúa sobre un contenedor ya activo.", "-it crea una sesión interactiva.", "sh inicia un shell si la imagen lo incluye."],
      result: "Entrarás a una terminal dentro del contenedor web hasta escribir exit."
    },
    {
      id: "stop", category: "containers", level: "beginner", command: "docker stop <contenedor>", example: "docker stop web",
      summary: "Detiene un contenedor de forma ordenada.",
      description: "Solicita al proceso principal que termine y espera un tiempo antes de forzar el cierre.",
      breakdown: ["stop conserva el contenedor y su configuración.", "Puedes usar el nombre o el ID."],
      result: "El contenedor quedará detenido y podrá iniciarse nuevamente con docker start."
    },
    {
      id: "start", category: "containers", level: "beginner", command: "docker start <contenedor>", example: "docker start web",
      summary: "Vuelve a iniciar un contenedor detenido.",
      description: "Reutiliza el mismo contenedor, configuración y sistema de archivos; no crea uno nuevo.",
      breakdown: ["start requiere un contenedor existente.", "Usa -a si quieres adjuntarte a su salida."],
      result: "El proceso principal volverá a ejecutarse con la configuración original."
    },
    {
      id: "remove", category: "containers", level: "intermediate", command: "docker rm <contenedor>", example: "docker rm web",
      summary: "Elimina un contenedor detenido.", risk: true,
      description: "Borra el objeto contenedor cuando ya no lo necesitas. La imagen utilizada permanece disponible.",
      breakdown: ["rm elimina uno o varios contenedores.", "El contenedor debe estar detenido, salvo que uses -f."],
      result: "El nombre del contenedor dejará de aparecer en docker ps -a.",
      warning: "Se perderán los cambios almacenados solo en la capa escribible del contenedor. Los volúmenes no se eliminan por defecto."
    },
    {
      id: "stats", category: "containers", level: "intermediate", command: "docker stats", example: "docker stats --no-stream",
      summary: "Muestra el consumo de recursos de los contenedores.",
      description: "Presenta CPU, memoria, red y operaciones de disco para detectar contenedores que consumen más de lo esperado.",
      breakdown: ["stats muestra métricas en vivo.", "--no-stream imprime una sola lectura y termina."],
      result: "Obtendrás una tabla con métricas actuales para cada contenedor activo."
    },
    {
      id: "publish", category: "network", level: "intermediate", command: "docker run -p <host>:<contenedor> <imagen>", example: "docker run -d -p 8080:80 --name web nginx:alpine",
      summary: "Publica un puerto del contenedor en tu equipo.",
      description: "Hace accesible un servicio aislado. El primer puerto pertenece al host y el segundo al contenedor.",
      breakdown: ["-p publica un puerto.", "8080 es el puerto de tu equipo.", "80 es el puerto donde escucha Nginx dentro del contenedor."],
      result: "Podrás abrir http://localhost:8080 mientras el contenedor esté activo."
    },
    {
      id: "port", category: "network", level: "intermediate", command: "docker port <contenedor>", example: "docker port web",
      summary: "Consulta los puertos publicados por un contenedor.",
      description: "Muestra la relación entre los puertos expuestos dentro del contenedor y los asignados en el host.",
      breakdown: ["port no modifica la red.", "Puedes consultar todos los puertos o uno específico."],
      result: "Verás una relación como 80/tcp → 0.0.0.0:8080."
    },
    {
      id: "network-ls", category: "network", level: "intermediate", command: "docker network ls", example: "docker network ls",
      summary: "Lista las redes disponibles en Docker.",
      description: "Permite identificar redes predeterminadas y las creadas por tus proyectos o por Compose.",
      breakdown: ["network agrupa operaciones de conectividad.", "ls muestra ID, nombre, controlador y alcance."],
      result: "Obtendrás una tabla con redes como bridge, host, none y las redes de proyectos."
    },
    {
      id: "network-create", category: "network", level: "intermediate", command: "docker network create <red>", example: "docker network create mi-red",
      summary: "Crea una red para comunicar contenedores por nombre.",
      description: "Una red bridge definida por el usuario ofrece resolución DNS automática entre los contenedores conectados.",
      breakdown: ["network create genera una red nueva.", "mi-red será el nombre utilizado al ejecutar contenedores."],
      result: "Docker imprimirá el ID de la red, que aparecerá en docker network ls."
    },
    {
      id: "volume-ls", category: "storage", level: "intermediate", command: "docker volume ls", example: "docker volume ls",
      summary: "Lista los volúmenes administrados por Docker.",
      description: "Los volúmenes conservan datos fuera del ciclo de vida de un contenedor y facilitan su reutilización.",
      breakdown: ["volume agrupa operaciones de almacenamiento.", "ls muestra los volúmenes locales disponibles."],
      result: "Verás el controlador y nombre de cada volumen."
    },
    {
      id: "volume-create", category: "storage", level: "intermediate", command: "docker volume create <volumen>", example: "docker volume create datos-app",
      summary: "Crea un volumen persistente con nombre.",
      description: "Prepara un espacio administrado por Docker que puede montarse en uno o varios contenedores.",
      breakdown: ["volume create genera el recurso.", "datos-app es un nombre estable y reutilizable."],
      result: "El volumen existirá aunque elimines el contenedor que lo utiliza."
    },
    {
      id: "mount-volume", category: "storage", level: "intermediate", command: "docker run --mount ...", example: "docker run -d --name db --mount source=datos-app,target=/var/lib/postgresql/data postgres:16",
      summary: "Monta un volumen dentro de un contenedor.",
      description: "La sintaxis --mount hace explícitos el origen y el destino, lo que reduce errores en configuraciones largas.",
      breakdown: ["source indica el volumen del host.", "target es la ruta dentro del contenedor.", "La imagen postgres guardará allí sus datos."],
      result: "La base de datos escribirá en datos-app y sus archivos sobrevivirán al contenedor."
    },
    {
      id: "bind-mount", category: "storage", level: "intermediate", command: "docker run --mount type=bind,...", example: "docker run --rm --mount type=bind,source=${PWD},target=/app -w /app node:20-alpine node --version",
      summary: "Comparte una carpeta del equipo con el contenedor.",
      description: "Los bind mounts son útiles durante el desarrollo porque reflejan inmediatamente los cambios realizados en los archivos del host.",
      breakdown: ["type=bind selecciona una carpeta del host.", "source indica la ruta local.", "target indica dónde aparecerá dentro del contenedor."],
      result: "El contenedor podrá acceder a la carpeta actual mediante /app. La sintaxis de ${PWD} depende de tu terminal."
    },
    {
      id: "compose-up", category: "compose", level: "intermediate", command: "docker compose up", example: "docker compose up -d --build",
      summary: "Crea e inicia los servicios definidos en compose.yaml.",
      description: "Compose coordina contenedores, redes y volúmenes de una aplicación desde un único archivo declarativo.",
      breakdown: ["compose activa Docker Compose v2.", "up crea o actualiza los servicios.", "-d los deja en segundo plano.", "--build reconstruye imágenes antes de iniciar."],
      result: "Todos los servicios del proyecto quedarán creados e iniciados en la misma red."
    },
    {
      id: "compose-ps", category: "compose", level: "intermediate", command: "docker compose ps", example: "docker compose ps",
      summary: "Muestra el estado de los servicios del proyecto.",
      description: "Resume contenedores, estado, salud y puertos del proyecto Compose actual.",
      breakdown: ["compose usa el archivo del directorio actual.", "ps limita la vista a ese proyecto."],
      result: "Verás una fila por servicio o réplica creada por Compose."
    },
    {
      id: "compose-logs", category: "compose", level: "intermediate", command: "docker compose logs", example: "docker compose logs -f --tail 50",
      summary: "Combina los registros de todos los servicios.",
      description: "Añade el nombre de cada servicio a su salida para investigar cómo interactúan los componentes de la aplicación.",
      breakdown: ["-f mantiene la salida en vivo.", "--tail 50 limita el historial por servicio."],
      result: "Los mensajes aparecerán intercalados y etiquetados con el servicio que los produjo."
    },
    {
      id: "compose-exec", category: "compose", level: "intermediate", command: "docker compose exec <servicio> <comando>", example: "docker compose exec web sh",
      summary: "Ejecuta un comando en un servicio activo.",
      description: "Es la variante de docker exec orientada a los nombres de servicio definidos en compose.yaml.",
      breakdown: ["exec selecciona un contenedor activo del servicio.", "web es el nombre del servicio.", "sh es el proceso adicional."],
      result: "Abrirás una sesión dentro del contenedor asociado al servicio web."
    },
    {
      id: "compose-down", category: "compose", level: "intermediate", command: "docker compose down", example: "docker compose down",
      summary: "Detiene y elimina contenedores y redes del proyecto.", risk: true,
      description: "Desmonta el proyecto creado por Compose. Los volúmenes con nombre no se eliminan por defecto.",
      breakdown: ["down detiene y elimina contenedores de servicios.", "También elimina las redes del proyecto.", "Añade --volumes solo si también quieres borrar los volúmenes."],
      result: "El proyecto dejará de ejecutarse, pero sus volúmenes con nombre permanecerán disponibles.",
      warning: "docker compose down --volumes elimina también los volúmenes declarados y puede borrar datos persistentes."
    },
    {
      id: "system-df", category: "maintenance", level: "intermediate", command: "docker system df", example: "docker system df -v",
      summary: "Muestra cuánto espacio utilizan los recursos Docker.",
      description: "Antes de limpiar, utiliza este comando para medir imágenes, contenedores, volúmenes y caché de construcción.",
      breakdown: ["system df calcula el uso de disco.", "-v ofrece un desglose detallado."],
      result: "Verás el espacio total, activo y potencialmente recuperable por tipo de recurso."
    },
    {
      id: "container-prune", category: "maintenance", level: "advanced", command: "docker container prune", example: "docker container prune",
      summary: "Elimina todos los contenedores detenidos.", risk: true,
      description: "Libera espacio ocupado por contenedores que ya no se ejecutan. Docker pide confirmación antes de continuar.",
      breakdown: ["container prune busca contenedores detenidos.", "Puedes añadir filtros para limitar la selección."],
      result: "Se mostrarán los IDs eliminados y el espacio recuperado.",
      warning: "Los cambios no guardados en volúmenes se perderán. Revisa docker ps -a antes de confirmar."
    },
    {
      id: "image-prune", category: "maintenance", level: "advanced", command: "docker image prune", example: "docker image prune",
      summary: "Elimina imágenes colgantes sin etiqueta.", risk: true,
      description: "Sin opciones adicionales, limpia imágenes dangling: capas sin etiqueta que no utiliza ningún contenedor.",
      breakdown: ["image prune se limita a imágenes colgantes.", "Con -a también alcanza imágenes no usadas por contenedores."],
      result: "Docker pedirá confirmación y mostrará el espacio recuperado.",
      warning: "La opción -a tiene un alcance mucho mayor y puede obligarte a descargar o reconstruir imágenes de nuevo."
    },
    {
      id: "volume-prune", category: "maintenance", level: "advanced", command: "docker volume prune", example: "docker volume prune",
      summary: "Elimina volúmenes locales que no están en uso.", risk: true,
      description: "Recupera espacio de volúmenes que no están conectados a ningún contenedor.",
      breakdown: ["volume prune identifica volúmenes sin uso.", "Docker solicita confirmación antes de eliminarlos."],
      result: "Verás los nombres eliminados y el espacio liberado.",
      warning: "Un volumen desconectado todavía puede contener información importante. Inspecciónalo o respáldalo antes."
    },
    {
      id: "system-prune", category: "maintenance", level: "advanced", command: "docker system prune", example: "docker system prune",
      summary: "Limpia varios tipos de recursos no utilizados.", risk: true,
      description: "Elimina contenedores detenidos, redes sin uso, imágenes colgantes y caché de construcción no utilizada.",
      breakdown: ["system prune combina varias operaciones de limpieza.", "Sin --volumes no elimina volúmenes.", "Sin -a se limita a imágenes colgantes."],
      result: "Docker enumerará el alcance, pedirá confirmación e informará el espacio recuperado.",
      warning: "Lee la lista de recursos que Docker muestra antes de confirmar. Evita usar -a o --volumes por costumbre."
    }
  ]
};
