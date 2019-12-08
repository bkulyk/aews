# ==== some node modules require python to build
FROM node:12.13.1 as build

RUN mkdir /app
WORKDIR /app

COPY package*.json /app/
RUN npm install --production

COPY ./ /app/

# ==== use a smaller runtime environment because we don't require pythong to run
FROM node:12.13.1-alpine

ENV PORT 80
EXPOSE 80

ENV NODE_ENV development

RUN mkdir /app
WORKDIR /app

COPY --from=build /app /app

CMD ["./node_modules/.bin/pm2-docker", "-i", "0", "-n", "graphql", "start", "src/server.js"]
