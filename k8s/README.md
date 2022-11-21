# Kong API Gateway POC with Kubernetes

A proof of concept for setting up Kong API Gateway on Kubernetes using declarative configuration (DB-less) and custom Typescript plugins.

Kong is a highly configurable piece of software that can be deployed in a number of different ways, depending on your use-case.

**The recommended deployment approach is to use the Ingress Controller based configuration along-with DB-less mode.**

For more details, see [Kubernetes Ingress Controller Design](https://docs.konghq.com/kubernetes-ingress-controller/2.7.x/concepts/design/), [Getting started with the Kubernetes Ingress Controller](https://docs.konghq.com/kubernetes-ingress-controller/2.7.x/guides/getting-started/), [Setting up custom plugin in Kubernetes environment](https://docs.konghq.com/kubernetes-ingress-controller/latest/guides/setting-up-custom-plugins/), [Use Plugins With Containers](https://docs.konghq.com/gateway/latest/plugin-development/pluginserver/plugins-kubernetes/), [Installing your plugin](https://docs.konghq.com/gateway/3.0.x/plugin-development/distribution/), [Plugins in Other Languages](https://docs.konghq.com/gateway/2.8.x/reference/external-plugins/) and [Plugins in Javascript/TypeScript](https://docs.konghq.com/gateway/3.0.x/plugin-development/pluginserver/javascript/).
The official Kong Ingress Controller is open-source and available on [this GitHub repository](https://github.com/Kong/kubernetes-ingress-controller).

Kong can be installed on many systems. For Kubernetes, it can be installed [using YAML Manifests](https://docs.konghq.com/gateway/3.0.x/install/kubernetes/kubectl/)  or [using a Helm Chart](https://docs.konghq.com/gateway/3.0.x/install/kubernetes/helm-quickstart/).

## Local setup

To clone and run this POC, you’ll need to have Git, Docker, [kubectl](https://kubernetes.io/docs/tasks/tools/#kubectl), and [minikube](https://github.com/kubernetes/minikube) installed on your computer.

- Clone this repository
```shell
git clone git@github.com:dyarleniber/kong-api-gateway-poc.git
```

- Go into the repository folder
```shell
cd kong-api-gateway-poc/k8s
```

- Start minikube
```shell
minikube start
```

- Set up the services
```shell
kubectl apply -f ./services --recursive
```

- Set up Ingress rules
```shell
kubectl apply -f ./ingress --recursive
```

- Make sure the pods are running
```shell
kubectl get pods
```

- Create a new namespace for Kong
```shell
kubectl create ns kong
```

- Create a ConfigMap with the custom plugins
```shell
kubectl create configmap kong-plugin-dummy-auth --from-file=plugins/dummy-auth -n kong
```

- Install Kong Ingress Controller
```shell
kubectl apply -f kong/kong-ingress.yaml -n kong
```

- Make sure the Kong pods are running
```shell
kubectl get pods -n kong
```

- Set up the custom plugins
```shell
kubectl apply -f plugins/dummy-auth.yaml && \
kubectl patch ingress secure-kong-services -p '{"metadata":{"annotations":{"konghq.com/plugins":"dummy-auth-plugin"}}}'
```

- Use the `minikube tunnel` command to expose the Kong service to the localhost
```shell
minikube tunnel
```

- Invoke a test request
```shell
curl localhost
```

- This should return the following response from Gateway:
```
{"message":"no Route matched with those values"}
```

- Access the API using the paths defined in the ingress rules (replace `localhost` with the minikube service IP address if you are not using the `minikube tunnel` command)

- The following request to the `echo` service should return 200
```shell
curl -i localhost/echo
```

- The following request to the `httpbin` service should return 200
```shell
curl -i localhost/httpbin/status/200
```

- The following request to the secure `httpbin` service without `userId` should return 400
```shell
curl -i localhost/secure/httpbin/status/200
```

- The following request to the secure `httpbin` service with wrong `userId` should return 403
```shell
curl -i localhost/secure/httpbin/status/200 -H 'userId: user-id'
```

- The following request to the secure `httpbin` service should return 200
```shell
curl -i localhost/secure/httpbin/status/200 -H 'userId: 123'
```
