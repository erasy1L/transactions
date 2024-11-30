FROM node:20 AS dev

WORKDIR /usr/src/app/frontend
COPY package*.json ./
RUN npm install
COPY . .

FROM node:20 AS build

WORKDIR /usr/src/app/frontend
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:20-slim AS production

WORKDIR /usr/src/app/frontend
COPY --from=build /usr/src/app/frontend/dist /usr/src/app/frontend/dist

RUN npm install -g serve

EXPOSE 5000

CMD ["serve", "-s", "build", "-l", "5000"]
