# Let's start with sails preconfigured image

FROM    luis/sails:latest

# Add the source code
# ADD . /var/www/korko

# Define working directory
WORKDIR /var/www/korko

# http://anandmanisankar.com/posts/docker-container-nginx-node-redis-example/
# Provides cached layer for node_modules
# ADD package.json /tmp/package.json
# RUN mkdir -p /var/www/korko/ && cp -a /tmp/node_modules /var/www/korko/


# Install app dependencies
# RUN npm install; npm install multer; GIT_DIR=/var/www/korko bower install --config.interactive=false --allow-root
# RUN npm install && npm install multer

EXPOSE  1337

# CMD ["/var/www/korko/deployment/run.sh"]
