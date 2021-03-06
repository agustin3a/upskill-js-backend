# BUILD
# docker build -t budget_api:<tag> -f DockerFile .
# RUN
# docker run -p 1337:1337 -e DB_USERNAME=postgres -e DB_PASSWORD=budget123 -e DB_DATABASE=budget -e DB_HOST=192.168.1.10 -d budget_api:1.0.0

FROM node:14.18.1

COPY . /opt/app

WORKDIR /opt/app

RUN npm install

EXPOSE 1337

CMD ["npm", "start"]