//AngularJS模块加载
  //配置 : 在模块的加载阶段，AngularJS会在提供者注册和配置的过程中对模块进行配置。
  //在整个AngularJS的工作流中，这个阶段是唯一能够在应用启动前进行修改的部分
  //运行块 

define(['games/app','games/config','angularLazyLoad'],function(app,config,lazyLoad){
      lazyLoad.configureApp(app);
      app.config(['$stateProvider', '$urlRouterProvider','$locationProvider','$couchPotatoProvider',
      function($stateProvider, $urlRouterProvider,$locationProvider,$couchPotatoProvider){
          // $locationProvider.html5Mode(true);
          $urlRouterProvider.otherwise('/login');
          getPath = function(moduleName, pageName) {
            return config.modulePath + '/' + moduleName + '/partials/' + pageName + '.html';
          };
          var confs , cof , moduleName , route , state , url ,templateUrl ,controllerAs ;
          confs  = config.states;
          for(cof in confs){
            moduleName = confs[cof].name;
            routes = confs[cof].status;
            for(route in routes){
              state = routes[route][0];
              url = routes[route][1];
              ctrlName = routes[route][3];
              depPath = ['games/' + moduleName + '/controllers/' + ctrlName + 'Ctrl'];
              $stateProvider.state(state, {
                url: url,
                templateUrl: getPath(moduleName , ctrlName),
                controller: 'games.ctrl.' + moduleName + "." + ctrlName,
                controllerAs: ctrlName,
                resolve: {
                  l: $couchPotatoProvider.resolveDependencies(depPath)
                }
              });
            } 
          }
         }]).run([
              '$couchPotato',
              '$rootScope',
              '$state',
              '$stateParams',
               function($couchPotato,$rootScope,$state,$stateParams){
                  app.lazy = $couchPotato;
                  $rootScope.$state = $state;
                  $rootScope.$stateParams = $stateParams;
                  $rootScope.$on('$stateChangeStart',function(event,next,params,current){
                    console.log("games dashboard is start");
                  });
               }
      ]);
});