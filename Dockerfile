# stage 1
FROM node:latest as node
WORKDIR /app
COPY . .
RUN npm install
COPY . /app
RUN npm run build --prod


# stage 1
FROM nginx:alpine
COPY --from=node /app/dist/user-corp /usr/share/nginx/html

RUN mv /etc/nginx/conf.d /etc/nginx/conf.d.bak
COPY --from=node /app/default.conf /etc/nginx/conf.d/default.conf