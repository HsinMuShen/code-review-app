FROM node:18-alpine
WORKDIR /app
COPY . .
RUN yarn 
ENV NODE_ENV="production"
RUN yarn build
CMD [ "yarn", "start" ]
