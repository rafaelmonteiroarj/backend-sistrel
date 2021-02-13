FROM node:latest

RUN mkdir -p /usr/app 
WORKDIR /usr/app

ARG port=3000
ENV PORT=$port

COPY package.json ./
RUN yarn install

COPY . ./

RUN yarn build

## mostra ás saídas de variáveis do ambientes...
RUN printenv 

RUN ls -la

EXPOSE 3000

CMD ["yarn", "live-reload"]
