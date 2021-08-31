#!/bin/bash
echo "Installing node modules (this can take a little time before you see anything)"
mkdir -p .docker-data/website/node_modules
docker-compose -f docker-compose-install-website-node-modules.yaml up
docker-compose -f docker-compose-prepare.yaml -f docker-compose.yaml up -d
