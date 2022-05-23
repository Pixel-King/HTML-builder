const fs = require('fs');
const path = require('path');
const readline = require('readline');
const {stdin, stdout} = require('process');

const stream = fs.createWriteStream(path.join(__dirname, 'text.txt'));
const rl = readline.createInterface({input: stdin, output: stdout});

console.log('The file has been created. Enter text: \n');

rl.on('line', input => {
    if(input.toString() === 'exit') {
            process.exit();
      };
      stream.write(`${input} \n`, err => {
        if (err) stdout.write(err);
      });   
});
rl.on('SIGINT', () => {
      stdout.write('Bye! See you later...');
      rl.close();
});
rl.on('close', ()=>{
      process.exit();
});
process.on('exit', ()=>{
      stdout.write('Bye! See you later...');
});
