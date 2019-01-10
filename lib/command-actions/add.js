const path = require('path');
const fs = require('fs-extra');

const prompt = require('./helper/prompt');

const rootFolder = path.resolve(process.env.rootPath, 'templates', 'add', 'components');
const localFolder = path.resolve('./', 'tbt', 'templates', 'components');


function getFilesList(callback) {
    if (!fs.existsSync(rootFolder)) return console.error(err);
    const rootFiles = fs.readdirSync(rootFolder).sort().map(file => ({
        name: file.replace(/.js$/, ''),
        value: path.resolve(rootFolder, file)
    }));
    if (!fs.existsSync(localFolder)) return callback(rootFiles);
    const localFiles = fs.readdirSync(localFolder).sort().map(file => ({
        name: file.replace(/.js$/, ''),
        value: path.resolve(localFolder, file)
    }));
    return callback([...localFiles, ...rootFiles]);
}

module.exports = (folderName = '/', fileName = folderName.split('/').pop()) => {
    getFilesList((files) => {
        prompt({
            choices: files,
            message: 'How head file you need?',
        }, (file) => {
            prompt({
                type: 'confirm',
                message: 'Add SCSS file?',
            }, (scss) => {
                fs.ensureDirSync(folderName);
                if (scss) {
                    const filePathScss = path.join(folderName, fileName + '.scss');
                    if (!fs.existsSync(filePathScss)) fs.ensureFile(filePathScss);
                    else console.log(`File ${filePathScss} is exist`);
                }
                const filePathJs = path.join(folderName, fileName + '.js');
                if (!fs.existsSync(filePathJs)) fs.copy(file, filePathJs);
                else console.log(`File ${filePathJs} is exist`);
            });
        })
    })
};