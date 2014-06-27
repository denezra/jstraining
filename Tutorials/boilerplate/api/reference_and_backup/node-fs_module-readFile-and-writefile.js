//File System Module
var fs = require('fs');
/**
 * readFile File System method that will read the entire content
 * @param  filename
 * @param  options
 * @param  callback
 */
fs.readFile('test.txt', function(error, data) {
	if(error) throw error;
	if(data) console.log(data.toString('utf8'));
});

fs.writeFile('test2.txt', 'Hello World!', function(error) {
	if(error) throw error;
	console.log('Successfully created a file');
});