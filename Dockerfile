# Let's start with sails preconfigured image

FROM    luis/sails:latest

# Bundle app source
COPY . /var/www/korko

WORKDIR /var/www/korko

# Install app dependencies
RUN npm install; npm install multer

EXPOSE  1337

CMD ["/var/www/korko/deployment/run.sh"]
