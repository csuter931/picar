#!/usr/bin/env bash

sudo apt-get update
sudo apt-get install -y build-essential git curl

# Install Node Version Manager
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.2/install.sh | bash

source ~/.bashrc

nvm install v8.2.1

npm install socket.io node-static sleep optimist pi-blaster.js