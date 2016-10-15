(function () {
    'use strict';

    angular.module('igospa.controllers').controller('favoriteNewDetailController', favoriteNewDetailController);

    function favoriteNewDetailController($scope, $http, $stateParams, $location, newDetailServices, dbNew, dbFavoriteNew, dbNewTranslation, dbFavoriteNewTranslation){
        var main = $('#main'),
        loading = $('.loading-js');
        var id = $stateParams.id;


        /* ------------------------------------------ */
        // show language
        /* ------------------------------------------ */
        $scope.language = $stateParams.lang || 'es';


        /* ------------------------------------------ */
        // isOffline
        /* ------------------------------------------ */
        var result = [];

        dbFavoriteNew.getByIdLanguage(id, $scope.language).then(function(response){

            $scope.result = response[0];
            TweenLite.to(loading, .45, {opacity: 0});
            TweenLite.to(main, 1, {opacity: 1});


            shareButtons(response);
        });





        return;
        /* ------------------------------------------ */
        // isOnline
        /* ------------------------------------------ */
        var promesa = newDetailServices.getData(id, $location);
        var result = [];
        promesa.then(function (response) {

            var output = '',
                    title = response[0]['title'],
                    content = response[0]['content'],
                    url = response[0]['urlweb'];

            result = response[0];

            TweenLite.to(loading, .45, {opacity: 0});
            TweenLite.to(main, 1, {opacity: 1});


            shareButtons(response);


        }, function (error) {
            // alert("Error: " + error);
        });


        function shareButtons(response){
            var title = response[0]['title'],
                content = response[0]['content'],
                url = response[0]['urlweb'];

            /************************************
            *****    SOCIAL SHARE   **************
            ************************************/
            var btn = $('.social-share-js');
            btn.on('click', function(e){
                e.preventDefault();

                var message = {
                    text: title,
                    url: url
                };
                window.socialmessage.send(message);
            });


            /************************************
            *****    MAIL SHARE   **************
            ************************************/
            var btn = $('.mail-share-js');
            btn.on('click', function(e){
                e.preventDefault();

                var message = {
                    subject: title,
                    text: content,
                    activityTypes: ["Mail"]
                };
                window.socialmessage.send(message);
            });



            /************************************
            *****    CHECK THIS NEW IS FAVORITE   **************
            ************************************/
            dbFavoriteNew.isFavorite(id).then(function(result){
                result[0]['count'] == 1 ? $('.favorite-js').addClass('active') : $('.favorite-js').removeClass('active');
            });

            /************************************
            *****    ADD TO FAVORITES   **************
            ************************************/
            $('.favorite-js').on('click', function(e){
                e.preventDefault();
                var self = $(this);

                if(!self.hasClass('active')){
                    self.addClass('active');

                    dbNew.getById(id).then(function(response){ // id param
                        var neu = [response];
                        dbFavoriteNew.insert(neu);
                    });

                    dbNewTranslation.getByIdNew(id).then(function(response){
                        dbFavoriteNewTranslation.insert(response);
                    });

                }else{
                    self.removeClass('active');

                    dbFavoriteNew.deleteById(id);
                    dbFavoriteNewTranslation.deleteById(id);

                }


            });
        }
    }


    angular.module('igospa.services').service("newDetailServices", ["$http", "$q", "API_URL", function ($http, $q, API_URL) {
        this.getData = function (id, $location) {
            var defer = $q.defer();
            $http.get(API_URL.url + "new/" + localStorage.getItem('lang') + '/' + id)
                    .success(function (data) {
                        defer.resolve(data);
                    })
                    .error(function (data) {
                        defer.reject(data);
                    });

            return defer.promise;
        };
    }
    ]);

})();
