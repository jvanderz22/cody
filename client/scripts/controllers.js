app.controller('HomeController', function($scope, $sce, Image) {
	$scope.trustSrc = function(src) {
    return $sce.trustAsResourceUrl(src)
  }

  Image.getCategoryImages('models').then(function(models) {
    $scope.models = models
  })
  Image.getCategoryImages('art').then(function(art) {
    $scope.art = art
  })

  Image.getCategoryImages('game').then(function(game) {
    $scope.game = game
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


app.controller('ArtController', function($scope, $sce, Image) {
  $scope.trustSrc = function(src) {
    return $sce.trustAsResourceUrl(src)
  }

  Image.getCategoryImages('art').then(function(images) {
    $scope.images = images
  })
});

app.controller('ResumeController', function($scope, $sce, $window) {
  var breakpoint = 768
  $scope.trustSrc = function(src) {
    return $sce.trustAsResourceUrl(src)
  }
	$scope.resume = "/images/resume/resume.pdf";

  setMobileResume = function() {
    if ($window.innerWidth > breakpoint) {
      $scope.mobileResume = false
    } else {
      $scope.mobileResume = true
    }
  }

  setMobileResume()

  var win = angular.element($window)
  win.bind('resize', function(e) {
    setMobileResume()
  })
})

app.controller('EditController', function($scope, $http, $q, $sce, Image) {
  $scope.trustSrc = function(src) {
    return $sce.trustAsResourceUrl(src)
  }

  $scope.imageTypes = ["models", "photos", "art", "game"]
  //extract this to a helper class
  getAllImages = function() {
    var modelsPromise = Image.getCategoryImages('models')
    var photosPromise = Image.getCategoryImages('photos')
    var artPromise = Image.getCategoryImages('art')
    var gamePromise = Image.getCategoryImages('game')
    $q.all([modelsPromise, photosPromise, artPromise, gamePromise]).then(function(data) {
      $scope.imageCategories = [
        { type: 'Models', images: data[0] },
        { type: 'Photos', images: data[1] },
        { type: 'Art', images: data[2] },
        { type: 'Game', images: data[3] }
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

app.controller('GameController', function($scope, $sce, Image) {
  $scope.trustSrc = function(src) {
    return $sce.trustAsResourceUrl(src)
  }

  Image.getCategoryImages('game').then(function(images) {
    $scope.images = images
  })

  /*var unityObjectUrl = "http://webplayer.unity3d.com/download_webplayer-3.x/3.0/uo/UnityObject2.js";
  if (document.location.protocol == 'https:') {
    unityObjectUrl = unityObjectUrl.replace("http://", "https://ssl-");
  }

  $.getScript(unityObjectUrl, function() {
    console.log("loaded")
    var config = {
      width: 960,
      height: 600,
      params:  { enableDebugging: "0"}
    };

    var u = new UnityObject2(config);
    var $missingScreen = $('#unityPlayer').find('.missing');
    $missingScreen.hide()

    u.observeProgress(function (progress) {
      if (progress.pluginStatus == 'missing') {
        $missingScreen.find('a').click(function (e) {
          e.stopPropagation();
          e.preventDefault();
          u.installPlugin();
          return false;
        });
        $missingScreen.show();
      }
      if (progress.pluginStatus == 'installed') {
        $missingScreen.remove();
      }
    });

    u.initPlugin($('#unityPlayer')[0], '/assets/submarine.unity3d')
  })*/
})
