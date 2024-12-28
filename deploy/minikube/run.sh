#!/bin/bash

minikube addons enable metrics-server

kubectl apply -f configmap
kubectl apply -f daemonset
kubectl apply -f services
kubectl apply -f networking

cd ingress-controller
./helm.sh
