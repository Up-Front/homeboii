import fs from 'fs';
import path from 'path';

const modulesPath = path.resolve(__dirname, './');
const modules = [];

// resolve modules from the current folder.
fs.readdir(modulesPath, (err, files) => {
  if (!files) {
    console.log('no modules found to register');
    return false;
  }

  // check if all files are directories.
  const dirs = files.filter(file => fs.statSync(path.resolve(modulesPath, file)).isDirectory());

  // register modules.
  dirs.forEach((dir) => modules.push(require(path.resolve(modulesPath, `${dir}`))));
});

export default modules;