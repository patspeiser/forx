const path = require('path');
var app = require(path.join(__dirname, 'main.js'));
const server = require('http').createServer(app);
var port = process.env.port || 3000;
var io = require('socket.io')(server)

const chalk = require('chalk');

server.listen(port, function(){
	console.log(  chalk.blue('server listening on port... ', port)  );
});	

setInterval(function(){
	//console.log( chalk.blue( Date.now() ) )
	io.emit('do', {})
}, 2000);