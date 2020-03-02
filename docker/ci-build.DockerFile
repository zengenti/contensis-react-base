
ARG builder_image
FROM ${builder_image} as basebuilder
FROM mhart/alpine-node:8

WORKDIR /usr/src/app
COPY package.json .
COPY package-lock.json .
RUN npm install --production --loglevel error
COPY --from=basebuilder /usr/src/app/dist /usr/src/app/dist

# Standard classic start script, will start the server with the environment started last 
# (or using configuration from the default .env if never started)
ENTRYPOINT node dist/server/start.js

# Start the server using just a cms alias targeting the specific start script
#ENTRYPOINT node dist/server/start.{cms-alias}.js

# Start the server using a project id and cms alias targeting the specific start script
#ENTRYPOINT node dist/server/start.{project}.{cms-alias}.js

# Start the server configured for a given cms alias where the projectId is 'website' using env variable
#ENTRYPOINT npm --start={cms-alias} run-script server

# Start the server configured for a given cms alias targeted to a specific project using env variable
#ENTRYPOINT npm --start={project}.{cms-alias} run-script server

# Start the server using the packagejson.name as a parameter using configuration from the default .env
#ENTRYPOINT node dist/server/start.{packagejson.name}.js

EXPOSE 3001
