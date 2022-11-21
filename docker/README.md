# Kong API Gateway POC with Docker

A proof of concept for setting up Kong API Gateway on Docker using declarative configuration (DB-less) and custom Typescript plugins.

For more details, see [DB-less and Declarative Configuration](https://docs.konghq.com/gateway/latest/production/deployment-topologies/db-less-and-declarative-config/), [Install Kong Gateway on Docker](https://docs.konghq.com/gateway/3.0.x/install/docker/), [Use Plugins With Containers](https://docs.konghq.com/gateway/latest/plugin-development/pluginserver/plugins-kubernetes/), [Installing your plugin](https://docs.konghq.com/gateway/3.0.x/plugin-development/distribution/), [Plugins in Other Languages](https://docs.konghq.com/gateway/2.8.x/reference/external-plugins/) and [Plugins in Javascript/TypeScript](https://docs.konghq.com/gateway/3.0.x/plugin-development/pluginserver/javascript/).

## Local setup

- Start the API gateway
```shell
docker-compose up
```

- Access the API using the `http://localhost:8000` base URL

- The following request should return 200
```shell
curl -i --location --request GET 'http://localhost:8000/gists'
```

- The following request should return 400
```shell
curl -i --location --request GET 'http://localhost:8000/poke'
```

- The following request should return 403
```shell
curl -i --location --request GET 'http://localhost:8000/poke' \
--header 'userId: user-id'
```

- The following request should return 200
```shell
curl -i --location --request GET 'http://localhost:8000/poke' \
--header 'userId: 123'
```
