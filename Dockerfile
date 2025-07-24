FROM node:20-slim AS base

# Installation de pnpm manuellement pour éviter le problème de signature
RUN npm install -g pnpm@latest

# Création du répertoire de travail
WORKDIR /app

# Copie des fichiers package.json et pnpm-lock.yaml pour optimiser le cache
COPY package.json pnpm-lock.yaml ./

FROM base AS build

ARG VITE_API_URL=https://api.luzo-app.fr
ARG VITE_DOMAIN=.luzo-app.fr
ENV VITE_API_URL=${VITE_API_URL}
ENV VITE_DOMAIN=${VITE_DOMAIN}

# Installation des dépendances
RUN pnpm install --frozen-lockfile

# Copie du reste du projet
COPY . . 
RUN pnpm run build

# Bundle static assets with nginx
FROM alpine:latest AS production

# VARIABLES TEMPORAIRES
ARG DOCUMENTROOT="/etc/nginx"

# Initialise le répertoire de travail
WORKDIR ${DOCUMENTROOT}

# Création d'un utilisateur et groupe non privilégiés
RUN addgroup -S nginx && adduser -S -G nginx nginx

# Installation des services
RUN apk update && \
    apk add nginx && \
    mkdir -p /run/nginx && \
    mkdir includes && \
    rm -f ${DOCUMENTROOT}/http.d/* ${DOCUMENTROOT}/sites-available/* ${DOCUMENTROOT}/sites-enabled/* && \
    rm -rf /var/cache/apk/*

# Copie les différents dossiers/fichiers de conf dans le container
COPY nginx.conf ${DOCUMENTROOT}
COPY site.conf ${DOCUMENTROOT}/sites-available/

# Copie des assets compilés depuis le builder
COPY --from=build /app/dist /usr/share/nginx/html

# Création du lien symbolique pour les configurations Nginx
RUN if [ ! -d "${DOCUMENTROOT}/sites-enabled" ]; then mkdir -p ${DOCUMENTROOT}/sites-enabled; fi && \
    ln -s ${DOCUMENTROOT}/sites-available/* ${DOCUMENTROOT}/sites-enabled/

# Ajustement des permissions pour l'utilisateur non root
RUN chown -R nginx:nginx ${DOCUMENTROOT} /run/nginx

# Passer à l'utilisateur non root
USER nginx

# Démarrer nginx
CMD ["nginx", "-g", "daemon off;"]