app.controller('HomeController', function($scope, Image) {
	Image.getCategoryImages('models').then(function(models) {
    $scope.models = models
  })
  Image.getCategoryImages('photos').then(function(photos) {
    $scope.photos = photos
  })
})

app.controller('ModelsController', function($scope, Image) {
	Image.getCategoryImages('models').then(function(images) {
    $scope.images = images
  })
});


app.controller('PhotographyController', function($scope, Image) {
	Image.getCategoryImages('photos').then(function(images) {
    $scope.images = images
  })
});

app.controller('ResumeController', function($scope) {
	$scope.resume = "/images/resume/resume.pdf";
})
app.controller('EditController', function($scope, $http, $q, Image) {
  $scope.imageTypes = ["models", "photos"]
  //extract this to a helper class
  getAllImages = function() {
    var modelsPromise = Image.getCategoryImages('models')
    var photosPromise = Image.getCategoryImages('photos')
    $q.all([modelsPromise, photosPromise]).then(function(data) {
      $scope.imageCategories = [
        { type: 'Models', images: data[0] },
        { type: 'Photos', images: data[1] }
      ]
    })
  }

  getAllImages()

  $scope.submitImage = function(image){
    postRequest = $http.post('api/images', image)
    postRequest.success(function(data, status, headers, config) {
      $scope.newImage = {}
      getAllImages()
    })
  }

  $scope.updateImage = function(image){
    console.log(image)
    putRequest = $http.put('api/images/' + image.id, image)
    putRequest.success(function(data, status, headers, config) {
      getAllImages()
    })
  }

  $scope.deleteImage = function(image) {
    deleteRequest = $http.delete('api/images/' + image.id)
    deleteRequest.success(function() {
      getAllImages()
    })
  }
})
