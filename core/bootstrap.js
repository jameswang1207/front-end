define([
	'angular',
	'jquery',
	'games/router',
	],
	function(angular,$) {
	    $(function() {
	        return angular.bootstrap(document, ['games']);
	    });
});