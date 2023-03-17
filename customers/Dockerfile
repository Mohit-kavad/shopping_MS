FROM node

WORKDIR /app/customers

COPY package.json .

RUN npm install 

COPY . . 

EXPOSE 8000

CMD [ "npm","run","dev" ]
