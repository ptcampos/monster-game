const express = require('express');
const app = express();

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html');
});

app.use('/js', express.static(__dirname + '/js'));
app.use('/css', express.static(__dirname + '/css'));
app.use('/img', express.static(__dirname + '/img'));

const port = 3000;

app.listen(port, () => {
	process.on('uncaughtException', err => {
	  console.log(err);
	});
	console.log('I\'m Listening on port...' + port);
});