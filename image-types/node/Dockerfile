FROM node

LABEL maintainer="Danilo Sampaio <danilo.sampaio@gmail.com>"

USER node

ENV NPM_CONFIG_PREFIX=/home/node/.npm-global

ENV PATH=$PATH:/home/node/.npm-global/bin

RUN npm install -g nodemon

WORKDIR /home/node/app

CMD ["npm", "start"]