const { execSync } = require('child_process');
const handleOutput = require('./handleOutput');

const arg = process.argv[2];

// eslint-disable-next-line no-console
console.info('Serving up the app on http://localhost:8080');

if (arg === '--open') {
  execSync(
    "open 'http://localhost:8080' && webpack-dev-server --content-base public",
    handleOutput,
  );
} else {
  execSync('webpack-dev-server --content-base public', handleOutput);
}
