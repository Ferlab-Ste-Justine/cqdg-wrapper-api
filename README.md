<p align="center">
  <img src="cqdg_logo.svg" alt="CQDG repository logo" width="660px" />
</p>
<p align="center">
  <a href="https://opensource.org/licenses/Apache-2.0"><img src="https://img.shields.io/badge/License-Apache%202.0-blue.svg?style=for-the-badge"></a>
</p>

# cqdg-wrapper-api

This is an GraphQL API application for the CQDG portal, using ferlab-next library, with an integration with [Keycloak](https://www.keycloak.org/docs/latest/securing_apps/index.html#_nodejs_adapter) for authentication.

Arranger server is an application that wraps Elasticsearch and provides a GraphQL search API for consumption by the [CQDG Portal UI](https://github.com/Ferlab-Ste-Justine/cqdg-portal-ui).

## Development

* complete your .env file
* Execute: `npm run dev`

## Test build and Start

* Execute: `npm run build` then `npm run start`

### General

* Make sure that all the needed env vars point to where they should.

* When adding a new env var, update the .env.example. Otherwise, an error will be thrown.

* Installing dependencies: `npm install`.

### Test

* Execute: `npm run test`

### Development Setup with Docker

Before going further, make sure that ```docker``` and ```docker-compose``` are installed on your system.

```bash
# 1. clone the repository
  git clone https://github.com/Ferlab-Ste-Justine/cqdg-wrapper-api

# 2. enter the project's folder
  cd cqdg-wrapper-api

# 3. create an .env file (you may have to adjust the template to your needs)
  touch .env

# 4 in a terminal, run docker-compose from project's docker-compose file. 
  docker-compose --profile <target profile> up # for admin service

# 5 to clean up afterwards once your are done developing.
  docker-compose --profile  <target profile> down
```

Note: you can activate multiple profiles at once: ```docker-compose --profile a --profile b ... up```

:warning: _With this setup, your host and the app's container share the project directory/volume._
