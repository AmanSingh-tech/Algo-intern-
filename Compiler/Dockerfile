FROM node:24-alpine3.21

# Install C++ and Python
RUN apk add --no-cache g++ python3 py3-pip

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=3002

EXPOSE 3002

CMD ["node", "index.js"]
