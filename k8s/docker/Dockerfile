FROM kong:3.0.1
USER root
RUN apk update && \
    apk add \
      nodejs \
      npm
RUN npm install -g kong-pdk@0.5.4
USER kong
ENTRYPOINT ["/docker-entrypoint.sh"]
EXPOSE 8000 8443 8001 8444
STOPSIGNAL SIGQUIT
HEALTHCHECK --interval=10s --timeout=10s --retries=10 CMD kong health
CMD ["kong", "docker-start"]
