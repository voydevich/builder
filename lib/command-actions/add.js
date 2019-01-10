const path = require('path');
const fs = require('fs-extra');

const prompt = require('./helper/prompt');

const rootFolder = path.resolve(process.env.rootPath, 'templates', 'add', 'components');
const localFolder = path.resolve('./', 'tbt', 'templates', 'components');


function getFilesList(callback) {
    fs.pathExists(rootFolder, err => {
        if (err) return console.error(err);
        fs.readdir(rootFolder, (err, rootFiles) => {
            if (err) return console.error(err);
            fs.pathExists(localFolder, err => {
                if (err) return callback(rootFiles);
                fs.readdir(localFolder, (err, localFiles) => {
                    if (err) return console.error(err);
                    return callback([...rootFiles, ...localFiles]);
                });
            })
        });
    })
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