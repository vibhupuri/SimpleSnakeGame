#!/usr/bin/env node
var target = process.env.TARGET || "debug";
var files = [
  "platforms/android/assets/www/index.html",
  "platforms/ios/www/index.html"
]
var rootdir = process.argv[2];

var fs = require('fs');
var path = require('path');

function replaceContentInFile(file, search, replace) {
  if (fs.existsSync(file)) {
    var content = fs.readFileSync(file, 'utf8');
    var result = content.replace(new RegExp(search, "g"), replace);
    fs.writeFileSync(file, result, 'utf8');
  }
}

if (rootdir) {
  var config = JSON.parse(fs.readFileSync(path.join(rootdir, "config.json")))[target];
  for (key in config) {
    var value = config[key];
    
    files.forEach(function (file, index, array) {
      var filePath = path.join(rootdir, file);
      replaceContentInFile(filePath, 
        '<meta name="' + key + '" content="CONFIG" />', 
        '<meta name="' + key + '" content="' + value + '" />');
    });
  }
}
