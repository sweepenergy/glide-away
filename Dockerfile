FROM node:14.1-alpine

# Install Yarn for faster installation and better caching on deps
RUN apk --no-cache add nodejs yarn --repository=http://dl-cdn.alpinelinux.org/alpine/edge/community

# Required for serial port reading
RUN apk --no-cache add g++ gcc libgcc libstdc++ linux-headers make python
RUN npm install --quiet node-gyp -g

WORKDIR /usr/src/app

# Copy rest of files over
COPY . .

# Install deps
RUN yarn install

# Install and Build frontend app
RUN cd /usr/src/app/app && yarn install 
RUN cd /usr/src/app/app && yarn build 
RUN cd /usr/src/app

# Expose port
EXPOSE 3000

# Run application
CMD [ "yarn", "docker" ]