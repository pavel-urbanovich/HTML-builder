const fs = require('fs');
const path = require('path');

fs.mkdir(path.join(__dirname, 'project-dist'), {recursive:true}, err => {
  if (err) throw err;
  console.log('Папка была создана');
});

fs.writeFile(path.join(__dirname, 'project-dist','index.html'), '', (err) => {
  if(err) throw err;
  console.log('index.html создан');
});

fs.readdir(path.join(__dirname, 'assets'), { withFileTypes: true }, (err, files) => {
  if (err)
    console.log(err);
  else {
    files.forEach(item => {
      fs.stat(path.join(__dirname, 'assets', `${item.name}`), (err, stats) => {
        if (err) throw err;
        else if(stats.isDirectory()) {
          fs.mkdir(path.join(__dirname, 'project-dist', 'assets', `${item.name}`), {recursive:true}, (err) =>{
            if (err) throw err;
            console.log('Папка создана');});
          fs.readdir(path.join(__dirname, 'assets', `${item.name}`), { withFileTypes: true }, (err, newFiles) => {
            if (err)
              console.log(err);
            else {
              newFiles.forEach(el => {
                fs.stat(path.join(__dirname, 'assets', `${item.name}`, `${el.name}`), (err) => {
                  if (err) throw err;
                  else {
                    fs.writeFile(path.join(__dirname, 'project-dist', 'assets', `${item.name}`, `${el.name}`),'', (err)=> {
                      if (err) throw err;
                    });
                  }
                });
              });
            }
          });
        }});
    });
  } 
});

fs.readFile(path.join(__dirname, 'template.html'), 'utf-8', (err, data) => {
  if(err) throw err;
  else {
    fs.appendFile(path.join(__dirname, 'project-dist','index.html'), data, (err) => {
      if(err) throw err;
      console.log('index.html создан');
    });
  }});

fs.writeFile(path.join(__dirname, 'project-dist', 'bundle.css'), '', (err) => {
  console.log('bundle.css создан');
  if(err) throw err;
  else {
    fs.readdir(path.join(__dirname, 'styles'), { withFileTypes: true }, (err, files) => {
      if(err) throw err;
      else {
        files.forEach(item => {
          fs.readFile(path.join(__dirname, 'styles', `${item.name}`), (err, info) =>{
            if(err) throw err;
            else {
              fs.appendFile(path.join(__dirname, 'project-dist', 'bundle.css'), info.toString(), (err)=> {
                if (err) throw err;
              });
            }
          });
        });
      }
    });
  } 
});

fs.readFile(path.join(__dirname, 'project-dist', 'index.html'), 'utf-8', (err, data) => {
  if (err) throw err;
  else {
    fs.readdir(path.join(__dirname, 'components'),  { withFileTypes: true }, (err, files) => {
      if (err) throw err;
      else {
        files.forEach (item => {
          let component = path.parse(path.join(__dirname, 'components', `${item.name}`)).name;
          fs.readFile(path.join(__dirname, 'components', `${item.name}`), 'utf-8', (err, compData) => {
            if (err) throw err;
            else {
              data = data.replace(`{{${component}}}`, compData);
            }
          });
        });
      }
    });
  }
});






