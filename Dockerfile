FROM node:24.9.0

WORKDIR /src

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["node", "dist/pocketduka/server/server.mjs"]