# Build the React App
FROM node:14.1-alpine AS builder

RUN apk --no-cache add nodejs yarn --repository=http://dl-cdn.alpinelinux.org/alpine/edge/community

# Create directory to store app in
WORKDIR /opt/web
COPY package*.json yarn.lock ./
RUN yarn

# update path with node_modules to allow it to become accessible for later
ENV PATH="./node_modules/.bin:$PATH"

# copy the rest of the files over
COPY . ./

# actually build the app
RUN yarn build


# setup nginx to run the React app
FROM nginx:1.17-alpine

RUN apk --no-cache add curl
RUN curl -L https://github.com/a8m/envsubst/releases/download/v1.1.0/envsubst-`uname -s`-`uname -m` -o envsubst && \
    chmod +x envsubst && \
    mv envsubst /usr/local/bin
    
COPY ./nginx.conf /etc/nginx/nginx.template
CMD ["/bin/sh", "-c", "envsubst < /etc/nginx/nginx.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"]
COPY --from=builder /opt/web/build /usr/share/nginx/html