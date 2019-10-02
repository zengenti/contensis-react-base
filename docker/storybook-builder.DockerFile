# Very useful article on docker multi stage builds: https://snorre.io/building-docker-images-with-gitlab-ci/
FROM node:8 as builder
# The following prevents errors when cwebp is installing.
RUN apt-get update
RUN apt-get install libglu1 -y
WORKDIR /usr/src/app
# Seperating the copy of the package.json ensures the dockerbuild will cache the node_modules if the package.json has not changed
# When we auto increment the version, we should remove that as part of the copy to ensure the cache is maintained. i.e strip the version number before copying the file.
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY .storybook /usr/src/app/.storybook
COPY config /usr/src/app/config
COPY public /usr/src/app/public
COPY src /usr/src/app/src
COPY webpack /usr/src/app/webpack
COPY babel.config.js .
COPY .env .
COPY .eslintignore .
COPY .eslintignore .
COPY .nvmrc .
COPY .prettierignore .
COPY .prettierrc .
COPY .stylelintrc .

RUN npm run storybook-static
