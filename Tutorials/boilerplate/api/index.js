var fs 		  	= require('fs'),
	 http 	  	= require('http'),
	 path 	  	= require('path'),
	 url			= require('url');
var pathArray	= {
	path: './content/',
	ext : '.js'
}

http.createServer(function (request, response) {
	//New array for the path
	var pathFileArray = [];
	//Converting(frontslash) path into a substring of array by using split
	var pathFile = url.parse(decodeURI(request.url)).path.split('/');
	//Looping for substring array
	for (var i = 0; i < pathFile.length; i++) {
		//Check empty, null, and undefined array.
		if (pathFile[i] !== undefined && pathFile[i] !== null && pathFile[i] !== "") {
			//Push all not null, empty, and undefined into a new array
			pathFileArray.push(pathFile[i]);
		}
	}
	//Shorthand condition if the substring array length is zero then it automatics as index
	var jsFile = (pathFileArray.length <= 0 ? 'index' : pathFile[1])
	//Concatenate the js Files with path and extension
	var files = pathArray.path + jsFile + pathArray.ext;

	fs.exists(files, function (exists) {
		if (exists) {
			fs.readFile(files, function (err, data) {
				if (err) {response.writeHead(500); response.end('ServerError!'); return; }
				var modulizeFiles = new require(files)
				response.writeHead(200, {'Content-Type': 'text/html'});
				response.write(stringConvert)
				response.end('</br>Page Found');
			});
			return;
		}
		response.writeHead(404); //no such file found!
		response.end('Page Not Found');
	});
}).listen(8080, 'localhost');