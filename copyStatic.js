const fs = require('fs-extra');
const path = require('path');

const source = path.join(__dirname, 'public/static');
const destination = path.join(__dirname, 'dist/static');

fs.copy(source, destination)
  .then(() => console.log('Static files copied successfully!'))
  .catch((err) => console.error(err));
