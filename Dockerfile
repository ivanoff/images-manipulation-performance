FROM ubuntu:latest

RUN rm /bin/sh && ln -s /bin/bash /bin/sh

RUN apt-get update -y \
    && apt-get upgrade -y \
    && apt-get install -y build-essential python python3 libcairo2-dev libjpeg8-dev libpango1.0-dev \
        libgif-dev build-essential g++ imagemagick graphicsmagick

ENV TERM linux
ENV DEBIAN_FRONTEND noninteractive
ENV NVM_DIR /usr/local/nvm
ENV NODE_VERSION 10.16.0

RUN mkdir -p $NVM_DIR

# install nvm https://github.com/creationix/nvm#install-script
RUN curl --silent -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash

RUN source $NVM_DIR/nvm.sh \
    && nvm install $NODE_VERSION \
    && nvm alias default $NODE_VERSION \
    && nvm use default

ENV NODE_PATH $NVM_DIR/v$NODE_VERSION/lib/node_modules
ENV PATH $NVM_DIR/versions/node/v$NODE_VERSION/bin:$PATH

WORKDIR /opt/images

COPY ./src ./src
COPY ./package.json ./package.json

# confirm installation
RUN node -v
RUN npm -v

RUN npm install

CMD npm start
