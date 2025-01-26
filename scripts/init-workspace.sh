#!/usr/bin/env bash

EXAMPLE_ENV_FILE=$(dirname $0)/../example.env
ENV_FILE=$(dirname $0)/../.env

if [ -f $ENV_FILE ]; then
  echo "Workspace already initialized. Environment file already exists."
else
  cp $EXAMPLE_ENV_FILE $ENV_FILE

  if [ -v CODESPACE_NAME ]; then
    sed -i "s/^DATABASE_URL=.*/DATABASE_URL=postgresql:\/\/postgres:postgres@db:5432\/postgres/g" $ENV_FILE
    sed -i "s/^NEXTAUTH_URL=.*/NEXTAUTH_URL=https:\/\/$CODESPACE_NAME-3000.preview.app.github.dev/g" $ENV_FILE
  elif [ -v GITPOD_WORKSPACE_ID ]; then
    # We comment out the DATABASE_URL as it is already set in a Gitpod Postgres image
    sed -i "/DATABASE_URL/ s/^/#/" $ENV_FILE
    sed -i "s/^NEXTAUTH_URL=.*/NEXTAUTH_URL=$(gp url 3000)/g" $ENV_FILE
  fi
fi

npm install
npm run db:migrate
npm run db:seed
