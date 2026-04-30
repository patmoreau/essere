#!/bin/sh
# Entrypoint script to inject env vars into env-config.js
set -e

# Default to empty string if not set
: "${VITE_DIRECTUS_URL:=''}"

exec "$@"
