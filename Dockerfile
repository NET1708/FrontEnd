# build stage
FROM node:16-alpine as build-stage
RUN rm -rf /app
RUN rm -rf /app/*
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build