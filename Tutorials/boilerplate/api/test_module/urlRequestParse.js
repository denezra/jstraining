module.exports = (function() {
	var c = function() {}, public = c.prototype;
	/* Constant
	--------------------------------*/
	/* Public Properties
	-------------------------------*/
	/* Private Properties
	-------------------------------*/
	/* Loader
	-------------------------------*/
	/* Construct
	-------------------------------*/
	/* Public Methods
	-------------------------------*/
	public.requestParser = 
	/* Private Methods
	-------------------------------*/  
	/* Adaptor
	-------------------------------*/
	return c;
})(); 

// //Class Function
// var requestParser = (function() {
// 	var c = function(){}, public = c.prototype;
// 	/* Constant
// 	--------------------------------*/
// 	/* Public Properties
// 	-------------------------------*/
// 	/* Private Properties
// 	-------------------------------*/
// 	/* Loader
// 	-------------------------------*/
// 	/* Construct
// 	-------------------------------*/
// 	/* Public Methods
// 	-------------------------------*/
// 	//Get the request method and response
// 	public.requestMethod = function(request, response) {
// 		var queryDataString = '',
// 			 bodyData 		  = '';
// 		switch(request.method) {
// 			//GET method
// 			case 'GET'    :
// 				queryDataString = url.parse(decodeURI(request.url), true).query;
// 				break;
// 			//POST and PUT method
// 			case 'PUT'	  :
// 			case 'POST'   :
// 				request.on('data', function (data) { 
// 					bodyData += data; 
// 				});
// 				request.on('end', function() {
// 					queryDataString =  queryString.parse(bodyData);
// 				});
// 				break;
// 			//DELETE method???	
// 			case 'DELETE' :
// 				queryDataString = 'empty';
// 				break;
// 		};
// 		setTimeout(function() {
// 			dataEvent.emit('data-collected-end', response, queryDataString);
// 		},1)
// 	};
// 	/* Private Methods
// 	-------------------------------*/
// 	/* Adaptor
// 	-------------------------------*/
// 	return c;
// })();