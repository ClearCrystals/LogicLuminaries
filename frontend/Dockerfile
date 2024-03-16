FROM node:21-alpine

ENV NODE_ENV production

WORKDIR /app/frontend

COPY package*.json ./

RUN npm install

RUN mkdir -p node_modules/.cache && chmod -R 777 node_modules/.cache

USER node

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
