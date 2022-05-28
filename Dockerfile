FROM node:17-alpine

WORKDIR /usr/app

COPY . .

RUN npm install

CMD ["npm", "start"]