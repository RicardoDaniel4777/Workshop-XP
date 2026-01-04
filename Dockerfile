# Build stage para el frontend
FROM node:18-alpine as frontend-build

WORKDIR /app

# Copiar archivos de dependencias del frontend
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto de los archivos
COPY . .

# Build de la aplicación frontend
RUN npm run build

# Production stage
FROM node:18-alpine

# Instalar nginx y supervisor para manejar múltiples procesos
RUN apk add --no-cache nginx supervisor

# Crear directorios necesarios
RUN mkdir -p /run/nginx /var/log/supervisor /app/server /app/XP/1_Planning

WORKDIR /app

# Copiar datos XP primero (para que el backend pueda acceder a ellos)
COPY XP/ ./XP/

# Copiar el backend
COPY server/ ./server/

# Instalar dependencias del backend
WORKDIR /app/server
RUN npm install

# Volver al directorio raíz
WORKDIR /app

# Copiar los archivos build del frontend a nginx
COPY --from=frontend-build /app/dist /usr/share/nginx/html

# Copiar configuración personalizada de nginx
COPY nginx.conf /etc/nginx/http.d/default.conf

# Crear archivo de configuración de supervisor
RUN echo $'[supervisord]\n\
nodaemon=true\n\
logfile=/var/log/supervisor/supervisord.log\n\
pidfile=/var/run/supervisord.pid\n\
\n\
[program:nginx]\n\
command=nginx -g "daemon off;"\n\
autostart=true\n\
autorestart=true\n\
stdout_logfile=/dev/stdout\n\
stdout_logfile_maxbytes=0\n\
stderr_logfile=/dev/stderr\n\
stderr_logfile_maxbytes=0\n\
\n\
[program:backend]\n\
command=node app.js\n\
directory=/app/server\n\
autostart=true\n\
autorestart=true\n\
environment=NODE_ENV=production\n\
stdout_logfile=/dev/stdout\n\
stdout_logfile_maxbytes=0\n\
stderr_logfile=/dev/stderr\n\
stderr_logfile_maxbytes=0' > /etc/supervisord.conf

# Asegurar permisos correctos para los archivos JSON
RUN chmod -R 755 /app/XP

# Exponer puerto
EXPOSE 80

# Comando de inicio - ejecuta supervisor que maneja nginx y node
CMD ["/usr/bin/supervisord", "-c", "/etc/supervisord.conf"]
