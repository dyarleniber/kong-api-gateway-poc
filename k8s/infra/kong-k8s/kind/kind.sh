#!/bin/bash
kind create cluster --name kong-v1 --config clusterconfig.yaml
kubectl cluster-info --context kind-kong-v1
