const fs = require('fs-extra');
const childProcess = require('child_process');

try {
  // Remove current build
  fs.removeSync('./dist/');
  // Copy front-end files

  //fs.copySync('../../client/dist/spa', './src/public');
  fs.copySync('./src/public', './dist/src/public');
  //fs.copySync('./src/views', './dist/views');
  // Transpile the typescript files
  childProcess.exec('tsc --build tsconfig.prod.json');
} catch (err) {
  console.log(err);
}
