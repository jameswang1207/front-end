define(['games/app'], function(app) {
  return app.registerController('games.ctrl.guide.login', [
    '$scope', '$http', '$stateParams','restService',function($scope, $http, $stateParams,rest) {
      var games = this;
      console.log(rest);
      
      return games;
    }
  ]);
});