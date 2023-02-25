
# Projet n°7 du parcours de développeur web chez Openclassrooms:
# Créez un réseau social d'entreprise

Le projet consiste à créer un réseau social interne pour les employés de l'entreprise Groupomania.

## Installation

Installez les packages avec npm, yarn ou pnpm

```bash
  cd client
  npm install
  
  cd server
  npm install
```

ou

```bash
  cd client
  yarn install
  
  cd server
  yarn install
```

ou encore

```bash
  cd client
  pnpm install

  cd server
  pnpm install
```
    
## 🛠 Outils utilisés

* MySQL
* Express
* Node.JS
* React
* Redux Toolkit & RTK Query

## Identité graphique

| Color             | Hex                                                                |
| ----------------- | ------------------------------------------------------------------ |
| Primaire | ![#FD2D01](https://via.placeholder.com/10/FD2D01?text=+) #FD2D01 |
| Secondaire | ![#FFD7D7](https://via.placeholder.com/10/FFD7D7?text=+) #FFD7D7 |
| Tertiaire | ![#4E5166](https://via.placeholder.com/10/4E5166?text=+) #4E5166 |


## Variables d'environnement

Pour lancer le projet, vous devrez ajouter ces variables d'environnement aux fichiers .sample.env (qu'il faudra renommer en '.env') et les completer avec vos informations (Le 1er fichier .sample.env se trouve dans le dossier client et le 2è dans le dossier server)

### Pour le fichier .env de la partie client:

* ### PORT

`PORT`=3500 (Le port ne doit pas être modifié)

* ### Firebase Config

`VITE_FIREBASE_API_KEY`

`VITE_FIREBASE_AUTH_DOMAIN`

`VITE_FIREBASE_PROJECT_ID`

`VITE_FIREBASE_STORAGE_BUCKET`

`VITE_FIREBASE_MESSAGING_SENDER_ID`

`VITE_FIREBASE_APP_ID`


### Pour le fichier .env de la partie server:

* #### DB Config (MySQL)

`DB_USER`

`DB_PASS`

`DB_DATABASE`

`DB_HOST`

`DB_DIALECT`


* #### Clés JWT

`ACCESS_TOKEN_SECRET`=cbc418e960cb688aae9f1a3a7f0214b43d42f04e06689cc66131d39a1206cbd4931a21d36f545c2f3c2a005cf12158065a99c4fe7aba517fe6063a9ca5ee16e2

`ACCESS_TOKEN_EXPIRY`=5s

`REFRESH_TOKEN_SECRET`=6abfcafe908a892c79f5297ec0099fdae379715e6e4830724187588bd4f0069f3c072f8105a5e3b550577a601a8e2c180831d9e021f490f770b0c414f7551b43

`REFRESH_TOKEN_EXPIRY`=7d


## Documentation

[Description du projet](https://course.oc-static.com/projects/DWJ_FR_P7/DW+P7+28-09-2022+Sce%CC%81nario.pdf)

[Cachier des charges](https://course.oc-static.com/projects/DWJ_FR_P7/Cahier+des+charges+Groupomania.pdf)


