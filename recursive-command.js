#!/usr/bin/env node

const path = require('path');
const shell = require('shelljs');
const argv = require('yargs').argv;

function packageJsonLocations(dirname) {
    return shell.find(dirname)
        .filter(fname => !(fname.indexOf('node_modules') > -1 || fname[0] === '.') && path.basename(fname) === 'package.json')
        .map(fname => path.dirname(fname));
}

function npm(directoryName) {
    const command = `npm ${argv['_'].join(' ')}`;
    let result = shell.exec(command);
    shell.cd(directoryName);

    console.log(`Running '${command}' in '${directoryName}'`);

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

    process.exit(exitCode);
}
