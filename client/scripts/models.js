app.factory('Image', function($http, $sce) {
  return {
    getAllImages: function() {
      return $http.get('api/images').
        then(function(response) {
          images = []
          allImages = response.data
          for (key in allImages) {
            console.log(allImages[key])
            images = images.concat(allImages[key])
          }
          return images
        })
    },

    getCategoryImages: function(category) {
      return $http.get('api/images?' + category).
        then(function(response) {
          images = response.data[category]
          console.log(images)
          var safeURLImages = []
         // for (key in images) {
           // images[key].url = $sce.trustAsUrl(images[key].url)
          //}
          console.log(images)
          return images
        })
    }
  }
})
