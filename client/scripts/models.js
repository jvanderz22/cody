app.factory('Image', function($http) {
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
      return $http.get('api/images?' + category).
        then(function(response) {
          return response.data[category]
        })
    }
  }
})
