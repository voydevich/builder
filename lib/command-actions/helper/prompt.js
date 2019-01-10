const inquirer = require('inquirer');
const _ = require('lodash');

module.exports = (options, callback) => {
    if (_.isArray(options)) choices = options;
    else if (_.isObject(options)) choices = options.choices;
    else return console.error('Error prompt options');
    inquirer.prompt([
        {
            type: 'list',
            name: 'mode',
            choices: choices,
            message: options.message ? options.message + ' Make a choice!' : 'Make a choice!',
            pagination: true,
            pageSize: 12,
        }
    ]).then(res => {
        return callback(res.mode);
    });
}