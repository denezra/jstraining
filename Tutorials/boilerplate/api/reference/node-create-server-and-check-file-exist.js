var http 	  	= require('http');
var path 	  	= require('path');
var fs 		  	= require('fs');
var pathArray	= {
	path: './content/',
	ext : '.js'
}

http.createServer(function (request, response) {
	var lookup = path.basename(request.url);
	var files = pathArray.path + lookup + pathArray.ext;
	console.log('TEST_FILES ',files);
	fs.exists(files, function (exists) {
		if (exists) {
			fs.readFile(files, function (err, data) {
				if (err) {response.writeHead(500); response.end('ServerError!'); return; }
				var modulizeFiles = new require(files)
				response.writeHead(200, {'Content-Type': 'text/html'});
				var stringConvert = (typeof modulizeFiles.load === 'function' ? modulizeFiles.load() : 'No Function')
				response.write(stringConvert)
				response.end('</br>Page Found');
			});
			return;
		}
		response.writeHead(404); //no such file found!
		response.end('Page Not Found');
	});
}).listen(8080, 'localhost');