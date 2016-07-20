(function () {
    'use strict';

    angular.module('igospa.controllers').controller('messageDetailController', messageDetailController);

    function messageDetailController($scope, $http, API_URL, httpRequest, $stateParams, dbNote, dbMessage, dbMessageTranslation, dbFavoriteMessage, dbFavoriteMessageTranslation){

        var main = $('#main'),
        loading = $('.loading-js');

        var container = $('.message-detail-js');
        if(container.length == 0) return false;

        var id = $stateParams.id || '';


        /* ------------------------------------------ */
        // show language
        /* ------------------------------------------ */
        $scope.language = localStorage.getItem('lang');

        /* ------------------------------------------ */
        // isOnline
        /* ------------------------------------------ */
        $scope.result = [];
        var message_id = null;
        $http({
            method: 'GET',
            url: API_URL.url + "message/" + localStorage.getItem('lang') + '/' + id,

        }).then(function(response){
            // console.log(response);
            var response = response.data;

            $scope.result = response[0];
            message_id = response[0].message_id;
            // console.log(response[0].message_id);
            TweenLite.to(loading, .45, {autoAlpha: 0});
            TweenLite.to(main, 1, {autoAlpha: 1});

            shareButtons(response);

        });



        return;
        /* ------------------------------------------ */
        // isOffline
        /* ------------------------------------------ */
        $scope.result = [];
        dbMessage.getByIdLanguage(id, localStorage.getItem('lang')).then(function(response){

            $scope.result = response[0];

            TweenLite.to(loading, .45, {opacity: 0});
            TweenLite.to(main, 1, {opacity: 1});

            shareButtons(response);
        });



        function shareButtons(response){
            var title = response[0]['title'],
                content = response[0]['content'],
                url = "http://manya.pe/detalle_blog.php#!/blog/politicas-y-terminos-en-mi-web/33";

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
            *****    INSERT NOTA   **************
            ************************************/
            var notes = [];
            $scope.notes = [];
            $scope.addNote = function(){
                if(!$scope.note) return false;
                var note = {id_message: id, content: $scope.note}; // "id" ya se obtuvo al inicio
                notes.push(note);
                dbNote.insert(id, notes);

                $scope.notes.push(note);
                $scope.note = '';
            }

            /************************************
            *****    GET ALL NOTAS   **************
            ************************************/

            dbNote.getByIdMessage(id).then(function(result){
                $scope.notes = result;
            });


            /************************************
            *****    DROP TABLE NOTE   **************
            ************************************/
            $scope.dropTable = function(){
                dbNote.dropTable();
            }

            /************************************
            *****    CHECK THIS MESSAGE IS FAVORITE   **************
            ************************************/
            dbFavoriteMessage.isFavorite(id).then(function(result){
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

                    var urlMessage = API_URL.url + 'message-id/' + id;
                    var urlMessageTraslation = API_URL.url + 'message-traslation-id/' + message_id;
                    var promiseMessage = httpRequest.send("GET", urlMessage);
                    var promiseMessageTraslation = httpRequest.send("GET", urlMessageTraslation);

                    promiseMessage.then(function (response){
                      $scope.isLoading = false;

                      var message = [response];
                      dbFavoriteMessage.insert(message);
                    }, function(error){
                      $scope.isLoading = false;
                      console.log('Hubo un problema');
                    });

                    promiseMessageTraslation.then(function (response){
                      $scope.isLoading = false;
                      dbFavoriteMessageTranslation.insert(response);
                    }, function(error){
                      $scope.isLoading = false;
                      console.log('Hubo un problema');
                    });

                    // dbMessage.getById(id).then(function(response){
                    //     var message = [response];
                    //     dbFavoriteMessage.insert(message);
                    // });

                    // dbMessageTranslation.getByIdMessage(id).then(function(response){
                    //     dbFavoriteMessageTranslation.insert(response);
                    // });

                }else{
                    self.removeClass('active');

                    dbFavoriteMessage.deleteById(id);
                    dbFavoriteMessageTranslation.deleteById(id);
                }

                // dbFavoriteMessage.dropTable();

            });
        }

    }
})();

