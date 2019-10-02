
ARG builder_image
FROM ${builder_image} as basebuilder
FROM mhart/alpine-node:8

WORKDIR /usr/src/app
COPY package.json .
COPY package-lock.json .
COPY .env .
RUN npm install --production --loglevel error
COPY --from=basebuilder /usr/src/app/dist /usr/src/app/dist
ENTRYPOINT node dist/server.js
EXPOSE 3001
