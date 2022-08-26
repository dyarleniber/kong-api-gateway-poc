# Kong API Gateway POC with Docker

A proof of concept for setting up Kong API Gateway on Docker using declarative configuration (DB-less) and custom Typescript plugins.

## Local setup

To clone and run this POC, you’ll need to have npm, Docker, and Docker Compose installed on your computer.

- Start the API gateway
```shell
docker-compose up
```

- Access the API using the `http://localhost:8000` base URL

- The following request should return 200
```shell
curl --location --request GET 'http://localhost:8000/gists'
```

- The following request should return 403
```shell
curl --location --request GET 'http://localhost:8000/poke'
```

- The following request should return 200
```shell
curl --location --request GET 'http://localhost:8000/poke' \
--header 'userId: user-id'
```
