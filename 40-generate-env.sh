#!/bin/sh

cat <<EOF > /usr/share/nginx/html/env-config.js
window.env = {
  "VITE_DIRECTUS_URL": "${VITE_DIRECTUS_URL}"
};
EOF