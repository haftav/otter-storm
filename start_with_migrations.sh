#!/bin/sh

set -ex
npm run db:migrate:up:prod
