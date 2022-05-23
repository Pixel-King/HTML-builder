const fs = require('fs');
const path = require('path');

(async function filesInFolder() {
    const zadPath = path.join(__dirname, 'secret-folder');
    fs.readdir(
        zadPath,
        {withFileTypes: true},
        (err, files) => {
            if(err) throw err;
             files.forEach(file => {
                 if (file.isFile()){
                    const [name, type] = file.name.split('.');
                    const fileName = name;
                    const fileType = type;
                    const filePat = path.join(zadPath, file.name);
                    fs.stat(
                        filePat,
                        (err, stat)=>{
                            if(err) throw err;
                            console.log(`${fileName} - ${fileType} - ${Math.round(stat.size/1024)}kB`);
                        } 
                    );
                 } 
             });
         });
})();