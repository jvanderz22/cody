app.controller('HomeController', function($scope, $sce, Image) {
	$scope.trustSrc = function(src) {
    return $sce.trustAsResourceUrl(src)
  }

  Image.getCategoryImages('models').then(function(models) {
    $scope.models = models
  })
  Image.getCategoryImages('photos').then(function(photos) {
    $scope.photos = photos
  })
})

app.controller('ModelsController', function($scope, $sce, Image) {
	$scope.trustSrc = function(src) {
    return $sce.trustAsResourceUrl(src)
  }

  Image.getCategoryImages('models').then(function(images) {
    $scope.images = images
  })
});


app.controller('PhotographyController', function($scope, $sce, Image) {
  $scope.trustSrc = function(src) {
    return $sce.trustAsResourceUrl(src)
  }

  Image.getCategoryImages('photos').then(function(images) {
    $scope.images = images
  })
});

app.controller('ResumeController', function($scope, $sce) {
  $scope.trustSrc = function(src) {
    return $sce.trustAsResourceUrl(src)
  }
	$scope.resume = "/images/resume/resume.pdf";
})

app.controller('EditController', function($scope, $http, $q, $sce, Image) {
  $scope.trustSrc = function(src) {
    return $sce.trustAsResourceUrl(src)
  }

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
