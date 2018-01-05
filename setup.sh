#!/usr/bin/env bash

# Install some linux system dependencies
sudo apt update
sudo apt install -y build-essential git curl

# Install Node Version Manager
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.2/install.sh | bash

source ~/.bashrc

# Install version v8.2.1 of the `$ node` command
nvm install v8.2.1

# Install the dependencies required by our application
# These dependencies are listed in the `package.json` file
npm install

# Automatically run the node-server.sh shell script
# whenever the pi is booted.
# node-server.sh is a shell script that simply calls `node /path/to/app.js`
# just as you would if you were starting this app manually.
sudo cp node-server.sh /etc/init.d/
sudo update-rc.d node-server.sh defaults
