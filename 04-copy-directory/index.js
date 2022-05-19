const fs = require('fs');
const path = require('path');
const fsPromises = fs.promises;

fsPromises.mkdir(path.join(__dirname, 'files-copy'), {recursive:true}).then(function copyDir() {
  console.log('Directory created successfully');

  fs.readdir(path.join(__dirname, 'files-copy'), (err, files) => {
    if (err) throw err;
    for (const file of files) {
      fs.unlink(path.join(__dirname, 'files-copy', file), err => {
        if (err) throw err;
      });
    }
    console.log('Files deleted successfully');
  });

  fs.readdir(path.join(__dirname, 'files'), { withFileTypes: true }, (err, files) => {
    if (err)
      console.log(err);
    else {
      
      files.forEach (item => {
        let fileUrl = path.join(__dirname, 'files', `${item.name}` );
        let fileCopyUrl = path.join(__dirname, 'files-copy', `${item.name}` );
        fs.copyFile(fileUrl, fileCopyUrl, (err) => {
          if (err) {
            console.log('Error Found:', err);
          }
        });
      });
      console.log('Files copied successfully');
    } 
   
  });
}).catch(function () {
  console.log('failed to create directory');
});

