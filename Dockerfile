FROM node:latest

# Create app directory
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 2999

CMD [ "node", "server.js" ]

