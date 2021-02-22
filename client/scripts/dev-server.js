// This file just keeps the 

var path = require('path');
var express = require('express');

//config.entry.unshift("webpack-dev-server/client?http://localhost:8080/");

var app = express();

app.use(express.static('src/assets'));

app.get('/assets/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'src/assets/' + req.params[0]));
});

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'src/index.html'));
});

app.listen(8000, function(err) {
  if (err) {
    return console.error(err);
  }

  console.log('Listening at http://localhost:8000/');
});
