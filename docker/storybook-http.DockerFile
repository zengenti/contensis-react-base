
ARG builder_image
FROM ${builder_image} as basebuilder
FROM pierrezemb/gostatic
COPY --from=basebuilder  /usr/src/app/.out /usr/src/app/dist
ENTRYPOINT ["/goStatic", "--path", "/usr/src/app/dist", "--port", "80"]
