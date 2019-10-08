
ARG builder_image
FROM ${builder_image} as basebuilder
FROM mhart/alpine-node:8

WORKDIR /usr/src/app
COPY package.json .
COPY package-lock.json .
RUN npm install --production --loglevel error
COPY --from=basebuilder /usr/src/app/dist /usr/src/app/dist
ENTRYPOINT node dist/server/start.js
#ENTRYPOINT node dist/server/start.{cms-alias}.js
#ENTRYPOINT node dist/server/start.{packagejson.name}.js
EXPOSE 3001
