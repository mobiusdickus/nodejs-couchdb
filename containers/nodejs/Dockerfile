FROM node:18-alpine
WORKDIR /srv

COPY package*.json ./
RUN npm install

COPY start.sh .
COPY src/ src/
COPY scripts/ scripts/

CMD ["sh", "start.sh"]
