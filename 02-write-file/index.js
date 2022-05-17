const fs = require('fs');
const path = require('path');
const {stdin, stdout} = process;

fs.writeFile(path.join(__dirname, 'text.txt'),'', (error) => {
  if (error) return console.error(error.message);
});

stdout.write('Уважаемый студент, введите Ваше имя\n');
stdin.on('data',(data) => {
  const name = data.toString().slice(0, -2);
  
  create(data);
  if (name === 'exit') {
    process.exit();
  }
});

process.on('exit', () => console.log('Удачи в учебе! Не будь как Student1'));

process.on('SIGINT', exitHandler.bind(null, {exit:true}));

function create(data) {
  fs.appendFile(path.join('02-write-file', 'text.txt'), data.toString(), (error) => {
    if (error) return console.error(error.message);
  });
} 

function exitHandler(options) {
  if (options.exit) process.exit();
}
