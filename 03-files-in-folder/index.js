const fs = require('fs');
const path = require('path');

fs.readdir(path.join(__dirname, 'secret-folder'), { withFileTypes: true }, (err, files) => {
  console.log('\nCurrent files:');
  if (err)
    console.log(err);
  else {
    const arr = files.filter(item => item.isDirectory() === false);
    arr.forEach(item => {
      fs.stat(path.join(__dirname, 'secret-folder', `${item.name}` ), (error, stats) => {
        if (error) {
          console.log(error);
        }
        else {
          let ext = path.extname(path.join(__dirname, 'secret-folder', `${item.name}` ));
          let pathNameFile = path.basename(path.join(__dirname, 'secret-folder', `${item.name}`), ext);
          console.log(`${pathNameFile} - ${ext.slice(1)} - ${stats.size / 1000}kb`);
        }
      });  
    });
  }
});
