#!/bin/bash
if [ "$NODE_ENV" = 'dev' ]; then
    echo "Development mode..."
    exec node_modules/.bin/nodemon src/index.js
else
    echo "Production mode..."
    exec node src/index.js
fi
