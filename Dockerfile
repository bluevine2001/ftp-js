# Étape 1: Construction de l'application TypeScript
FROM node:20.5.1 AS build

# Créer le répertoire de l'application
WORKDIR /app

# Copier les fichiers de package et installer les dépendances
COPY package.json pnpm-lock.yaml* ./
RUN npm install -g pnpm
RUN pnpm install --no-frozen-lockfile

# Copier le reste des fichiers de l'application
COPY . .

# Compiler le code TypeScript en JavaScript
RUN pnpm run build

# Étape 2: Image pour exécuter l'application
FROM node:20.5.1

# Copier les fichiers compilés depuis l'étape de build
WORKDIR /app
COPY --from=build /app .

# Exposer le port (changer si nécessaire)
EXPOSE 3000

# Démarrer l'application
CMD ["node", "dist/server.js"]
