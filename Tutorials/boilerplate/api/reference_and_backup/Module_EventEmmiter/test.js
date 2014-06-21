var a = require('./index');
a.on('ready', function() {
  console.log('module a is ready');
});

a.on('init', function() {
  console.log('module a is init');
});