define([
	    'angular',
	    'angularLazyLoad',
	    'angularRoute',
	    'games/components/coreLoader'
	    ],
	    function(angular){
            return angular.module('games',['scs.couch-potato','ui.router','games.components']);
        }
);