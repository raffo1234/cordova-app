(function() {
    'use strict';

    angular.module('igospa.controllers').controller('newDetailController', newDetailController);

    function newDetailController($scope, $http, $stateParams, API_URL, httpRequest, $location, newDetailServices, dbNew, dbFavoriteNew, dbNewTranslation, dbFavoriteNewTranslation) {
        var main = $('#main'),
            loading = $('.loading-js');
        var id = $stateParams.id;



        /* ------------------------------------------ */
        // show language
        /* ------------------------------------------ */
        $scope.language = localStorage.getItem('lang');


        /* ------------------------------------------ */
        // isOnline
        /* ------------------------------------------ */
        var promesa = newDetailServices.getData(id);
        var result = [];
        var new_id = null;
        promesa.then(function(response) {

            var output = '',
                title = response[0]['title'],
                content = response[0]['content'],
                url = "http://manya.pe/detalle_blog.php#!/blog/politicas-y-terminos-en-mi-web/33";

            $scope.result = response[0];
            new_id = response[0].new_id;

            TweenLite.to(loading, .45, { opacity: 0 });
            TweenLite.to(main, 1, { opacity: 1 });


            shareButtons(response);


        }, function(error) {
            // alert("Error: " + error);
        });


        /* ------------------------------------------ */
        // isOffline
        /* ------------------------------------------ */
        // var result = [];

        // dbNew.getByIdLanguage(id, localStorage.getItem('lang')).then(function(response){

        //     $scope.result = response[0];
        //     TweenLite.to(loading, .45, {opacity: 0});
        //     TweenLite.to(main, 1, {opacity: 1});


        //     shareButtons(response);
        // });


        function shareButtons(response) {

            var title = response[0]['title'],
                content = response[0]['content'],
                url = "http://manya.pe/detalle_blog.php#!/blog/politicas-y-terminos-en-mi-web/33";

            /************************************
             *****    SOCIAL SHARE   **************
             ************************************/
            var btn = $('.social-share-js');
            btn.on('click', function(e) {
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
            btn.on('click', function(e) {
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
            dbFavoriteNew.isFavorite(id).then(function(result) {
                result[0]['count'] == 1 ? $('.favorite-js').addClass('active') : $('.favorite-js').removeClass('active');
            });

            /************************************
             *****    ADD TO FAVORITES   **************
             ************************************/
            $('.favorite-js').on('click', function(e) {
                e.preventDefault();
                var self = $(this);

                if (!self.hasClass('active')) {
                    self.addClass('active');

                    var urlNew = API_URL.url + 'new-id/' + id;
                    var urlNewTraslation = API_URL.url + 'new-traslation-id/' + new_id;
                    var promiseNew = httpRequest.send("GET", urlNew);
                    var promiseNewTraslation = httpRequest.send("GET", urlNewTraslation);

                    promiseNew.then(function(response) {
                        $scope.isLoading = false;

                        var neu = [response];
                        dbFavoriteNew.insert(neu);
                    }, function(error) {
                        $scope.isLoading = false;
                        console.log('Hubo un problema');
                    });

                    promiseNewTraslation.then(function(response) {
                        $scope.isLoading = false;
                        dbFavoriteNewTranslation.insert(response);
                    }, function(error) {
                        $scope.isLoading = false;
                        console.log('Hubo un problema');
                    });

                } else {
                    self.removeClass('active');

                    dbFavoriteNew.deleteById(id);
                    dbFavoriteNewTranslation.deleteById(id);

                }


            });
        }
    }


    angular.module('igospa.services').service("newDetailServices", ["$http", "$q", "API_URL", function($http, $q, API_URL) {
        this.getData = function(id) {
            var defer = $q.defer();
            $http.get(API_URL.url + "new/" + localStorage.getItem('lang') + '/' + id)
                .success(function(data) {
                    defer.resolve(data);
                })
                .error(function(data) {
                    defer.reject(data);
                });

            return defer.promise;
        };
    }]);

})();
