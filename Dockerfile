FROM node:17-alpine

RUN apk add --update docker

WORKDIR /usr/app

COPY package*.json .
COPY src src

RUN npm install

EXPOSE 3000
CMD ["npm", "run", "start"]