//Requiring the http module to be accessible through the variable http
var http = require("http");
/**
 * Accessing a functions the http module offers createServer
 * @param  request
 * @param  response
 * @return object
 */
http.createServer(function(request, response) {
	response.writeHead(200, {"Content-Type": "text/plain"});
	response.write("Hello World!");
	response.end();
})
//Method that will listen to the port number(Without a hostname it will be default as
//http://localhost:8888/)
.listen(8888);

(function(message) {
   console.log(message);
})('Hello');