# Basic Node Api Starter

A basic starter repo for creating a Node api with JWT authentication.

## Dependencies

| Package | Description |
| ------- | ----------- |
| [Express](http://expressjs.com) | Provides server routing etc |
| [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) | Auth using JWT |
| [mysql2](https://github.com/sidorares/node-mysql2) | Mysql database connector |
| [passport](http://www.passportjs.org) | Authentication middleware for Node.js |
| [passport-jwt](http://www.passportjs.org/packages/passport-jwt/) | Use JWT with Passport |
| [sequelize](https://sequelize.org) | Database ORM |



## Dev Dependencies

| Package | Description |
| ------- | ----------- |
| [Dotenv](https://github.com/motdotla/dotenv) | Use .env files in dev mode |
| [Nodemon](https://github.com/remy/nodemon/) | Dev server that auto-reloads when files change |

## Environment Variables

When running in development mode a .env file is used. See .env-example file.

| Variable | Description | Example | Required |
| -------- | ----------- | ------- | -------- |
| APP_PATH | Blank unless api is hosted in a sub-folder | my-api (e.g. https://my-site.com/my-api/api) | :negative_squared_cross_mark: (default is blank) |
| APP_PORT | Port the app is served from | 3000 | :negative_squared_cross_mark: (default: 8000) |
| DATABASE_NAME | Mysql database name | my_database | :white_check_mark: |
| DATABASE_PORT | Port the Mysql database is accessed at | 8889 | :white_check_mark: |
| DATABASE_USER | Mysql database user name | db_user_1 | :white_check_mark: |
| DATABASE_PASSWORD | Mysql database password | password123 | :white_check_mark: |

## Default endpoints

| Method | Endpoint | Description |
| ------ | -------- | ----------- |
| GET | http://localhost:8000/api/users | fetch all users |
| GET | http://localhost:8000/api/users/:id | fetch a specific user |
| POST | http://localhost:8000/api/users/register | create a user |
| POST | http://localhost:8000/api/users/login | login as a user |

| Method | Endpoint | Description |
| ------ | -------- | ----------- |
| GET | http://localhost:8000/api/todos | fetch all todos |
| GET | http://localhost:8000/api/todos/:id | fetch a specific todo |
| POST | http://localhost:8000/api/todos | create a todo |
| PUT | http://localhost:8000/api/todos/:id | update a specific todo |
| DELETE | http://localhost:8000/api/todos/:id | delete a specific todo |
