//Core Modules
var fs 		  	 = require('fs'),
	 http 	  	 = require('http'),
	 path 	  	 = require('path'),
	 url			 = require('url'),
	 queryString = require('querystring');
var pathArray	= {
	path			: './content/',
	extension	: '.js'
}
//Test Modules
var arrayValidator 	= require('./test_module/arrayValidator.js'),
	 urlRequestParse	= require('./test_module/urlRequestParse.js');

var arrayValid = new arrayValidator(),
	 urlParser  = new urlRequestParse();
	 
http.createServer(function (request, response) {
	//New array for the path
	var pathFileArray   = [],
	//Converting(frontslash) path into a substring of array by using split
	    pathFile 		  = url.parse(decodeURI(request.url)).pathname.split('/');
	//Looping for substring array of pathFile
		arrayValid.begin(pathFile, pathFileArray);

	console.log('pathFileArray ',pathFileArray);


	//response.writeHead(200); 
	//response.end('Page Not Found');
})
//Listen to port
.listen(8080);