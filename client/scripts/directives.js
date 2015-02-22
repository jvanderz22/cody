var breakpoint = 768
app.directive('responsiveHide', [ '$window', function($window) {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      var win = angular.element($window);

      scope.responsiveBreak = function() {
        windowWidth = $window.innerWidth
        if (windowWidth < breakpoint)  {
          return true
        }
        else {
          return false
        }
      }

      scope.responsiveShow = function() {
        windowWidth = $window.innerWidth
        if (windowWidth >= breakpoint)  {
          return true
        }
        else {
          return false
        }
      }

      scope.toggleElement = function(cssClass) {
        scope.$emit('toggleElement')
      }

      win.bind('resize', function (e) {
        scope.$apply();
      })
    }
  }
}])

app.directive('responsiveDropdownToggle', [ '$window', function ($window) {
  return {
    restrict: 'A',

    link: function(scope, element, attrs) {
      scope.hideNavbar = true

      scope.$on('toggleElement', function(data) {
        scope.hideNavbar = !scope.hideNavbar
      })

      scope.$on('$routeChangeSuccess', function(path) {
        scope.hideNavbar = true
      })

      var win = angular.element($window);
      win.bind('resize', function (e) {
        if (scope.hideNavbar == false) {
          if ($window.innerWidth >= breakpoint) {
            scope.hideNavbar = true
            scope.$apply();
          }
        }
      })
    }
  }
}])
