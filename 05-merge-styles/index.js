const fs = require('fs');
const path = require('path');

fs.rm(path.join(__dirname, 'project-dist', 'bundle.css'), { recursive:true }, (err) => {
  if(err){
    console.error(err.message);
    return;
  }
  console.log('File deleted successfully');
});

fs.writeFile(path.join(__dirname, 'project-dist', 'bundle.css'),'', (error) => {
  if (error) return console.error(error.message);
});
console.log('bandle.css created');

fs.readdir(path.join(__dirname, 'styles'), { withFileTypes: true }, (err, files) => {
  if (err)
    console.log(err);
  else {
    const arr = files.filter(item => path.extname(path.join(__dirname, 'styles', `${item.name}` )).slice(1) === 'css');
    arr.forEach(item => {
      fs.readFile(path.join(__dirname, 'styles', `${item.name}` ), 'utf8',
        (error, fileContent) => {
          if (error) throw error;
         
          fs.appendFile(path.join(__dirname, 'project-dist', 'bundle.css'), fileContent,
            (error) => {
              if (error) throw error;
            });
        });
    });
    console.log('bandle.css updated');
  }
});