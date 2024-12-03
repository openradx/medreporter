#!/usr/bin/env bash

npm install

echo "DATABASE_URL=postgresql://postgres:postgres@db:5432/postgres" > .env

if [ -z "$CODESPACE_NAME" ]; then
  echo "NEXTAUTH_URL=https://$CODESPACE_NAME-3000.preview.app.github.dev" >> .env
  echo "NEXTAUTH_URL_INTERNAL=http://localhost:3000" >> .env
else
  echo "NEXTAUTH_URL=http://localhost:3000" >> .env
  echo "NEXTAUTH_URL_INTERNAL=http://localhost:3000" >> .env
fi

npm run db:migrate
npm run db:seed
