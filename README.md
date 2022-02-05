# nest-react-contacts-app
Tools used:

Frontend: react, redux
Backend: nest.js
Database: postgresql with Typeorm

Preparation & installation steps:

1. git clone https://github.com/raushanmahmud/nest-react-contacts-app.git
2. cd frontend
3. npm install
4. cd ..
5. cd nest-contacts-app
6. npm install

To run in DEVELOPMENT mode:
a. front
    from cloned folder's root:
    1. cd frontend
    2. npm run start
    the frontend app will start in localhost:4000 in dev mode

b. backend
    from cloned folder's root:
    1. cd nest-contacts-app
    2. npm run start:dev
    the nest.js app will start in localhost:3000, api endpoint /contacts/
    

To run in PRODUCTION mode:
a. front
    from cloned folder's root:
    1. cd frontend
    2. npm run build
    3. start the server(for example run: serve -s build)
    the frontend app will start in localhost:5000 in prod mode

b. backend
    from cloned folder's root:
    1. cd nest-contacts-app
    2. npm run build
    2. npm run start:prod
    the nest.js app will start in localhost:3000, api endpoint /contacts/

