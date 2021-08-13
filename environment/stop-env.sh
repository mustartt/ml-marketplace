#!/bin/bash
SCRIPT_PATH=$(dirname $(realpath -s $0))

echo "Stopping containers..."

docker-compose -p mlmp -f $SCRIPT_PATH/docker-compose.yml down