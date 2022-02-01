# docker-node-demo

A crude NodeJS demo app attaching the local Docker socket that exposes the Docker CLI via REST.

> INTENDED FOR LOCAL DEMO PURPOSES ONLY!

This exposes the Docker CLI via REST. You **DO NOT** want this running in production. Or anywhere really for that matter.

## DO NOT RUN THIS ANYWHERE

^^^ just to be clear.

## Running Docker Node Demo

Ok, so you want to run this **locally** - just to test it out...

To run locally, simply clone this repo and compose up...

``` sh
git clone https://github.com/rjchicago/docker-node-demo.git

cd docker-node-demo

docker-compose up --build

open http://localhost:3000/ps
```

### samples links

* [docker ps](http://localhost:3000/ps)
* [docker image ls](http://localhost:3000/image/ls)
* [docker container logs docker_demo1](http://localhost:3000/container/logs/docker_demo1)

## Format JSON

You can format many docker command results as json. For example

``` sh
curl -H 'accept: application/json' http://localhost:3000/container/ls | jq
```

or via query param...

<http://localhost:3000/container/ls?format=application/json>

## Segment Templating

You may provide segment templates to be replaced by query params.

> Tip: you may pass multiple query params of the same name. (i.e. to support multiple ports or volumes)

Example:

<http://localhost:3000/run/--name/hello_nginx/-d/--rm/port/nginx?port=-p%208080:80&port=-p%208888:80>

Then check the process is running...

<http://localhost:3000/ps/filter/format?format=--format%20%22{{json%20.}}%22&filter=--filter%20%22name=hello_nginx%22>

Then see it working...

* <http://localhost:8080/>
* <http://localhost:8888/>

> Welcome to nginx!

Finally, stop the nginx container

<http://localhost:3000/container/kill/hello_nginx>
