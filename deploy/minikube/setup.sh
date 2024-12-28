#!/bin/bash

# set working directory to project root
curpath=$(pwd)
curdir="${curpath##*/}"
echo $curdir
if [[ "$curdir" -eq "minikube" ]]; then
  echo "cd to project root"
  cd ../..
elif [[ "$curdir" -eq "deploy" ]]; then
  echo "cd to project root"
  cd ..
fi

cd frontend
docker build -t xenoblast-frontend-assets:latest .
cd -

cd backend
docker build --build-arg ENTRY_PKG=./cmd/http_service -t xenoblast-http-service:latest .
docker build --build-arg ENTRY_PKG=./cmd/websocket_service -t xenoblast-websocket-service:latest .
docker build --build-arg ENTRY_PKG=./cmd/auth_service -t xenoblast-auth-service:latest .
docker build --build-arg ENTRY_PKG=./cmd/matchmaking_service -t xenoblast-matchmaking-service:latest .
docker build --build-arg ENTRY_PKG=./cmd/game_service -t xenoblast-game-service:latest .

minikube image load xenoblast-frontend-assets
minikube image load xenoblast-http-service
minikube image load xenoblast-websocket-service
minikube image load xenoblast-auth-service
minikube image load xenoblast-matchmaking-service
minikube image load xenoblast-game-service
