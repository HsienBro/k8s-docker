FROM docker.io/library/node:20.12.2-alpine

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./
COPY tsconfig.json ./
COPY . .

RUN npm ci
RUN npm run build 

EXPOSE 8888

CMD ["npm", "run", "dev"]


