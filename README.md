# Currency Converter

Run `npm install` or `npm i` to install the backend and frontend dependencies.<br>
Run `npm run start` to start the server and client.<br>
Run `npm run start:watch` to start the server and client in development mode.<br>
<br>
Don't forget to set the environment variables before starting the server and client!<br>
<br>
<br>
<br>

# Backend

## Environment variables

File .env at the root of the project.

###### Template

```
PORT=<number>
MONGO_URI=<string>
TOKEN_EXPIRATION_TIME=<string>
JWT_SECRET_KEY=<string>
MORGAN_FORMAT=<string>
```

More about morgan format: https://www.npmjs.com/package/morgan <br>

###### Example

```
PORT=5000
MONGO_URI="mongodb://localhost:27017/CurrencyConverter"
TOKEN_EXPIRATION_TIME="12h"
JWT_SECRET_KEY="1fc0c785332e80fb931c7a11323f27abb47a0a7f8bbdf23ffca3cac46497b21c"
MORGAN_FORMAT="dev"
```

## Scripts

###### Production server

Run `npm run start` for a production server. Navigate to `http://localhost:{env.PORT}`.

###### Development server

Run `npm run start:watch` for a dev server. Navigate to `http://localhost:{env.PORT}`. The application will
automatically reload if you change any of the source files.<br>
<br>
<br>
<br>

# Frontend

## Environment variables

File src/environments/environment.prod.ts for production.<br>
File src/environments/environment.ts for development server and tests.<br>

###### Interface

```
export default interface EnvironmentInterface {
    production: boolean;
    serverUrl: string;
    delayBetweenRequestsToCrb: number;
}
```

###### Example

```
// File environment.prod.ts
export const environment: EnvironmentInterface = {
    production: true,
    serverUrl: 'http://localhost:5000',
    delayBetweenRequestsToCrb: 20 * 1000
};
```

## Scripts

###### Build

Run `npm run build` to build the project. The build artifacts will be stored in the `dist/` directory.

###### Production server

Run `npm run start` for a production server. Navigate to `http://localhost:4200`.

###### Development server

Run `npm run start:watch` for a dev server. Navigate to `http://localhost:4200`. The application will automatically
reload if you change any of the source files.

###### Running unit tests

Run `npm run test` to execute the unit tests via [Karma](https://karma-runner.github.io).
