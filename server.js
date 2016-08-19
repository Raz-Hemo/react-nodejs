var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();

app.use('/public', express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname,'public/index.html'));
});

var jsonParser = bodyParser.json();
app.post('/login/',jsonParser,function(req,res){
	console.log("login attempt with:")
	console.log(req.body);
	
	if(req.body.user==="raz" && req.body.pass==="raz")
		res.json("success");
	else
		res.json("fail");
});

app.listen(3000, function() {
  console.log('Server started: http://localhost:' + 3000 + '/');
});
