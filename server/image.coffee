yaml = require('js-yaml')
fs = require('fs')
uuid = require('node-uuid')

categories = ['photos', 'models']
imagesFilePath = './data/images.yml'

getImages = () ->
  try
    images = yaml.safeLoad(fs.readFileSync(imagesFilePath))
    for category in categories
      unless images[category]?
        images[category] = []
    images
  catch e
    throw 'Unable to load images'

validPost = (category, url, ranking) ->
  return false unless category? and url? and ranking?
  return false unless category in categories
  typeof(ranking) is 'number'

createImage = (url, ranking) ->
  {
    id: uuid.v1(),
    url: url,
    ranking: ranking
  }

createImageWithId = (url, ranking, id) ->
  {
    id: id,
    url: url,
    ranking: ranking
  }

saveYAML = (object) ->
  yamlObj = yaml.safeDump(object)
  fs.writeFileSync(imagesFilePath, yamlObj)
  console.log(yamlObj)

sortBy = (key, a, b) ->
  return 1 if a[key] > b[key]
  return -1 if a[key] < b[key]
  return 0

sortImages = (images, category = null) ->
  if category?
    images[category].sort (a, b) ->
      sortBy('ranking', a, b)
  else
    for category in categories
      images[category].sort (a, b) ->
        sortBy('ranking', a, b)

saveImages = (images, category, newImage) ->
  images[category].push(newImage)
  sortImages(images, category)
  saveYAML(images)

removeImage = (images, id) ->
  for category in categories
    for image in images[category]
      if image['id'] is id
        indexOfImage = images[category].indexOf(image)
        images[category].splice(indexOfImage, 1)
        return images
  throw 'No image with that id exists'

findImage = (id) ->
  images = getImages()
  for category in categories
    for image in images[category]
      return image if image['id'] is id
  throw 'No image with that id exists'


exports.get = (req, res) ->
  try
    res.send(getImages())
  catch e
    res.send(500, e)

exports.post = (req, res) ->
  try
    images = getImages()
  catch e
    res.send(500, e)
    return

  category = req.body.category
  url = req.body.url
  ranking = req.body.ranking

  unless validPost(category, url, ranking)
    res.send(400, 'Valid category, url, and ranking parametes required')
    return

  newImage = createImage(url, ranking)
  saveImages(images, category, newImage)
  res.send(images)


exports.put = (req, res) ->
  try
    images = getImages()
  catch e
    res.send(500, e)
    return

  category = req.body.category
  url = req.body.url
  ranking = req.body.ranking
  id = req.params.id

  unless id?
    res.send(400, "Id parameter required")
    return

  unless validPost(category, url, ranking)
    res.send(400, 'Valid category, url, and ranking parametes required')
    return

  try
    removeImage(images, req.params.id)
  catch e
    res.send(404, e)
    return

  editedImage = createImageWithId(url, ranking, id)
  saveImages(images, category, editedImage)
  res.send(200, editedImage)

exports.delete = (req, res) ->
  try
    images = getImages()
  catch e
    res.send(500, e)
    return

  try
    removeImage(images, req.params.id)
  catch e
    res.send(404, e)
    return

  saveYAML(images)
  res.send(201)

exports.getSingle = (req, res) ->
  try
    res.send(200, findImage(req.params.id))
  catch e
    res.send(404, e)
