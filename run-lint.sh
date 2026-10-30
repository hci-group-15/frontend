#!/bin/bash

docker run -v .:/mnt -e VITE_BACKENDLESS=true --name linter ghcr.io/janishutz/vue-dev-runner
docker exec linter bash -c "npm run type-check && npm run lint-fix"
docker stop linter
docker rm linter
