var fs = require('fs');
var util = require('util');
var path = require('path');

exports.get_lists = function (req, res) {
    var test = new Date();

    var fd = path.join(__dirname, 'public', 'upload/'+ test.getMonth() + '-' + test.getDate() + '/');
    //var list = { };
   // explorer(fd);
    //list['test1']= 'testA';
    //list['test2']= 'testB';
    fs.readdir(fd, function (err, files) {
        // err
        if (err) {
            console.log('error:\n' + err);
            return;
        }
            res.send(files);
    });
};

