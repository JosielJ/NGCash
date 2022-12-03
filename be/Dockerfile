FROM node:16

WORKDIR /be

COPY package*.json /be/
COPY prisma /be/

#RUN apt-get -qy update && apt-get -qy install openssl

RUN npm install

RUN npm install prisma -d
RUN npm install @prisma/client

COPY . /be/

EXPOSE 8080

CMD ["npm", "run", "dev"]