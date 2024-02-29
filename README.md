
# Projet n°7 du parcours de développeur web chez Openclassrooms:
# Créez un réseau social d'entreprise

Le projet consiste à créer un réseau social interne pour les employés de l'entreprise Groupomania.

## Installation

Pour installer les packages, ouvrez votre terminal et naviguez jusqu'au dossier "client"

```bash
  cd client
```

Puis installez les packages de ce dernier avec npm, yarn ou pnpm

```bash
  npm install, yarn install ou pnpm install
```

Dans un autre terminal naviguez cette fois vers le dossier "server"

```bash
  cd server
```

Puis installez les packages de ce dernier avec npm, yarn ou pnpm

```bash
  npm install, yarn install ou pnpm install
```
    
## 🛠 Outils utilisés

* MySQL
* Express
* Node.JS
* React
* Redux Toolkit & RTK Query
* Firebase

## Identité graphique

| Color             | Hex                                                                |
| ----------------- | ------------------------------------------------------------------ |
| Primaire | ![#FD2D01](https://via.placeholder.com/10/FD2D01?text=+) #FD2D01 |
| Secondaire | ![#FFD7D7](https://via.placeholder.com/10/FFD7D7?text=+) #FFD7D7 |
| Tertiaire | ![#4E5166](https://via.placeholder.com/10/4E5166?text=+) #4E5166 |


## Concernant Firebase

* Vous devrez avoir un compte sur Firebase avec un bucket sur celui-ci.

* Dans ce même bucket, il faudra créer 1 dossier nommé defaultAvatar

### Le dossier defaultAvatar devra contenir une image par défaut:

* Le nom de cette image devra être renseigné dans la variable d'environnement du dossier server: "AVATAR_NAME_DEFAULT_VALUE"

* L'url de cette image devra être renseignée dans la variable d'environnement du dossier server: "AVATAR_URL_DEFAULT_VALUE"


## Variables d'environnement

Vous devrez completer les variables d'environnement des fichiers '.sample.env' (qu'il faudra renommer en '.env'). Le 1er fichier .sample.env se trouve dans le dossier 'client' et le 2è dans le dossier 'server'.

### Pour le fichier .env du dossier client:

* ### PORT

`PORT`=3500 (Le port ne doit pas être modifié)

* ### Firebase Config

`VITE_FIREBASE_API_KEY`

`VITE_FIREBASE_AUTH_DOMAIN`

`VITE_FIREBASE_PROJECT_ID`

`VITE_FIREBASE_STORAGE_BUCKET`

`VITE_FIREBASE_MESSAGING_SENDER_ID`

`VITE_FIREBASE_APP_ID`


### Pour le fichier .env du dossier server:

* #### DB Config (MySQL)

`DB_USER`

`DB_PASS`

`DB_DATABASE`

`DB_HOST`

`DB_DIALECT`

* #### Clés JWT (Peuvent être remplacées selon vos besoins)

`ACCESS_TOKEN_SECRET`=cbc418e960cb688aae9f1a3a7f0214b43d42f04e06689cc66131d39a1206cbd4931a21d36f545c2f3c2a005cf12158065a99c4fe7aba517fe6063a9ca5ee16e2

`ACCESS_TOKEN_EXPIRY`=5s

`REFRESH_TOKEN_SECRET`=6abfcafe908a892c79f5297ec0099fdae379715e6e4830724187588bd4f0069f3c072f8105a5e3b550577a601a8e2c180831d9e021f490f770b0c414f7551b43

`REFRESH_TOKEN_EXPIRY`=7d

* #### Avatar

`AVATAR_NAME_DEFAULT_VALUE`=XXXX

`AVATAR_URL_DEFAULT_VALUE`=XXXX

## Lancer le projet

### Une fois l'installation terminée et les variables d'environnement renseignées, vous pourrez lancer le projet:

* Dans le terminal au dossier 'client' entrez la commande
```bash
  npm run dev
```

* De même pour le dossier 'server' lancez la commande
```bash
  npm run dev
```

* Ensuite dans votre navigateur, ouvrez une nouvelle page à l'url: http://localhost:3500/

## Documentation

[Description du projet](https://course.oc-static.com/projects/DWJ_FR_P7/DW+P7+28-09-2022+Sce%CC%81nario.pdf)

[Cachier des charges](https://course.oc-static.com/projects/DWJ_FR_P7/Cahier+des+charges+Groupomania.pdf)

