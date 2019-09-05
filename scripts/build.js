/* eslint-disable no-console */
const { execSync } = require('child_process');
const handleOutput = require('./handleOutput');

const arg = process.argv[2];

if (arg === '--nogzip') {
  execSync('cross-env NODE_ENV=production webpack', handleOutput);
  console.info('Successfully built full sized bundle.');
} else {
  execSync('cross-env NODE_ENV=production webpack && precompress public', handleOutput);
  console.info('Successfully built compressed bundle.');
}
