#! /usr/bin/env node

const program = require('commander');
const path = require('path');


program
    .usage('[command] [options] \n         Command without flags will be started in interactive mode.');

program
    .command('init')
    .description('Init TARS-project in current directory')
    .option('--exclude-html', 'Prevent templater-files uploading')
    .option('--exclude-css', 'Prevent preprocessor-files uploading')
    .option('--silent', 'TARS will not ask any question about configuration')
    .option('-s, --source <source>', 'Change source of TARS')
    .action(options => require('../lib/command-actions/init')(options));