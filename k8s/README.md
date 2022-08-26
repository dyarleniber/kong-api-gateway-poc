# Kong API Gateway POC with Kubernetes

A proof of concept for setting up Kong API Gateway on Kubernetes using declarative configuration (DB-less) and custom Typescript plugins.

Kong is a highly configurable piece of software that can be deployed in a number of different ways, depending on your use-case.
All combinations of various runtimes, databases and configuration methods are supported by [this Helm chart](https://github.com/Kong/charts/tree/main/charts/kong).

**The recommended deployment approach is to use the Ingress Controller based configuration along-with DB-less mode.**

For more details, see [How to Install on Kubernetes with Helm](https://docs.konghq.com/gateway/2.8.x/install-and-run/helm/) and the [readme file in the chart repository](https://github.com/Kong/charts/blob/main/charts/kong/README.md).

## Local setup

To clone and run this POC, you’ll need to have npm, Git, Docker, Kubernetes, [kubectl](https://kubernetes.io/docs/tasks/tools/#kubectl), [Helm](https://helm.sh/), and [kind](https://kind.sigs.k8s.io) installed on your computer.

- Clone this repository
```shell
git clone git@github.com:dyarleniber/kong-api-gateway-poc.git
```

- Go into the repository folder
```shell
cd kong-api-gateway-poc
```

- Create a local Kubernetes cluster using [kind](https://kind.sigs.k8s.io)
```shell
cd infra/kong-k8s/kind
```
```shell
./kind.sh
```
```shell
cd ../../../
```

- Make sure the cluster is provisioned
```shell
kubectl get pods -A
```

- Create kong namespace
```shell
kubectl create ns kong
```

- Create a ConfigMap with the custom Typescript Plugins
```shell
kubectl create configmap dummy-auth --from-file=./infra/kong-k8s/misc/plugins -n kong
```

- Once the cluster is provisioned, deploy Kong Gateway with Kubernetes Ingress Controller using [Helm](https://helm.sh/)
> In the file [kong-config.yaml](./infra/kong-k8s/kong/kong-conf.yaml) replace `/Users/admin/workspace/personal/kong-api-gateway-poc/infra/kong-k8s/misc/plugins` with the paths that the plugins are stored. 
```shell
cd infra/kong-k8s/kong
```
```shell
./kong.sh
```
```shell
cd ../../../
```

- Make sure the Kong pod is running
```shell
kubectl get pods -n kong
```

- Check the Kong pod logs
```shell
kubectl logs <POD_NAME> proxy -n kong
```

- Set up custom Typescript Plugins
```shell
kubectl apply -f ./infra/kong-k8s/misc/plugins/dummy-auth.yaml -n bets
```

- Set up the services
```shell
kubectl create ns bets
```
```shell
kubectl apply -f ./infra/kong-k8s/misc/apps --recursive -n bets
```

- Set up Ingress
```shell
kubectl apply -f ./infra/kong-k8s/misc/apis/bets-api.yaml -n bets
```
```shell
kubectl apply -f ./infra/kong-k8s/misc/apis/king.yaml -n bets
```

- Make sure the pods are running
```shell
kubectl get pods -n kong
```

- Access the API using the following URL
```shell
http://localhost/api/bets
```
