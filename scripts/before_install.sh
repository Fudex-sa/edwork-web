#!/bin/bash
sudo rm /opt/codedeploy-agent/deployment-root/deployment-instructions/*
rm -R /var/www/edwork/web
mkdir /var/www/edwork/web
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
sudo apt update && sudo apt install yarn