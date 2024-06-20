/* eslint-disable */
const replaceInFile = require('replace-in-file');

const options = {
  files: 'dist/*.html',
  from: '/js/main.ts',
  to: './main.js',
};

try {
  replaceInFile.sync(options);
} catch (error) {
  console.error('Error occurred:', error);
}
