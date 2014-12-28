if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = "development"
}
var express = require('express')
var path = require('path')
var http = require('http')

var app = express()

var clientDir = path.join(__dirname, 'client')

app.use(express.favicon("/client/images/favicon/favicon.ico")); 



app.configure(function() {
  app.set('port', process.env.PORT || 3000)
  app.use(express.favicon())
  app.use(express.logger('dev'))
  app.use(express.json());
  app.use(express.urlencoded());
  app.use(app.router) 
  //app.use(express.multipart());
  app.use(express.static(clientDir)) 


})

app.configure('development', function(){
  app.use(express.errorHandler());
})



app.get('/', function(req, res) {
  console.log("Sending");
  res.sendfile(path.join(clientDir, 'index.html'))
})


var server = http.createServer(app)


server.listen(app.get('port'), function(){
  console.log(process.env.NODE_ENV)
  console.log("Web server listening in %s on port %d", (process.env.NODE_ENV), app.get('port'));
});










