#!/usr/bin/env node
var exec = require('child_process').exec;

exec("cordova --experimental restore plugins");
