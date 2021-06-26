# syntax=docker/dockerfile:1
FROM node:14 as build-deps
WORKDIR /app
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install
COPY . .
RUN npm run build

ENV NODE_ENV production
ENV PORT 3000
EXPOSE 3000
CMD ["npm", "start"]
