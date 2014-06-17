jQuery(function($) {
	var menu = [{
			label: 'Item 1',
			children: [{
				label: 'Item 1a',
				children: [{
					label: 'Item 1a1',
					children: []
				}, {
					label: 'Item 1a2',
					children: []
				}]
			}, {
				label: 'Item 1b',
				children: [{
					label: 'Item 1b1',
					children: []
				}, {
					label: 'Item 1b2',
					children: []
				}]
			}]
		}, {
			label: 'Item 2',
			children: [{
				label: 'Item 2a',
				children: [{
					label: 'Item 2a1',
					children: []
				}, {
					label: 'Item 2a2',
					children: []
				}]
			}, {
				label: 'Item 2b',
				children: [{
					label: 'Item 2b1',
					children: []
				}, {
					label: 'Item 2b2',
					children: []
				}]
			}]
		}];
	//Get the div element by id
	var parent = document.getElementById('parent');
	//Recursive Function
	function start(counter, parent){
		//Create UL Element
		var ul = document.createElement('ul');
		//loop will vary on the counter length
		for (var i = 0; i < counter.length; i++) {
			//Create li tag element
			var li = document.createElement('li'),
			//Create a tag element
			a  = document.createElement('a');
			//Set Attribute of a tag
			a.setAttribute('href','#')
			//Check if children is not 0
			if(counter[i].children.length != 0) {
				//Not Null Condition
				//Append label wtih a tag
				a.innerHTML = counter[i].label;
				//Append a tag
				li.appendChild(a);
			} else {
				//Null Condition
				//Append label without the a tag
				li.innerHTML = counter[i].label;
			}
			//Append the li tag
			ul.appendChild(li);
			//Append the ul tag to the parent
			parent.appendChild(ul);
			//Start the recursive function
			start(counter[i].children, ul);
		};
	}
	//Start the recursive
	start(menu, parent);
});