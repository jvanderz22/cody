if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = "development"
}
var env = process.env.NODE_ENV
var coffee = require('coffee-script/register')
var express = require('express')
var path = require('path')
var http = require('http')
var reload = require('reload')
var compass = require('node-compass')
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
var favicon = require('serve-favicon')
var errorHandler = require('errorhandler')

var serveImage = require('serve-index')

var database_config = require('./server/database_config')
var image = require('./server/image')

var app = express()

var clientDir = path.join(__dirname, 'client')

app.use(favicon("client/images/favicon/favicon.ico"))
app.set('port', process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 3000)
app.set('ipaddress', process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1")
app.use("/", express.static(clientDir))
app.use(express.static(__dirname + '/public'))
app.use(express.static(__dirname + '/bower_components'))


if ('development' == env){
  app.use(compass({
    project: path.join(__dirname, '/public')
  }))
  app.use(errorHandler());
  app.use(compass({cwd: clientDir}))
}

app.get('/', function(req, res) {
  console.log("Sending");
  res.sendfile(path.join(clientDir, 'index.html'))
})


app.get('/api/images', image.index)
app.get('/api/images/:id', image.show)
app.post('/api/images', jsonParser, image.post)
app.put('/api/images/:id', jsonParser, image.put)
app.delete('/api/images/:id', jsonParser, image.delete)

var server = http.createServer(app)

reload(server, app)

server.listen(app.get('port'), app.get('ipaddress'), function(){
  console.log(process.env.NODE_ENV)
  console.log("Web server listening in %s on port %d", (process.env.NODE_ENV), app.get('port'));
});
