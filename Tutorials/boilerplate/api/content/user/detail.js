module.exports = function() {
	return{
		detail: function(arguments) {
			var counter,
			    nameText  = 'null', 
				 ageText   = 'null', 
				 titleText = 'null';
			for(counter in arguments) {
				if(arguments.hasOwnProperty(counter)) {
					if(counter == 'name') {
						nameText  = 'Your ' + counter + ' is ' + arguments.name + '. ';
					} else if(counter == 'age') {
						ageText   = 'Your ' + counter + ' is ' + arguments.age + '. ';
					} else if(counter == 'title') {
						titleText = 'Your ' + counter + ' is ' + arguments.title + '. ';
					}
				}
			}
			return 'User\'s Detail: ' + nameText + ageText + titleText;
		},
		employee: function(arguments) {

		}
	}
};