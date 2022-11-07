FROM node:18.12.0-bullseye-slim

COPY . ./app

RUN corepack enable

WORKDIR /app

RUN yarn install

WORKDIR /app/app

RUN yarn install

WORKDIR /app

RUN yarn workspace app start --host

EXPOSE 5173
