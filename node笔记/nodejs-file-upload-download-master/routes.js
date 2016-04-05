var fs = require('fs'),
    path = require('path'),
    file_read = require('./list_files'),
    formidable = require('formidable');

module.exports = function (app) {
    app.get('/', function (req, res, next) {
        res.render('index');
    });

    app.get('/upload', function (req, res, next) {
        res.render('upload');
    });

    app.post('/file-upload', function (req, res, next) {
        //console.log(req.body);
        //get the temp path
        var form = new formidable.IncomingForm();
        form.parse(req, function (err, fields, files) {
            // define err page
            if (err) return res.end('upload file error');
            var tmp_path = files.thumbnail.path;
            //specific the upload to path
            var test = new Date();
            if (fs.existsSync('./public/upload/' + test.getMonth() + '-' + test.getDate() + '/')) {
                console.log('已经创建过此更新目录了');

            } else {
                fs.mkdirSync('./public/upload/' + test.getMonth() + '-' + test.getDate() + '/');
                console.log('更新目录已创建成功\n');
            }
            var target_path = './public/upload/' + test.getMonth() + '-' + test.getDate() + '/' + files.thumbnail.name;
            var source = fs.createReadStream(tmp_path);
            var dest = fs.createWriteStream(target_path);
            source.pipe(dest);
            res.writeHead(200, {
                'Content-Type': 'text/html'
            });
            res.write('<html><body>Image Server<br>');
            res.write("<a class='btn btn-primary' href='/' id='home' > Back Home </a></html>");
            res.end('thanks for upload ');
        })
    });

    app.get('/image', function (req, res) {
        fs.readFile('./logo.png', function (err, data) {
            if (err) throw err;
            //res.writeHead(200, {'Content-Type' : 'image/png' });
            //res.write(data, 'binary');
            res.writeHead(200, {
                'Content-Type': 'text/html'
            });
            res.write('<html><body>Image Server<br><img src="data:image/jpeg;base64,');
            res.write(new Buffer(data).toString('base64'));
            res.write('"/>');
            res.write('<br><p>New line</p></body></html>');
        });
    });

    app.get('/download_page', function (req, res, next) {
        res.render('download');
    });

    app.get('/get_files', file_read.get_lists);
    app.get('/del/*', function (req, res, next) {
        var test = new Date();
        console.log("11111");
        console.log(req.params[0]+"111111111111");
        var test = new Date();
        console.log('download file');
        target_file = path.join(__dirname, 'public', 'upload/' + test.getMonth() + '-' + test.getDate() + '/', req.params[0]);

        console.log('__dirname ' + target_file);

        var f = target_file;
       // f = path.resolve(f);
        console.log(f);
        fs.unlinkSync(f);
        res.redirect(req.get('referer'));
    });
    app.get('/download/*', function (req, res, next) {
        var test = new Date();
        console.log('download file');
        target_file = path.join(__dirname, 'public', 'upload/' + test.getMonth() + '-' + test.getDate() + '/', req.params[0]);

        console.log('__dirname ' + target_file);

        var f = target_file;
        f = path.resolve(f);
        console.log(f);
        if (isFile(f)) {
            res.download(f);
        } else {
            console.log('不是文件不需要下载');
            app.get('/get_file', function (req, res) {
                fs.readdir(f, function (err, files) {
                    // err
                    if (err) {
                        console.log('error:\n' + err);
                        return;
                    }

                });
            });

        }

    });

};

function isDir(path) {
    return exists(path) && fs.statSync(path).isDirectory();
}
function isFile(path) {
    return exists(path) && fs.statSync(path).isFile();
}
function exists(path) {
    return fs.existsSync(path) || path.existsSync(path);
}
deleteFolderRecursive = function (path) {

    var files = [];

    if (fs.existsSync(path)) {

        files = fs.readdirSync(path);

        files.forEach(function (file, index) {

            var curPath = path + "/" + file;

            if (fs.statSync(curPath).isDirectory()) { // recurse

                deleteFolderRecursive(curPath);

            } else { // delete file

                fs.unlinkSync(curPath);

            }

        });

        fs.rmdirSync(path);

    }

};