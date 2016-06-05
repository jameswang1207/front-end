define(["games/components/coreModule","base64","angular"], function(mod, base64) {
  return mod.factory("localStorageService", [
    function() {
      var games;
      games = {};
      games.setItem = function(key, value) {
        var valueJson;
        valueJson = JSON.stringify(value);
        valueJson = Base64.encode(valueJson);
        key = Base64.encode(key);
        window.localStorage.setItem(key, valueJson);
      };
      games.getItem = function(key) {
        var item, itemJson;
        key = Base64.encode(key);
        itemJson = window.localStorage.getItem(key);
        if (itemJson) {
          itemJson = Base64.decode(itemJson);
        }
        item = JSON.parse(itemJson);
        return item;
      };
      games.removeItem = function(key) {
        key = Base64.encode(key);
        window.localStorage.removeItem(key);
      };
      games.updateItem = function(key, value) {
        var valueJson;
        key = Base64.encode(key);
        window.localStorage.removeItem(key);
        valueJson = JSON.stringify(value);
        valueJson = Base64.encode(valueJson);
        window.localStorage.setItem(key, valueJson);
      };
      return games;
    }
  ]);
});