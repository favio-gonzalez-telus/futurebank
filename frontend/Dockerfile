## Build
# docker build -t full-front:0.1.1 .

## Run
# docker run -e VITE_APP_API_URL=http://localhost:8500 -p -d 3000:3000 faviog2/futurebank_front:0.1.2

## Entrar al contenedor
# docker run -it full-front:0.1.0 /bin/bash

FROM node:18.9.0 as compilacion

COPY . /opt/app

WORKDIR /opt/app

ENV VITE_APP_API_URL=http://localhost:8500

RUN npm install --legacy-peer-deps -y

RUN npm run build

FROM node:18.9.0

ENV VITE_APP_API_URL=http://localhost:8500

COPY --from=compilacion /opt/app/dist /opt/app/dist

WORKDIR /opt/app

RUN npm install -g serve

CMD ["serve", "-s", "dist"]