/* eslint-disable */
const fs = require('fs-extra');

const FILES = [
  {
    source: 'public/index.html',
    destination: 'dist/index.html',
  },
  {
    source: 'public/img',
    destination: 'dist/img',
  },
  {
    source: 'public/levels',
    destination: 'dist/levels',
  },
];

FILES.forEach(({source, destination}) => {
  fs.copy(source, destination, (err) => {
    if (err) throw err;
    console.log(`${source} was copied to dist`);
  });
});
