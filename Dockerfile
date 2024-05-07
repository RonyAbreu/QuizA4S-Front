FROM node:20.12.2-alpine
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
EXPOSE 80
CMD [ "npm", "run", "preview" ]