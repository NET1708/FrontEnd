# build stage
FROM node:16-alpine as build-stage
WORKDIR /app
RUN npm install axios
RUN npm i @types/axios
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build