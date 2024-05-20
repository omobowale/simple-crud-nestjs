## Description

Simple application to create, read, update and delete tasks. 
 
## Technologies used
- Nestjs
- Sqlite
- TypeOrm
- Swagger

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Viewing the app
Use Postman or any other API request apps via http://localhost:4000

## Models

``` 
User
-- email - email of user
-- password - password of user
-- createdAt - date created
-- updatedAt - date updated

```



```
Task
-- title - title of the task
-- description - description of the task
-- status - status of the task whether pending or completed
-- createdAt - date created
-- updatedAt - date updated

```

## API Docs
- The APIs have been documented using Swagger. 
- The link is at: [api_docs](http://localhost:4000/docs)
