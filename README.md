# Kong API Gateway POC

A proof of concept for setting up Kong API Gateway on Kubernetes using declarative configuration (DB-less) and custom Typescript plugins.

## Local setup

To clone and run this POC, you’ll need to have [Git](https://git-scm.com), [kubectl](https://kubernetes.io/docs/tasks/tools/#kubectl), [Helm](https://helm.sh/), and [kind](https://kind.sigs.k8s.io) installed on your computer.

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
./infra/kong-k8s/kind/kind.sh
```

- Make sure the cluster is provisioned
```shell
kubectl get pods -A
```

- Once the cluster is provisioned, install Kong
```shell
./infra/kong-k8s/kong/kong.sh
```

- Make sure Kong is running
```shell
kubectl get pods -n kong
```

- Check the Kong logs
```shell
kubectl logs <POD_ID> proxy -n kong
```

- Create the services
```shell
kubectl create ns bets
```
```shell
kubectl apply -f ./infra/kong-k8s/misc/apps --recursive -n bets
```

- Create routes
```shell
kubectl apply -f ./infra/kong-k8s/misc/apis/bets-api.yaml -n bets
```

- Create Kong ingress
```shell
kubectl apply -f ./infra/kong-k8s/misc/apis/king.yaml -n bets
```

- Make sure the pods are running
```shell
kubectl get pods -n kong
```

- Check the Kong logs
```shell
kubectl logs <POD_ID> proxy -f -n kong
```

- Access the API using the following URL
```shell
http://localhost/api/bets
```
