# build stage
FROM node:16-alpine AS build
RUN rm -rf /app
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install --prefer-offline
COPY . .
RUN npm run build