# Used to emulate routing
FROM haproxy:1.7
COPY docker/haproxy.cfg /usr/local/etc/haproxy/haproxy.cfg
