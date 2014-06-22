module.exports = (function() {
	var c = function() {}, public = c.prototype;
	/* Constant
	--------------------------------*/
	/* Public Properties
	-------------------------------*/
	/* Private Properties
	-------------------------------*/
	var _queryDataString = '',
		_bodyData		 = '';
	/* Loader
	-------------------------------*/
	/* Construct
	-------------------------------*/
	/* Public Methods
	-------------------------------*/
	public.requestParser = function(request, response, url, queryString, callback) {
		switch(request.method) {
			case 'GET'    :
				_queryDataString = url.parse(decodeURI(request.url), true).query;
				break;
			//POST and PUT method
			case 'PUT'	  :
			case 'POST'   :
				request.on('data', function (data) { 
				_bodyData += data; 
				});
				request.on('end', function() {
				_queryDataString =  queryString.parse(_bodyData);
				});
			break;
			//DELETE method???	
			case 'DELETE' :
				_queryDataString = 'empty';
				break;
		}
		setTimeout(function() {
			callback.emit('data-collected-end', response, _queryDataString);
		},1)
	};
	/* Private Methods
	-------------------------------*/  
	/* Adaptor
	-------------------------------*/
	return c;
})(); 