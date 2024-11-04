FROM node:20.17

WORKDIR /index

RUN npm install

EXPOSE 3000

CMD ["node", "index.js"]



