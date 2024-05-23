
# Project 7 of the web development course with Openclassrooms:
# Build an enterprise social network

This project consists of creating the MVP of a social network for the groupomania company

## Back end Prerequisites
You will need to have Node and npm installed locally on your machine.

## Installation

To install the dependencies, open your terminal and navigate to the "client" folder

```bash
  cd client
```

Then install the dependencies with npm, yarn or pnpm

```bash
  npm install, yarn install or pnpm install
```

In another terminal, navigate to the "server" folder

```bash
  cd server
```

Then install the dependencies with npm, yarn or pnpm

```bash
  npm install, yarn install or pnpm install
```
    
## 🛠 Tools used
* MySQL
* Express
* Node.JS
* React
* Redux Toolkit & RTK Query
* Firebase

## Graphical identity

| Color             | Hex                                                                |
| ----------------- | ------------------------------------------------------------------ |
| Primary | ![#FD2D01](https://via.placeholder.com/10/FD2D01?text=+) #FD2D01 |
| Secondary | ![#FFD7D7](https://via.placeholder.com/10/FFD7D7?text=+) #FFD7D7 |
| Tertiary | ![#4E5166](https://via.placeholder.com/10/4E5166?text=+) #4E5166 |


## About Firebase

* You'll need to have an account on Firebase with a bucket on it

* In this bucket, you have to create a folder named "defaultAvatar"

### The folder defaultAvatar will have to have an image in it

* The name of this image will have to be entered in the environment variable of the "server" folder: "AVATAR_NAME_DEFAULT_VALUE"

* Its url will have to be entered in the environment variable of the "server" folder: "AVATAR_NAME_DEFAULT_VALUE"


## Environment variables

You'll need to complete the environment variables of the '.sample.env' files (which will have to be renamed '.env'). The first is in the 'client' folder and the second one is in the 'server' folder

### For the .env in the 'client' folder:

* ### PORT

`PORT`=3500 (The port should not be modified)

* ### Firebase Config (enter your bucket keys)

`VITE_FIREBASE_API_KEY`

`VITE_FIREBASE_AUTH_DOMAIN`

`VITE_FIREBASE_PROJECT_ID`

`VITE_FIREBASE_STORAGE_BUCKET`

`VITE_FIREBASE_MESSAGING_SENDER_ID`

`VITE_FIREBASE_APP_ID`

### For the .env in the 'server' folder:

* #### DB Config (MySQL) (enter your db config keys)

`DB_USER`

`DB_PASS`

`DB_DATABASE`

`DB_HOST`

`DB_DIALECT`

* #### JWT Keys (add a value to the tokens secret keys and expiration times)

`ACCESS_TOKEN_SECRET`

`ACCESS_TOKEN_EXPIRY`

`REFRESH_TOKEN_SECRET`

`REFRESH_TOKEN_EXPIRY`

* #### Avatar (add a default value for the avatar name and your image url for the avatar url)

`AVATAR_NAME_DEFAULT_VALUE`

`AVATAR_URL_DEFAULT_VALUE`

## Launch the project:

### Once the installation is complete and the environment variables are entered, you can start the project:

* In your terminal at the 'client' folder, enter the command:
```bash
  npm run dev
```

* And same in the 'server' folder, enter the command:
```bash
  npm run dev
```

* Then on your browser, open a new page at with url: http://localhost:3500/

## Documentation

[Project description](https://course.oc-static.com/projects/DWJ_FR_P7/DW+P7+28-09-2022+Sce%CC%81nario.pdf)

[Specifications](https://course.oc-static.com/projects/DWJ_FR_P7/Cahier+des+charges+Groupomania.pdf)

