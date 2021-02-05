FROM node:15.4

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3002
CMD [ "npm", "start" ]