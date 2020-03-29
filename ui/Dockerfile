# base image
FROM node:10.15

# install and cache app dependencies
COPY package.json yarn.lock /tmp/
RUN cd /tmp && yarn install

# set working directory
RUN mkdir /usr/src/app && \
    cd /usr/src/app && \
    ln -s /tmp/node_modules
WORKDIR /usr/src/app

COPY ./ /usr/src/app
# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /usr/src/app/node_modules/.bin:$PATH
RUN yarn install 

# start app
CMD ["yarn", "start"]
