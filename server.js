require('dotenv').config();
const express = require('express'),
  app = express(),
  path = require('path'),
  http = require('http'),
  server = http.createServer(app),
  bodyParser = require('body-parser'),
  compression = require('compression');

const port = 8000;

app.use(compression());

app.use(bodyParser.json({
  limit: '50mb'
}));
app.use(bodyParser.urlencoded({
  limit: '50mb',
  extended: true
}));

app.use(bodyParser.json());

// app.use('/images', express.static('public/images'));

app.use(express.static(path.resolve('build')));

app.get(/^((?!\/(api|administrator)).)*$/, (req, res) => {
  try {
    res.sendFile(path.resolve('build/index.html'));
  } catch (error) {
    res.render("Error 404, page not found")
  }
});

/*Listen on Server Port*/
server.listen(port, () => {
  console.log('listening on', server.address().port);
});
