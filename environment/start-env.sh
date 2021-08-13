#!/bin/bash
SCRIPT_PATH=$(dirname $(realpath -s $0))

echo "Starting containers..."

docker-compose -p mlmp -f $SCRIPT_PATH/docker-compose.yml up -d --build

echo
printf "Waiting for DB..."
while ! curl http://localhost:10001/ 2>&1 | grep '52'
do
  printf "."
  sleep 1
done
printf "\n"

