#! /bin/bash
docker exec info-screen_hasura_1 hasura-cli init /home/hasura
docker exec info-screen_hasura_1 hasura-cli metadata export --project /home/hasura
docker cp info-screen_hasura_1:/home/hasura/metadata/ ./
