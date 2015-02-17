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
var mongoskin = require('mongoskin')
var bodyParser = require('body-parser')
var favicon = require('serve-favicon')
var errorHandler = require('errorhandler')

var serveImage = require('serve-index')

var image = require('./server/image')

var app = express()
var db = mongoskin.db('mongodb://@localhost:27017/test', {safe: true})

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

app.param('collectionName', function(req, res, next, collectName){
  console.log(collectionName)
  req.collection = db.collection(collectionName)
  return next()
})

app.get('/', function(req, res) {
  console.log("Sending");
  res.sendfile(path.join(clientDir, 'index.html'))
})

app.post('/api/images', image.post)
app.delete('/api/images/:id', image.delete)
app.put('/api/images/:id', image.put)
app.get('/api/images', image.get)
app.get('/api/images/:id', image.getSingle)


var server = http.createServer(app)

reload(server, app)

server.listen(app.get('port'), app.get('ipaddress'), function(){
  console.log(process.env.NODE_ENV)
  console.log("Web server listening in %s on port %d", (process.env.NODE_ENV), app.get('port'));
});
