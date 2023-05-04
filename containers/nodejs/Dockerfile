FROM node:18-alpine
WORKDIR /srv

COPY package*.json ./
RUN npm install

COPY ./start.sh .
COPY ./src .

CMD ["sh", "start.sh"]
