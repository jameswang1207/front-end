//使用requirejs的好处:防止js加载阻塞页面渲染
bower_path = "../lib";
require.config({
    baseUrl: '/build',
    paths:{
        jquery: bower_path + '/jquery/dist/jquery.min',
        angular: bower_path + '/angular/angular.min',
        angularRoute: bower_path + '/angular-ui-router/release/angular-ui-router.min',
        angularLazyLoad: bower_path + '/angular-couch-potato/dist/angular-couch-potato',
        fakeLoader: bower_path + '/fakeLoader/fakeLoader.min',
        base64: bower_path + '/js-base64/base64.min',
        loadering: bower_path + '/fakeLoader/fakeLoader.min',
        games: '../build'
    },
    shim:{
      angular: {
          deps: ['jquery'],
          exports: 'angular'
      },
      angularLazyLoad: ['angular'],
      angularRoute: ['angular'],
      fakeLoader: {
        deps: ['jquery']
      }
  },
    //就是告诉我们要先加载bootstrap.js文件
    deps:['games/bootstrap'],
    urlArgs: 'bust=' + (new Date()).getTime()
});