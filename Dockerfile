FROM node:12.3

ENV PORT 80
EXPOSE 80

ENV NODE_ENV development

RUN mkdir /app
WORKDIR /app

COPY package*.json /app/
RUN npm install --production

COPY ./ /app/

CMD ["./node_modules/.bin/pm2-docker", "-i", "0", "-n", "graphql", "start", "src/server.js"]
