const fs = require('fs');
const path = require('path');

(function copyDir() {
    const baseFolder = path.resolve(__dirname, 'files');
    const copyFolder = path.resolve(__dirname, 'copy-files');
    try {
         fs.rm(copyFolder,{recursive: true, force: true}, ()=>{
                fs.mkdir(path.join(__dirname, 'copy-files'),() => {
                    fs.readdir(
                        baseFolder,
                        {withFileTypes: true},
                        (err, files) => {
                            if(err) throw err;
                            files.forEach( file => {
                                if(file.isFile()){
                                    fs.copyFile(path.join(__dirname, 'files', file.name), path.join(__dirname, 'copy-files', file.name), err => {
                                        if (err) throw err;
                                    });
                                }
                            }); 
                        });
                });
            });
    } catch(err){
            console.log(err)
        }
})();

