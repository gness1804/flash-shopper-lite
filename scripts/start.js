/* eslint-disable no-console */
const { execSync } = require('child_process');
const handleOutput = require('./handleOutput');

const arg = process.argv[2];

if (arg === '--open') {
  execSync('open \'http://localhost:8080\' && http-serve ./public --gzip', handleOutput);
} else {
  execSync('http-serve ./public --gzip', handleOutput);
}

