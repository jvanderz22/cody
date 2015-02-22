mongoose = require 'mongoose'
db = mongoose.connection

imageSchema = new mongoose.Schema({
  url: String
  ranking: Number
  category: String
  video: Boolean
  description: String
})

db.once('open', () ->
  console.log('initializing image schema')
  mongoose.model('Image', imageSchema)
)

Image = mongoose.model('Image', imageSchema)

imageRequestParams = (requestBody) ->
  {
    category: requestBody.category
    url: requestBody.url
    ranking: requestBody.ranking
    video: if requestBody.video? then requestBody.video else false
    description: if requestBody.description? then requestBody.description else ''
  }

newImage = (params) ->
  new Image({
    url: params.url,
    ranking: params.ranking,
    category: params.category,
    video: params.video,
    description: params.description
  })

categories = ['photos', 'models', 'art', 'game']

validPost = (requestParams) ->
  return false unless requestParams.category? and requestParams.url? and requestParams.ranking?
  return false unless requestParams.category in categories
  typeof(requestParams.ranking) is 'number'

preparedImage = (unpreparedImage) ->
  {
    id: unpreparedImage._id,
    category: unpreparedImage.category,
    ranking: unpreparedImage.ranking,
    url: unpreparedImage.url,
    video: unpreparedImage.video,
    description: unpreparedImage.description
  }

preparedImages = (unpreparedImages) ->
  unpreparedImages.map (image) -> preparedImage(image)

exports.index = (req, res, next) ->
  category = req.query.category
  if category?
    Image.find({category: category}).sort('ranking').exec (err, images) ->
      console.log(preparedImages(images))
      console.log(images)
      res.send({images: preparedImages(images)})
  else
    Image.find().sort('ranking').sort('ranking').exec (err, images) ->
      res.send({images: preparedImages(images)})


exports.post = (req, res) ->
  requestParams = imageRequestParams(req.body)

  unless validPost(requestParams)
    res.send(400, 'Valid category, url, and ranking parameters required')
    return

  newImage(requestParams).save (err, image) ->
    if err?
      res.send(500, 'Unable to save image')
      return console.error(err)
    res.send({image: preparedImage(image)})


exports.put = (req, res) ->
  requestParams = imageRequestParams(req.body)
  id = req.params.id

  unless id?
    res.send(400, "Id parameter required")
    return

  unless validPost(requestParams)
    res.send(400, 'Valid category, url, and ranking parametes required')
    return

  Image.findById(id, (err, image) ->
    image.category = requestParams.category
    image.url = requestParams.url
    image.ranking = requestParams.ranking
    image.video = requestParams.video
    image.description = requestParams.description
    image.save (err, image) ->
      if err?
        res.send(422, 'Unable to save image')
        console.error(err)
      else
        res.send({image: preparedImage(image)})
  )

exports.delete = (req, res) ->
  id = req.params.id
  unless id?
    res.send(400, "Id parameter required")
    return
  Image.findById(id, (err, image) ->
    image.remove (err) ->
      if err?
        res.send(422, 'Unable to remove image')
        console.error(err)
      else
        res.send(201)
  )

exports.show = (req, res) ->
  id = req.params.id
  unless id?
    res.send(400, "Id parameter required")
    return
  Image.findById(id, (err, image) ->
    if err?
      res.send(422, 'Unable to remove image')
      console.error(err)
    else
      res.send({image: preparedImage(image)})
  )
