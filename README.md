# npm-recursive-install

Recursively run a npm command in every folder that contains a `package.json` file.

## Usage

Simply run any npm command you wish, but with the prefix `npm-recursive`. For example, to run `npm audit` recursively,
you would run `npm-recursive audit`.

## Arguments

`--skipRoot` will skip the root directory.
