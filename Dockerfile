# Verwenden Sie ein Basisimage, das Node.js und npm enthält
FROM node:14

# Setzen Sie das Arbeitsverzeichnis in Ihrem Container
WORKDIR /app

# Kopieren Sie die package.json- und package-lock.json-Dateien in das Arbeitsverzeichnis
COPY package*.json ./

# Installieren Sie die Abhängigkeiten
RUN npm install

RUN npm install -g @ionic/cli

# Kopieren Sie den Rest Ihrer Ionic-App in das Arbeitsverzeichnis
COPY . .

# Bauen Sie die Ionic-App (Sie können hier das gewünschte Build-Skript verwenden)
RUN ionic build

# Exponieren Sie den Port, den Ihre Ionic-App verwendet (normalerweise 8100)
EXPOSE 8100

# Starten Sie Ihre Ionic-App beim Start des Containers
CMD ["ionic", "serve"]
