//Core Modules
var fs 		  	  = require('fs'),
	 http 	  	  = require('http'),
	 path 	  	  = require('path'),
	 url		  = require('url'),
	 queryString  = require('querystring'),
	 EventEmitter = require('events').EventEmitter;

var pathArray	= {
	path		: './content/',
	extension	: '.js'
}
//Test Modules
var arrayValidator 		= require('./test_module/arrayValidator.js'),
	 urlRequestParse	= require('./test_module/urlRequestParse.js');

var  arrayValid 	= new arrayValidator(),
	 urlParser  	= new urlRequestParse(),
	 eventTrigger	= new EventEmitter();;
	 
http.createServer(function (request, response) {
	//New array for the path
	var pathFileArray   = [],
	//Converting(frontslash) path into a substring of array by using split
	    pathFile 		  = url.parse(decodeURI(request.url)).pathname.split('/');
	//Looping for substring array of pathFile
		arrayValid.begin(pathFile, pathFileArray);

		urlParser.requestParser(request, response, url, queryString, eventTrigger)

	eventTrigger.on('data-collected-end', function (response, query){
		var queryDataString = query,
			fileLength 		= pathFileArray.length,
			fileParent = (pathFileArray.length != 0 ? pathFileArray[fileLength-fileLength] + '/' : '');

		if(queryDataString == '') {
			//No query string
			jsFile 		= 'index';
			jsFunction 	= 'load';
		} else {
			//Has query string
			jsFile 		= (fileLength <= 1 ? 'index'  : pathFileArray[fileLength-1]);
			jsFunction 	= (pathFileArray.length <= 1 ? 'load' : pathFileArray[fileLength - 1]);
		}
		//Concatenate the js Files with path and extension
		var files = pathArray.path + fileParent + jsFile + pathArray.extension;
		//Use fs exist event
		fs.exists(files, function (exists) {
			//if file exit
			if (exists) {
				//fs read the file
				fs.readFile(files, function (err, data) {
					//Error Handler
					if(err) { 
						response.writeHead(500); 
						response.end('ServerError!'); 
						return; 
					};
					//Access the js File by using require.
					var modulizeFiles = require(files)(),
					//Variable counter
						 counter 		= 0;
					//Check for all the properties inside of an object;
					for(counter in modulizeFiles) {
						//If object has own property
						if(modulizeFiles.hasOwnProperty(counter)){
							response.writeHead(200, {'Content-Type': 'text/html'});
							response.write(modulizeFiles[jsFunction](queryDataString));
							response.end();	
						} else {
							response.writeHead(404); 
							response.end('Method Not Found');
						}
					}
				});
				//File Exist return
				return;
			}
			//File doesn't exist
			response.writeHead(404); 
			response.end('Page Not Found');
		});
	});
})
//Listen to port
.listen(8080);