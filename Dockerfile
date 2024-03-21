# build stage
FROM node:16-alpine as build-stage
WORKDIR /app
RUN npm install --save-dev @babel/plugin-proposal-private-property-in-object
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build