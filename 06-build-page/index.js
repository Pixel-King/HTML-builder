const fs = require('fs');
const fsPromisess = require('fs/promises')
const path = require('path');

const projectFolder = path.join(__dirname, 'project-dist');


fs.mkdir(projectFolder,{recursive: true}, err =>{
if (err) throw err;
});
fs.mkdir(path.join(__dirname, 'project-dist', 'assets'),{recursive: true}, err =>{
if (err) throw err;
});

(async function createHTML(){
    const template = path.join(__dirname, 'template.html');
    const components = path.join(__dirname, 'components');
    let templateData =await fsPromisess.readFile(template, {encoding: 'utf-8'});
    fs.readdir(
        components,
        {withFileTypes: true},
        (err, files) => {
            files.forEach(file=>{
                if(file.name.split('.')[1] === 'html' && file.isFile()){
                    fs.createReadStream(path.join(__dirname, 'components', file.name), {encoding:'utf-8'}).on('data', data=>{
                        templateData = templateData.replace(`{{${file.name.split('.')[0]}}}`, data);
                        fs.writeFile(
                            path.join(__dirname, 'project-dist', 'index.html'),
                            templateData,
                            (err) => {
                                if (err) throw err;
                            }
                        );  
                    });
                }});
            });
})();

(async function mergeStyles() {
    const styleFolder = path.join(__dirname, 'styles');
    let strDist = '';
    fs.readdir(
        styleFolder,
        {withFileTypes: true},
        (err, files) => {
            if(err) throw err;
             files.forEach( file => {
                 if(file.name.split('.')[1] === 'css' ){
                     fs.readFile(path.join(styleFolder, file.name), 'utf-8', (err, data) => {
                        strDist +=data;
                        fs.writeFile(path.join(projectFolder, 'style.css'), strDist, (err) => {
                            if (err) {
                              throw err;
                            }
                    });
                 }); 
            }}); 
        });
})();

(async function copyAssets(){
    fs.readdir(
        path.join(__dirname, 'assets'),
        {withFileTypes: true},
        (err, folders) => {
            if(err){throw err};
            folders.forEach(folder =>{
                fs.mkdir(path.join(__dirname, 'project-dist', 'assets', folder.name),{recursive: true}, err =>{
                    if (err) throw err;
                    });
                let folderPath = path.join(__dirname, 'assets', folder.name);
                let copyFolderPath = path.join(__dirname,'project-dist', 'assets', folder.name);
                fs.readdir(        
                folderPath,
                {withFileTypes: true},
                (err, files) => {
                    files.forEach(file =>{
                        fs.copyFile( 
                            path.join(folderPath, file.name),
                            path.join(copyFolderPath, file.name),
                            err => {if(err) throw err}
                            );
                    });
                });
            });
        });    
})();