#!/bin/sh

export ENVIRONMENT=$NODE_ENV
echo "$ENVIRONMENT";

# if [ "$ENVIRONMENT" == "production" ];
# then
npm run db:deploy
# else
#   npm run db:dev:up
# npm run db:dev:start
# fi