const path = require('path');
const fs = require('fs-extra');

const prompt = require('./helper/prompt');

const rootFolder = path.resolve(process.env.rootPath, 'templates', 'add', 'components');
const localFolder = path.resolve('./', 'tbt', 'templates', 'components');

console.log(123, rootFolder, localFolder)

function getFilesList(callback) {
    if (!fs.existsSync(rootFolder)) return console.error(err);
    const rootFiles = fs.readdirSync(rootFolder);
    if (!fs.existsSync(localFolder)) return callback(rootFiles);
    const localFiles = fs.readdirSync(localFolder);
    return [...localFiles, ...rootFiles]
}

module.exports = (folderName = '/', fileName = folderName.split('/').pop()) => {
    getFilesList((files) => {
        prompt({
            choices: files.map(file => file.replace(/.js$/, '')).sort(),
            message: 'How head file you need?',
        }, (mode1) => {
            prompt({
                type: 'confirm',
                message: 'Add SCSS file?',
            }, (mode2) => {
                console.log(folderName, fileName, mode1, mode2)
            });
        })
    })
};