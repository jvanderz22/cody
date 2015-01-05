if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = "development"
}
var coffee = require('coffee-script/register')
var express = require('express')
var path = require('path')
var http = require('http')
var reload = require('reload')
var compass = require('node-compass')
var serveImage = require('serve-index')

var image = require('./server/image')

var app = express()


var clientDir = path.join(__dirname, 'client')

app.use(express.favicon("/client/images/favicon/favicon.ico"))
app.configure(function() {
  app.set('port', process.env.PORT || 3000)
  app.use(express.favicon())
  app.use(express.logger('dev'))
  app.use(express.json());
  app.use(express.urlencoded());
  app.use(app.router)
  app.use("/", express.static(clientDir))
  console.log(__dirname)
  app.use(express.static(__dirname + '/public'))
  console.log("EREREWRerewerererwerewwrwrere")
  app.use(express.static(__dirname + '/bower_components'))
})


app.configure('development', function(){
  app.use(compass({
    project: path.join(__dirname, '/public')
  }))
  app.use(express.errorHandler());
  app.use(compass({cwd: clientDir}))
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

server.listen(app.get('port'), function(){
  console.log(process.env.NODE_ENV)
  console.log("Web server listening in %s on port %d", (process.env.NODE_ENV), app.get('port'));
});
