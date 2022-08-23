

# NestJS White Label Back-end

[![License](https://img.shields.io/github/license/saluki/nestjs-template.svg)](https://github.com/saluki/nestjs-template/blob/master/LICENSE)

This project aims to provide a generic backend (white label) so that it can be used in projects with different purposes.

This application can serve as a basis for developing a new project, as it delivers a complete pre-configured structure with JWT authentication, and some ready-made components (user CRUD, etc.), facilitating and speeding up the start of the application.

## Getting started

### - Requirements

Before starting, make sure you have those components on your workstation:

- NodeJS and NPM
- PostgreSQL

### - Project configuration

Start by cloning this project on your workstation.

``` sh
git clone https://github.com/EmerHoff/whitelabel-backend
```

The next thing will be to install all the dependencies of the project.

```sh
cd ./whitelabel-backend
npm install
```

### - Launch and discover

You are now ready to launch the NestJS application using the command below.

```sh
# Perform migrations in your database using TypeORM
npm run migration:run

# Launch the Admin Application
npm run start:admin

# Launch the App Application
npm run start:admin
```

Now your server is runnig in `http://localhost:3000/`

You can see the API docs [here](https://documenter.getpostman.com/view/5283354/UzXKVyBE).

For restricted routes, you have to create a user and authenticate on API.
