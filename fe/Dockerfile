FROM node:alpine

WORKDIR /fe

COPY package*.json /fe/

RUN npm install

COPY . /fe/

EXPOSE 3000

CMD ["npm", "start"]
