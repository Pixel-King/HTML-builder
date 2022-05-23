const fs = require('fs');
const path = require('path');

(function copyDir() {
    const baseFolder = path.join(__dirname, 'files');
    fs.mkdir(path.join(__dirname, 'copy-files'),{recursive: true}, err =>{
        if (err) throw err;
    });
    fs.readdir(
        baseFolder,
        {withFileTypes: true},
        (err, files) => {
            if(err) throw err;
             files.forEach( file => {
                if(file.isFile()){
                    const baseFile = path.resolve(__dirname, 'files', file.name);
                    const copyFile = path.resolve(__dirname, 'copy-files', file.name);
                    fs.copyFile(baseFile, copyFile, err => {
                        if (err) throw err;
                    });
                }
            }); 
        });
})();
