/* eslint-disable no-console */
const { execSync } = require('child_process');
const handleOutput = require('./handleOutput');

const arg = process.argv[2];

if (arg === '--open') {
  execSync('open \'http://localhost:8080\' && webpack-dev-server --content-base public', handleOutput);
} else {
  execSync('webpack-dev-server --content-base public', handleOutput);
}

