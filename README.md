# nest-react-contacts-app
## Tools used:

Frontend: react, redux
Backend: nest.js
Database: postgresql with Typeorm

## Preparation & installation steps:

```bash

$ git clone https://github.com/raushanmahmud/nest-react-contacts-app.git
$ cd frontend
$ npm install
$ cd ..
$ cd nest-contacts-app
$ npm install

```

## Running the app in development mode

```bash
# frontend
# from cloned folder's root:

$ cd frontend/
$ npm run start

#the frontend app will start in localhost:4000 in dev mode

```
```bash
# backend
# from cloned folder's root:

$ cd nest-contacts-app/
$ npm run start:dev

#the backend app will start in localhost:3000 in dev mode, main endpoint: /contacts/

```

## Running the app in production mode

```bash
# frontend
# from cloned folder's root:

$ cd frontend/
$ npm run build

# start the server, for example:
$ serve -s build

#the frontend app will start in localhost:5000 in production mode

```
```bash
# backend
# from cloned folder's root:

$ cd nest-contacts-app/
$ npm run build
$ npm run start:prod

#the backend app will start in localhost:3000, api endpoint /contacts/

```


