(function () {
    'use strict';

	angular
		.module('igospa')
		.filter('unsafe', function($sce) { return $sce.trustAsHtml; });

});