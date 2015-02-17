app.factory('Image', function($http, $sce) {
  return {
    getAllImages: function() {
      return $http.get('api/images').
        then(function(response) {
          images = []
          allImages = response.data
          for (key in allImages) {
            images = images.concat(allImages[key])
          }
          return images
        })
    },

    getCategoryImages: function(category) {
      return $http.get('api/images?category=' + category).
        then(function(response) {
          images = response.data[category]
          return images
        })
    }
  }
})
