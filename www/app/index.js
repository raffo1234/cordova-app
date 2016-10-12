(function () {
	'use strict';

	angular.module('igospa', ['igospa.directives', 'igospa.controllers', 'igospa.services', 'ui.router', 'ngSanitize', 'infinite-scroll']);
	angular.module('igospa.directives', []);
	angular.module('igospa.controllers', []);
	angular.module('igospa.services', []);


	// CONFIG
	angular.module('igospa')

	.config(
	  [          '$stateProvider', '$urlRouterProvider',
	    function ($stateProvider,   $urlRouterProvider) {

	      $urlRouterProvider
	        .otherwise('/');

	      $stateProvider
	        .state("home", {
	          url: "/",
	          templateUrl: 'templates/templateHome.html',
	          controller: 'homeController'
	        })
	        .state('messages', {
				 abstract: true,
	          url: '/messages/:lang',
	          templateUrl: 'templates/templateMessages.html',
	          controller: 'messagesController'
	        })
	        .state('messages.year', {
	          url: '/year/:lang/:year?offset&limit',
	          params: {
				 year: {
					value: null,
					squash: true
				 },
				 offset: {
		            value: '0',
		            squash: true
		       },
		       limit: {
		            value: '10',
		            squash: true
		       }
			  },
	          templateUrl: 'templates/templateMessagesByYear.html',
	          controller: 'messagesByYearController'
	        })
	        .state('message', {
	          url: '/message/:lang/:id',
	          templateUrl: 'templates/templateMessagesDetail.html',
	          controller: 'messageDetailController'
	        })
	        .state('favorite_messages', {
	          url: '/favorite_messages/:lang',
	          templateUrl: 'templates/templateFavoriteMessages.html',
	          controller: 'favoriteMessagesController'
	        })
	        .state('favorite_messages.year', {
	          url: '/year/:lang/:year',
	          params: {
					 year: {value: null, squash: true}
			    },
	          templateUrl: 'templates/templateFavoriteMessagesByYear.html',
	          controller: 'favoriteMessagesByYearController'
	        })
	        .state('favorite_message', {
	          url: '/favorite_message/:lang/:id',
	          templateUrl: 'templates/templateFavoriteMessagesDetail.html',
	          controller: 'favoriteMessageDetailController'
	        })

	        .state('news', {
	          url: '/news/:lang',
	          templateUrl: 'templates/templateNews.html',
	          controller: 'newsController'
	        })
	        .state('new', {
	          url: '/new/:lang/:id',
	          templateUrl: 'templates/templateNewDetail.html',
	          controller: 'newDetailController'
	        })
	        .state('favorite_news', {
	          url: '/favorite_news/:lang',
	          templateUrl: 'templates/templateFavoriteNews.html',
	          controller: 'favoriteNewsController'
	        })
	        .state('favorite_new', {
	          url: '/favorite_new/:lang/:id',
	          templateUrl: 'templates/templateFavoriteNewDetail.html',
	          controller: 'favoriteNewDetailController'
	        })
	        .state('histories', {
	          url: '/histories/:lang',
	          templateUrl: 'templates/templateHistories.html',
	          controller: 'historiesController'
	        })
	        .state('history', {
	          url: '/history/:lang/:id',
	          templateUrl: 'templates/templateHistoryDetail.html',
	          controller: 'historyDetailController'
	        })
	        .state('personages', {
	          url: '/personages/:lang',
	          templateUrl: 'templates/templatePersonages.html',
	          controller: 'personagesController'
	        })
	        .state('personage', {
	          url: '/personage/:lang/:id',
	          templateUrl: 'templates/templatePersonageDetail.html',
	          controller: 'personageDetailController'
	        })
	        .state('places', {
	          url: '/places/:lang',
	          templateUrl: 'templates/templatePlaces.html',
	          controller: 'placesController'
	        })
	        .state('places.place', {
	          url: '/place/:lang/:id',
	          params: {
				 id: {value: null, squash: true}
			  },
	          templateUrl: 'templates/templatePlaceDetail.html',
	          controller: 'placeDetailController'
	        })
	    }
	  ]
	);



})();
