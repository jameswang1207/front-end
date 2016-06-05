define(['games/components/coreModule', 'jquery', 'angular'], function(mod) {
  return mod.factory('restService', [
    '$http', '$location', '$rootScope', '$stateParams', 'localStorageService', function($http, $location, $rootScope, $stateParams, localStorageService) {
      var httpConfig, i, len, methods, noLoading, rest;
      rest = {};

      // this is methods type
      methods = ['get', 'post', 'del', 'put'];
      noLoading = false;
      rest.noLoading = function() {
        noLoading = true;
        return rest;
      };

      rest.showLoading = function() {
        noLoading = false;
        return rest;
      };

      rest.before = function(params) {
        console && console.log('before request:', params);
      };

      rest.after = function(params) {
        noLoading = false;
        console && console.log('after request:', params);
      };

      httpConfig = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      };
      len = methods.length;
      i = 0;
      while (i < len) {
        (function() {
          var methodName;
          methodName = methods[i];
          return rest[methodName] = function(url, data, okCallback, failCallback) {
            var httpObj, path;
            if (!url) {
              throw new Error('URL must be specified');
            }
            if ('function' === typeof data) {
              failCallback = okCallback;
              okCallback = data;
              data = {};
            }
            rest.before(arguments);
            httpObj = null;

            if ('del' === methodName) {
              httpConfig.data = data;
              httpObj = $http['delete'](url, httpConfig);
            } else if ('get' === methodName) {
              httpObj = $http[methodName](url, {
                params: data
              });
            } else {
              httpObj = $http[methodName](url, data, httpConfig);
            }

            return httpObj.success(function(res) {
              okCallback && okCallback(res);
              return rest.after(res);
            }).error(function(res, status) {
              switch (status) {
                case 401:
                  console.log("401");
                  break;
                case 403:
                  console.log("403");
                  break;
                case 440:
                  console.log("440");
                  break;
                default:
                  failCallback(res);
              }
              return rest.after(res);
            });
          };
        })();
        i++;
      }
      return rest;
    }
  ]);
});
