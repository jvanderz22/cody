mongoose = require 'mongoose'

db = mongoose.connection

establishConnection = () ->
  connection_string = '127.0.0.1:27017/cody_app'
  if process.env.OPENSHIFT_MONGODB_DB_PASSWORD
    connection_string = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
      process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
      process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
      process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
      process.env.OPENSHIFT_APP_NAME

  mongoose.connect("mongodb://#{connection_string}")
  db.once('open', () ->
    console.log('database connection created')
  )

establishConnection()
