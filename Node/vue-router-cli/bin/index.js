#!/usr/bin/env node
const { program } = require('commander');
const { version } = require('../package.json');
const { init } = require('../src/init');
program.version(version);

program
    .command('init <name>')
    .description('init project ')
    .action(init)

program.parse(process.argv);