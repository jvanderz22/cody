mongoose = require 'mongoose'

db = mongoose.connection

establishConnection = () ->
  mongoose.connect('mongodb://localhost/cody_app')
  db.once('open', () ->
    console.log('database connection created')
  )

establishConnection()
