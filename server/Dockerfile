FROM node:16.3.0

WORKDIR /app

COPY . .

RUN bash -c "npm install"

EXPOSE 5000

RUN bash -c "npm run clean:database"
RUN bash -c "npm run seed:database"

CMD ["npm", "start"]