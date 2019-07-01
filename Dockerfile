FROM node:8.11.2
RUN mkdir -p /opt/services/front/src
RUN mkdir -p /usr/share/nginx/html
WORKDIR /opt/services/front/src
COPY . /opt/services/front/src
RUN npm install
RUN npm run-script build
RUN cp -r /opt/services/front/src/build /usr/share/nginx/html
