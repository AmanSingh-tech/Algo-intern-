FROM node:24-alpine3.21


# Install only g++
RUN apk add --no-cache g++

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=3002

# Expose the port app runs on
EXPOSE 3002

# Start the application
CMD ["node", "index.js"]
