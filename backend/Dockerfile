FROM node:20 AS dev
WORKDIR /usr/src/app/backend
COPY package*.json ./
RUN npm install
COPY . .

FROM node:22-slim AS build
WORKDIR /usr/src/app/backend
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:22-slim AS production
WORKDIR /usr/src/app/backend
COPY package*.json ./
RUN npm install --omit=dev
COPY --from=build /usr/src/app/backend/dist ./dist
CMD ["node", "dist/main"]