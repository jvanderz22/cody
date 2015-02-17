mongoose = require 'mongoose'
db = mongoose.connection

imageSchema = new mongoose.Schema({
  url: String
  ranking: Number
  category: String
  video: Boolean
})

db.once('open', () ->
  console.log('initializing image schema')
  mongoose.model('Image', imageSchema)
)

Image = mongoose.model('Image', imageSchema)

newImage = (url, ranking, category, video = false) ->
  new Image({
    url: url,
    ranking: ranking,
    category: category,
    video: video
  })

categories = ['photos', 'models', 'art', 'game']

validPost = (category, url, ranking) ->
  return false unless category? and url? and ranking?
  return false unless category in categories
  typeof(ranking) is 'number'

preparedImage = (unpreparedImage) ->
  {
    id: unpreparedImage._id,
    category: unpreparedImage.category,
    ranking: unpreparedImage.ranking,
    url: unpreparedImage.url,
    video: unpreparedImage.video
  }

preparedImages = (unpreparedImages) ->
  unpreparedImages.map (image) -> preparedImage(image)

exports.index = (req, res, next) ->
  category = req.query.category
  if category?
    Image.find({category: category}).sort('ranking').exec (err, images) ->
      res.send({images: preparedImages(images)})
  else
    Image.find().sort('ranking').sort('category ranking').exec (err, images) ->
      res.send({images: preparedImages(images)})

exports.post = (req, res) ->
  category = req.body.category
  url = req.body.url
  ranking = req.body.ranking
  video = if req.body.video? then req.body.video else false

  unless validPost(category, url, ranking)
    res.send(400, 'Valid category, url, and ranking parameters required')
    return

  newImage(url, ranking, category, video).save (err, image) ->
    if err?
      res.send(500, 'Unable to save image')
      return console.error(err)
    res.send({image: preparedImage(image)})

exports.put = (req, res) ->
  category = req.body.category
  url = req.body.url
  ranking = req.body.ranking
  video = if req.body.video? then req.body.video else false
  id = req.params.id

  unless id?
    res.send(400, "Id parameter required")
    return

  unless validPost(category, url, ranking)
    res.send(400, 'Valid category, url, and ranking parametes required')
    return

  Image.findById(id, (err, image) ->
    image.category = category
    image.url = url
    image.ranking = ranking
    image.video = video
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
