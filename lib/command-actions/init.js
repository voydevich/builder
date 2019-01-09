const inquirer = require('inquirer');

module.exports = (options) => {
    inquirer.prompt([
        {
            type: 'checkbox',
            name: 'mode',
            choices: ["Choice A", new inquirer.Separator(), "Choice B"],
            message: 'What files/dirs have to be in component? Available multiple choice.',
            pagination: true,
            pageSize: 12
        }
    ]).then(res => {
        console.log(res)
    });
}