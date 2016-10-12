(function() {
    'use strict';

    angular.module('igospa.controllers').controller('favoriteMessageDetailController', favoriteMessageDetailController);

    function favoriteMessageDetailController($scope, $http, API_URL, $stateParams, dbNote, dbMessage, dbMessageTranslation, dbFavoriteMessage, dbFavoriteMessageTranslation) {

        var main = $('#main'),
            loading = $('.loading-js');

        var container = $('.message-detail-js');
        if (container.length == 0) return false;

        var id = $stateParams.id || '';


        /* ------------------------------------------ */
        // show language
        /* ------------------------------------------ */
        $scope.language = $stateParams.lang || 'es';



        /* ------------------------------------------ */
        // isOffline
        /* ------------------------------------------ */
        $scope.result = [];
        dbFavoriteMessage.getByIdLanguage(id, $scope.language).then(function(response) {

            $scope.result = response[0];
            TweenLite.to(loading, .45, { opacity: 0 });
            TweenLite.to(main, 1, { opacity: 1 });

            shareButtons(response);
        });



        function shareButtons(response) {
            var title = response[0]['date'] + ' - ' + response[0]['title'],
                date = response[0]['date'],
                content = response[0]['content'],
                url = response[0]['urlweb'];
            /************************************
             *****    SOCIAL SHARE   **************
             ************************************/
            var btn = $('.social-share-js');
            btn.on('click', function(e) {
                e.preventDefault();
                console.log(response);
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
             *****    INSERT NOTA   **************
             ************************************/
            $scope.addNote = function() {
                if (!$scope.note) return false;
                var note_obj = { id_message: id, content: $scope.note }; // "id" ya se obtuvo al inicio
                var notes = [];
                notes.push(note_obj);
                dbNote.insert(id, notes);

                $scope.notes.push(note_obj);
                $scope.note = '';
            }

            /************************************
             *****    DELETE NOTA   **************
             ************************************/
            $scope.removeNote = function(idx, id) {
                if (!$scope.notes) return false;
                dbNote.deleteById(id);
                $scope.notes.splice(idx, 1);

            }

            /************************************
             *****    GET ALL NOTAS   **************
             ************************************/

            dbNote.getByIdMessage(id).then(function(result) {
                $scope.notes = result;
            });


            /************************************
             *****    DROP TABLE NOTE   **************
             ************************************/
            $scope.dropTable = function() {
                dbNote.dropTable();
            }

            /************************************
             *****    CHECK THIS MESSAGE IS FAVORITE   **************
             ************************************/
            dbFavoriteMessage.isFavorite(id).then(function(result) {
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

                    dbMessage.getById(id).then(function(response) { // id param
                        var message = [response];
                        dbFavoriteMessage.insert(message);
                    });

                    dbMessageTranslation.getByIdMessage(id).then(function(response) {
                        dbFavoriteMessageTranslation.insert(response);
                    });

                } else {
                    self.removeClass('active');

                    dbFavoriteMessage.deleteById(id);
                    dbFavoriteMessageTranslation.deleteById(id);

                }

                // dbFavoriteMessage.dropTable();

            });
        }

    }
})();
