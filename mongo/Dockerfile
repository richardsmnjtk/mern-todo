FROM mongo:3.6-xenial

maintainer andro.medh4@gmail.com

ENV MONGO_INITDB_ROOT_USERNAME root
ENV MONGO_INITDB_ROOT_PASSWORD czTGg54Epu
ENV MONGO_INITDB_DATABASE admin

ADD mongo-init.js /docker-entrypoint-initdb.d/
