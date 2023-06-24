FROM node:18-alpine

ENV NODE_ENV=production

WORKDIR /app

COPY . .

RUN npm ci --omit=dev

RUN npm run build

EXPOSE 80

CMD [ "npm" , "run" , "start:prod" ]