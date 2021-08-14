FROM 14.17.5-alpine3.12

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn && yarn cache clean

COPY . ./

RUN yarn build
RUN yarn global add serve
RUN cp serve.json build/serve.json

EXPOSE 3000

CMD [ "serve", "-s", "build", "-l", "3000" ]
