# Utiliser une image Ubuntu comme base
FROM ubuntu:latest

# Mise à jour des paquets et installation de Node.js
RUN apt-get update && \
    apt-get install -y nodejs npm

# Créer et définir le répertoire de travail dans le conteneur
WORKDIR /ubuntunode

# Copier le fichier package.json et package-lock.json
COPY package*.json ./

# Copier le dossier node_modules (contenant les modules précompilés)
#COPY node_modules /ubuntunode/node_modules

RUN npm install

# Copier les fichiers de l'application
COPY . .

# Exposer le port sur lequel l'application s'exécute
EXPOSE 3000

# Commande pour démarrer l'application
CMD ["npm", "start"]
