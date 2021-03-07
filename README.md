# Area

The goal of this project is to implement a software suite that functions similar to that of IFTTT and/or Zapier.
This software suite will be broken into three parts :
- An application server to implement all the features listed below (see Features)
- A web client to use the application from your browser by querying the application server
- A mobile client to use the application from your phone by querying the application server

## Pre-requisites

- Docker

## Features

Our application will offer the following functions :
- The user registers on the application in order to obtain an account
- The registered user then confirms their enrollment on the application before being able to use it
- The application then asks the authenticated user to subscribe to Services
- Each service offers the following components:
    - type Action
    - type REAction
- The authenticated user composes AREA by interconnecting an Action to a REAction previously configured
- The application triggers AREA automatically thanks to triggers

## Our Services

At this moment, there isn't any available services in the project. Our goal is to implement at least the Twitch, Imgur and Spotify services. 
**Some others services will be listed soon.**

## Run the project

You can run Area with two different ways. We recommend to run Area with Docker, but you can also run it directly on your command prompt.

### With Docker (recommended)

To run the project with Docker, you just have to run:
```
docker-compose up
```

### Without Docker

If you want to run the project without Docker, you have to install NodeJS with npm.
You also have to create a MySQL database named "areaDB". The user credentials for your MySQL database have to be updated inside the ``./server/src/config/db.config.js`` file. You can find the ``dump.sql`` file inside the ``./server`` folder.

**Before running any other part of the project, you have to start the backend part.**

To **run the backend** part of the application, you have to run theses commands inside the root project folder:
```shell
cd server
npm i
npm start
```

To **run the frontend** part of the application, you have to run theses commands inside the root project folder:
```shell
cd frontend
npm i
npm start
```

To **run the mobile app** part of the application, you have to run theses commands inside the root project folder:
```shell
cd mobile
npm i
expo start
```

The project also have an administrator panel for admin users. To **run the admin** part of the application, you have to run theses commands inside the root project folder:
```shell
cd admin
npm i
npm start
```

## Authors

[Thomas Boda](https://github.com/MrToto54 "Thomas Boda's GitHub profile"), [Alessandro Kurek](https://github.com/Aless54210 "Alessandro Kurek's GitHub profile"), [Quentin Demange](https://github.com/QuenDemange "Quentin Demange's GitHub profile"), [Baptiste Mayot](https://github.com/Hi-im-Dev "Baptiste Mayot's GitHub profile"), [Alban de Jong](https://github.com/adejong93 "Alban de Jong's GitHub profile") and [Clara Hottier](https://github.com/Clarahtt "Clara Hottier's GitHub profile")