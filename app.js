/**
 * Simple NodeJs File Uploader
 *
 * @package Simple NodeJs File Upload
 * @author Reza Farhadian <http://saalam.ir>
 * @license MIT <http://opensource.org/licenses/MIT>
*/
 
/**
 * Require modules
 *
 * @var [Object] express
 * @var [Object] fs
 * @var [Object][Function] app
*/
var express = require('express'),
    fs = require('fs');
 
var app = express();
 
/**
 * Config express
 *
 * @return set static directory
 * @return parse all body request
*/
app.configure(function() {
	app.use(express.static(__dirname + '/public/'));
    app.use(express.bodyParser());
});
 
// Set router for main index
app.get('/', function(req, res) {
    fs.readFile('./index.html', function(error, content) {
        if (error) {
            res.writeHead(500);
            res.end();
        }
        else {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(content, 'utf-8');
        }
    });
});
 
// Set post request for file upload
app.post('/upload', function(req, res) {
	res.contentType('text/html');
    fs.readFile(req.files.upload.path, function(err, data) {
    	var dirPath = __dirname + '/uploaded/' + req.files.upload.name;
 
    	fs.writeFile(dirPath, data, function(err) {
    		if(err) console.log('Failed! ' + err);
    		if(!err) console.log('Success! ' + dirPath);

    		res.end('Success! ' + dirPath);
    	});
    });
});
 
// Run App
app.listen(4000);
console.log('Server Running At http://localhost');
