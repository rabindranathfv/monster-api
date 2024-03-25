# Elixir Challenge

This challenge was implemented with NestJs, MongoDB as main DataBase, and redis for Cache purposes

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

</p>

### Information Important

1. [Project structure](#project-structure)
2. [backend-config](#backend-config)
3. [api-key](#api-key)
4. [docs](#docs)
5. [enviroments-url](#enviroments-url)
6. [test](#test)

## Project Structure

<a name="project-structure"/>

The structure of this project defined by folders related with each modules or main functionalitie, each module should have at least controller, service, repositories, schema and dto. Follow by constants, custom decorators, guards,helpers, interfaces, types, etc.

```
.
├── src
│   ├── auth                # authentication, authorization and user module
│   │   ├── auth.controller.ts
│   │   ├── auth.module.ts
│   │   ├── auth.service.ts
│   │   ├── constants       # constants
│   │   │   └── constants.ts
│   │   ├── decorators      # custom decorators
│   │   ├── dto
│   │   ├── guard           # guards
│   │   ├── helpers
│   │   ├── interfaces
│   │   ├── repository
│   │   ├── shema
│   │   ├── strategies
│   │   ├── types
│   │   └── user
│   │       ├── repository
│   │       ├── user.controller.spec.ts
│   │       ├── user.controller.ts
│   │       ├── user.service.spec.ts
│   │       └── user.service.ts
│   ├── common            # common module
│   │   ├── common.module.ts
│   │   ├── dto
│   │   ├── middleware    # common middlewares
│   │   ├── pipes         # custom pipes
│   ├── config            # global config
│   ├── main.ts
│   └── monster
│       ├── dto
│       ├── monster.controller.spec.ts
│       ├── monster.controller.ts
│       ├── monster.module.ts
│       ├── monster.service.spec.ts
│       ├── monster.service.ts
│       ├── repository
│       ├── schema
│       └── types
├── test
└── tsconfig.json..
```

## Backend-config

<a name="backend-config"/>

for backend you must config at least one .env.<enviroment-name>.local files, this API supports 4 enviroments files (.env.test.local, .env.development.local,.env.staging.local and .env.production.local). You have a sample.env config and check it please.

configure your enviroment variables based on sample.env (use the same DB_HOST,DB_PORT, REDIS_PORT and REDIS_HOST because it's used with docker compose)

```
NODE_ENV=development
PORT=3000

# FOR LOCAL
DB_HOST=mongo_db
DB_PORT=27017
DB_NAME=monster-db

# DB_Host is mongo_db when docker compose is up and running
MONGO_URL=mongodb://mongo_db:27017/monster-db

DEFAULT_LIMIT=5

# caching env variables
# LOCAL CONFIG for caching env variables
TTL_CACHE=100
REDIS_HOST=redis_db
REDIS_PORT=6379

# request rate limit per request
REQUEST_TTL=10
REQUEST_LIMIT=3

# API KEY
API_KEY=BoredMike

# jwt
JWT_SECRET=someSecret
JWT_EXPIRES_IN=4h
```

After setting your .env.development.local you must run the following command in your terminal

```bash
docker-compose -f docker-compose.yml --env-file .env.development.local up --build
```

if you need to delete all the docker container generated you can run

```bash
docker-compose -f docker-compose.yml --env-file .env.development.local down
```

now if you want to run with production config use those command (you must have configured .env.production.local)

```bash
docker-compose -f docker-compose.prod.yml --env-file .env.production.local up --build --force-recreate
```

if you need to delete all the docker container generated you can run

```bash
docker-compose -f docker-compose.prod.yml --env-file .env.production.local down --remove-orphans
```

## api-key

<a name="api-key"/>

the current solution is with a custom header called `x-api-key` you have 2 values `PUBLIC` which is for public endpoints and the current apiKey setting into your .env.<enviroment>.local on the API_KEY

## docs

<a name="docs"/>

you can use the swagger docs it's going to be available on the endpoint `<baseApiUrl>/api/v1/docs` or you can export a postman collection into folder called `collection`. Remenber setup the api url properly

## Enviroment URL

<a name="enviroment-url"/>

there is available two enviroments development and production, API URL for development is `https://monster-api-dev-development.up.railway.app`, health check endpoint `https://monster-api-dev-development.up.railway.app/api/v1/`, anddocs `https://monster-api-dev-development.up.railway.app/api/v1/docs`.

Production enviroment with API URL `https://monster-api-production.up.railway.app/`, health check endpoint `https://monster-api-production.up.railway.app/api/v1/`, and docs `https://monster-api-production.up.railway.app/api/v1/docs`

IMPORTANT: any of those server could be down, because i am using a free tier from railway.app (if you have any trouble you can send me an email and i will rebuild an prepare)

## Test

<a name="test"/>

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
