FROM node:24-alpine3.21

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=3001

# to generate prisma client
RUN npx prisma generate

# Expose the port app runs on
EXPOSE 3001

# Start the application
CMD ["node","index.js"]
