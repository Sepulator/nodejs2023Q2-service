# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the `npm` package manager.

## Docker images

Link to docker images [docker hub](https://hub.docker.com/r/sepulator/nest-api/tags)

## Downloading

```
git clone git@github.com:Sepulator/nodejs2023Q2-service.git
```

## Change branch to `develop`

```
git checkout develop
```

## Installing NPM modules

```
npm install
```

## Running application
Rename file `.env.example` to ` .env`

```
docker-compose up
```

## Scan vulnerabilities
Containers must be running

```
npm run scan
```

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```
### Auto-fix and format

```
npm run lint
```

```
npm run format
```
## Swagger documentation

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
