var fs 		  	= require('fs'),
	 http 	  	= require('http'),
	 path 	  	= require('path'),
	 url			= require('url'),
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

http.createServer(function (request, response) {
	//New array for the path
	var pathFileArray   = [],
	//Converting(frontslash) path into a substring of array by using split
	    pathFile 		  = url.parse(decodeURI(request.url)).pathname.split('/'),
	//Get the url query string
		 queryDataString = ''
	//Switch Case for request.method
	switch(request.method) {
		//GET method
		case 'GET'    :
			queryDataString	 = url.parse(decodeURI(request.url), true).query;
			break;
		//POST method
		case 'POST'   :
			var postData = '';
			request.on('data', function (data) { 
	       	postData += data; 
	      });
	      request.on('end',function(){
	        queryDataString =  queryString.parse(postData); 
	     	});
	     	break;
	   //PUT method
	   case 'PUT'	  :
	   	var putData = '';
	   	request.on('data', function(data) {
	   		putData += data;
	   		queryDataString = queryString.parse(putData);
	   	});
	   	break;
	   case 'DELETE' :
	   	queryString = 'empty';
	   	break;
	}
	//Looping for substring array of pathFile
		 arrayManipulator(pathFile, pathFileArray);
	//Get the file path array length
	var fileLength = pathFileArray.length,
   //Get the parent file
		 fileParent = (pathFileArray.length != 0 ? pathFileArray[fileLength-fileLength] + '/' : ''),
	//Get the js file
		 jsFile 		= (fileLength <= 1 ? 'index'  : pathFileArray[fileLength-1]),
	//Concatenate the js Files with path and extension
		 files 		= pathArray.path + fileParent + jsFile + pathArray.ext;
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
				//Shorthand condition if the substring array length is less than 1 then its load
				var jsFunction		= (pathFileArray.length <= 1 ? 'load' : pathFileArray[fileLength-1]),
				//Access the js File by using require.
				    modulizeFiles = require(files)(),
				//Variable counter
					 counter 		= 0;
				//Check for all the properties inside of an object;
				for(counter in modulizeFiles) {
					//If object has own property
					if(modulizeFiles.hasOwnProperty(counter)){
						//Check if method was calling is correct
						if(jsFunction == counter) {
							switch(counter) {
								//Counter is load
								case 'load'		:
									//Call function load
									response.writeHead(200, {'Content-Type': 'text/html'});
									response.write(modulizeFiles.load());
									break;
								case 'detail'	:
									//Call function for details
									response.writeHead(200, {'Content-Type': 'text/html'});
									response.write(modulizeFiles.detail(queryDataString));
									break;
							}
						}
					}
				}
				//Response has ended
				response.end();
			});
			//File Exist return
			return;
		}
		//File doesn't exist
		response.writeHead(404); 
		response.end('Page Not Found');
	});
})
//Listen to port
.listen(8080);