# Build the React App
FROM node:14.1-alpine AS builder

RUN apk --no-cache add nodejs yarn --repository=http://dl-cdn.alpinelinux.org/alpine/edge/community

# set the working direction
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package*.json yarn.lock ./

RUN yarn

# add app
COPY . ./

# start app
CMD ["yarn", "start"]