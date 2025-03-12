FROM node:23.9.0-bookworm-slim
WORKDIR /app
EXPOSE 3000
COPY package.json package-lock.json ./
RUN npm install
COPY . .
CMD [ "npm", "run", "dev" ]