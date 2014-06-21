module.exports = (function() {
	var c = function() {}, public = c.prototype;
	/* Constant
	--------------------------------*/
	/* Public Properties
	-------------------------------*/
	/* Private Properties
	-------------------------------*/
	//Declare first _counter
	var _counter = 0;
	/* Loader
	-------------------------------*/
	/* Construct
	-------------------------------*/
	/* Public Methods
	-------------------------------*/
	/**
	 * Eliminate null, empty, and undefined array. Also, check for the query string.
	 * @param  array
	 * @param  string
	 * @param  array/null
	 */
	public.begin = function(oldArray, newArray) {
		//Loop according to the length of old Array
		for (; _counter < oldArray.length; _counter++) {
			if(newArray != null) {
				//Check empty, null, and undefined array. If not null, empty, and undefined push in new array
				if (oldArray[_counter] !== undefined && oldArray[_counter] !== null && oldArray[_counter] !== "") {
					newArray.push(oldArray[_counter]);
				}
			}
		}
	};
	/* Private Methods
	-------------------------------*/  
	/* Adaptor
	-------------------------------*/
	return c;
})(); 