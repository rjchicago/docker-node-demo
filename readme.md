# docker-node-demo

A crude NodeJS demo app attaching the local Docker socket that exposing Docker CLI via REST.

> INTENDED FOR LOCAL DEMO PURPOSES ONLY!

This exposes the Docker CLI via REST. You **don't** want this running in production. 

## running

``` sh
docker-compose up
open http://localhost:3000/ps
```

## samples links

* [docker ps](http://localhost:3000/ps)
* [docker image ls](http://localhost:3000/image/ls)
* [docker container logs docker_demo1](http://localhost:3000/container/logs/docker_demo1)

## sample json

``` sh
curl -H 'accept: application/json' http://localhost:3000/container/ls | jq
```
