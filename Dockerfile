FROM node:10.15.0-jessie

# Create app directory
WORKDIR /usr/src/app
COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "start"]