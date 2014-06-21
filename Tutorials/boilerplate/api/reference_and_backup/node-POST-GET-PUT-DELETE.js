var fs 		  	 = require('fs'),
	 http 	  	 = require('http'),
	 path 	  	 = require('path'),
	 url			 = require('url'),
	 queryString = require('querystring');
var pathArray	= {
	path: './content/',
	ext : '.js'
}

/**
 * Eliminate null, empty, and undefined array. Also, check for the query string.
 * @param  array
 * @param  string
 * @param  array/null
 */
var arrayManipulator = function(oldArray, newArray){
	//Declare first counter
	var counter = 0;
	//Loop according to the length of old Array
	for (; counter < oldArray.length; counter++) {
		if(newArray != null) {
			//Check empty, null, and undefined array. If not null, empty, and undefined push in new array
			if (oldArray[counter] !== undefined && oldArray[counter] !== null && oldArray[counter] !== "") {
				newArray.push(oldArray[counter]);
			}
		}
	}
} 

var requestParser = (function() {
	var c = function(){}, public = c.prototype;
	/* Public Methods
			-------------------------------*/
	public.requestMethod = function(request, response, callback) {
		var queryDataString = '',
			 bodyData 		  = '';
		switch(request.method) {
			//GET method
			case 'GET'    :
				queryDataString	 = url.parse(decodeURI(request.url), true).query;
				break;
			//POST method
			case 'POST'   :
				request.on('data', function (data) { 
					bodyData += data; 
				})
				break;
			//PUT method
			case 'PUT'	  :
				request.on('data', function(data) {
					bodyData += data;
				})
				break;
			//DELETE method???	
			case 'DELETE' :
				queryDataString = 'empty';
				break;
		}

		if(request.method == 'POST' || request.method == 'PUT') {
			request.on('end',function(){
				queryDataString =  queryString.parse(bodyData);
				callback(response, queryDataString);	
			});
		} else {
			callback(response, queryDataString);	
		}
	}
	/* Private Methods
	-------------------------------*/
	/* Adaptor
	-------------------------------*/
	 return c;
})()

var requestObject = new requestParser();

http.createServer(function (request, response) {
	//New array for the path
	var pathFileArray   = [],
	//Converting(frontslash) path into a substring of array by using split
	    pathFile 		  = url.parse(decodeURI(request.url)).pathname.split('/');
	//Looping for substring array of pathFile
		 arrayManipulator(pathFile, pathFileArray);
	//Get the file path array length
	var fileLength = pathFileArray.length,
   //Get the parent file
		 fileParent = (pathFileArray.length != 0 ? pathFileArray[fileLength-fileLength] + '/' : ''),
	//Get the js file
		 jsFile		= '',
	//Get the js function
		 jsFunction		= '';
	//Check for query string
	requestObject.requestMethod(request, response, iniatiteFiles);

	function iniatiteFiles (response, query){
		var queryDataString = query;
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
		var files = pathArray.path + fileParent + jsFile + pathArray.ext;
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
	}

})
//Listen to port
.listen(8080);