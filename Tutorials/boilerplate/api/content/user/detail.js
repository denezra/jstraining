module.exports = function() {
	return{
		detail: function(arguments) {
			function removeSpecial(value) {
				return value.replace('%20',' ');
			}
			var counter = 0;
			var nameText, 
				 ageText, 
				 titleText;
			for(counter in arguments) {
				if(arguments.hasOwnProperty(counter)) {
					if(counter == 'name') {
						nameText  = 'Your ' + counter + ' is ' + removeSpecial(arguments.name) + '. ';
					} else if(counter == 'age') {
						ageText   = 'Your ' + counter + ' is ' + removeSpecial(arguments.age) + '. ';
					} else if(counter == 'title') {
						titleText = 'Your ' + counter + ' is ' + removeSpecial(arguments.title) + '. ';
					}
				}
			}
			return 'User\'s Detail: ' + nameText + ageText + titleText;
		}
	}
};