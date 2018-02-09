var fs = require('fs');
var cpx = require('cpx');
var path = require('path');
var exec = require('child_process').exec;

var source = path.join(__dirname, './src/lib/**/*.less');
var destination = path.join(__dirname, './build');
var options = {clean: true};

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

var testProcess = exec('npm run test', function (error, stdout, stderr) {
  if (error !== null) {
    console.error('test error:');
    throw error;
  }

  cpx.copySync(source, destination, options, function (err) {
    if (err) {
      console.error(err);
      throw err;
    }
  });

  var tscProcess = exec('tsc -p tsconfig.prod.json', function (error, stdout, stderr) {
    if (error !== null) {
      console.error('tsc error:');
      throw error;
    }
  });
});
