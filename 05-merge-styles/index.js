const fs = require('fs');
const path = require('path');

(function mergeStyles() {
    const baseFolder = path.join(__dirname, 'styles');
    const distStyle = path.join(__dirname, 'project-dist');
    let strDist = '';
    fs.readdir(
        baseFolder,
        {withFileTypes: true},
        (err, files) => {
            if(err) throw err;
             files.forEach( file => {
                 if(file.name.split('.')[1] === 'css' ){
                    fs.readFile(path.join(baseFolder, file.name), 'utf-8', (err, data) => {
                        strDist +=data
                        fs.writeFile(path.join(distStyle, 'bundle.css'), strDist, (err) => {
                            if (err) {
                              throw err;
                            }
                    });
                 });
            }}); 
        });
})();