#!/usr/bin/env sh

find '/usr/share/nginx/html' -name '*.js' -exec sed -i -e 's,API_REST_URL,'"$API_REST_URL"',g' {} \;
nginx -g "daemon off;"