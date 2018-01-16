var fs = require('fs');
var ncp = require('ncp').ncp;
const path = require('path');

ncp.limit = 1000;

var source = path.join(__dirname, './src/lib');
var destination = path.join(__dirname, './build');
var options = {
  filter: /^[A-Za-z\-\/]*(\.less|$)/
};

(function deleteFolderRecursive (path) {
  if (fs.existsSync(path)) {
    fs.readdirSync(path).forEach(function (file, index) {
      var curPath = path + '/' + file;
      if (fs.lstatSync(curPath).isDirectory()) {
        deleteFolderRecursive(curPath);
      } else {
        fs.unlinkSync(curPath);
      }
    })
    fs.rmdirSync(path);
  }
})(destination);

ncp(source, destination, options, function (err) {
  if (err) {
    return console.error(err);
  }
})

var exec = require('child_process').exec;
var child = exec('tsc', function (error, stdout, stderr) {
  if (error !== null) {
    console.log('tsc error: ' + error);
  }
})