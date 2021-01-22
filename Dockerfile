# Stage 1
FROM node:10-alpine as build-step
RUN mkdir -p /app
WORKDIR /app
COPY package.json /app
RUN npm install
ENV API_REST_URL=http://172.16.8.161:8085/v2/api/
COPY . /app
RUN npm run build

# Stage 2
FROM nginx:1.17.1-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build-step /app/dist /usr/share/nginx/html
COPY --from=build-step /app/scripts/replace_api_url.sh /

CMD ["sh", "replace_api_url.sh"]