app.factory('Image', function($http, $sce) {
  return {
    getAllImages: function() {
      return $http.get('api/images').
        then(function(response) {
          return response.data['images']
        })
    },

    getCategoryImages: function(category) {
      return $http.get('api/images?category=' + category).
        then(function(response) {
          return response.data['images']
        })
    }
  }
})
