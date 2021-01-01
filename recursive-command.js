#!/usr/bin/env node

const path = require('path');
const shell = require('shelljs');
const argv = require('yargs').argv;
const clc = require('cli-color');

function packageJsonLocations(dirname) {
    return shell.find(dirname)
        .filter(fname => !(fname.indexOf('node_modules') > -1 || fname[0] === '.') && path.basename(fname) === 'package.json')
        .map(fname => path.dirname(fname));
}

function npm(directoryName) {
    let result = shell.exec(`npm ${argv['_'].join(' ')}`);
    shell.cd(directoryName);

    console.log(clc.blueBright('Current npm path: ' + directoryName + '/package.json...'));

    return {
        directoryName: directoryName,
        exitCode: result.code
    };
}

function filterRoot(directoryName) {
    console.log('Root filtering');

    return path.normalize(directoryName) === path.normalize(process.cwd());
}

if (require.main === module) {
    let exitCode = packageJsonLocations(process.cwd())
        .filter(argv.skipRoot ? filterRoot : filtered => filtered)
        .map(npm)
        .reduce((code, result) =>result.exitCode > code ? result.exitCode : code, 0);

    console.log(clc.green.bold('End of npms'));
    process.exit(exitCode);
}

module.exports = {
    npm: npm
};
