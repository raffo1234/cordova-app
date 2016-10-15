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
        $scope.language = $stateParams.lang || 'es';


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
                url = response[0]['urlweb'];

            response[0].image_fullpath = API_URL.url + 'uploads/news/' + response[0].image;
            $scope.result = response[0];

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
                url = response[0]['urlweb'],
                image = response[0]['image'];

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
                    var urlNewTraslation = API_URL.url + 'new-traslation-id/' + id;
                    console.log("url ", API_URL.url + 'uploads/news/' + image);
                    var promiseNew = httpRequest.send("GET", urlNew);
                    var promiseNewTraslation = httpRequest.send("GET", urlNewTraslation);

                    promiseNew.then(function(response) {
                        $scope.isLoading = false;
                        response.image_fullpath = API_URL.url + 'uploads/news/' + response.image;
                        // console.log(response);

                        var neu = [response];
                        // console.log(neu);


                        dbFavoriteNew.insert(neu);

                        // DOWNLOAD IMAGE
                        var url_image = API_URL.url + 'uploads/news/' + image;
                        var name_image = image.replace(/\.[^/.]+$/, "");



                        // DownloadFile(url_image, 'news', name_image);

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

        // DOWNLOAD IMAGE FROM url

        // FIRST
        function DownloadFile(URL, Folder_Name, File_Name) {
          //Parameters mismatch check
          if (URL == null && Folder_Name == null && File_Name == null) {
              return;
          }
          else {
            console.log('internet check');
            //checking Internet connection availablity
            var networkState = navigator.connection.type;
            if (networkState == Connection.NONE) {
                return;
            } else {
                download(URL, Folder_Name, File_Name); //If available download function call
            }
          }
        }

        // SECOND
        function download(URL, Folder_Name, File_Name) {
          //step to request a file system
          window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, fileSystemSuccess, fileSystemFail);

          function fileSystemSuccess(fileSystem) {
            var download_link = encodeURI(URL);
            var ext = download_link.substr(download_link.lastIndexOf('.') + 1); //Get extension of URL

            var directoryEntry = fileSystem.root; // to get root path of directory
            directoryEntry.getDirectory(Folder_Name, { create: true, exclusive: false }, onDirectorySuccess, onDirectoryFail); // creating folder in sdcard
            var rootdir = fileSystem.root;
            var fp = rootdir.toURL(); // Returns Fulpath of local directory

            fp = fp + "/" + Folder_Name + "/" + File_Name + "." + ext; // fullpath and name of the file which we want to give
            // download function call
            filetransfer(download_link, fp);
          }

          function onDirectorySuccess(parent) {
              // Directory created successfuly
          }

          function onDirectoryFail(error) {
              //Error while creating directory
              alert("Unable to create new directory: " + error.code);
          }

          function fileSystemFail(evt) {
              //Unable to access file system
              alert(evt.target.error.code);
           }
        }


        // THIRD
        function filetransfer(download_link, fp) {
          var fileTransfer = new FileTransfer();
          // File download function with URL and local path
          fileTransfer.download(download_link, fp,
          function (entry) {
              alert("download complete: " + entry.fullPath);
          },
          function (error) {
             //Download abort errors or download failed errors
             alert("download error source " + error.source);
             //alert("download error target " + error.target);
             //alert("upload error code" + error.code);

          });
        }


    }


    angular.module('igospa.services').service("newDetailServices", ["$http", "$stateParams", "$q", "API_URL", function($http, $stateParams, $q, API_URL) {
        this.getData = function(id) {
            var defer = $q.defer();
            var lang = $stateParams.lang || 'es';

            $http.get(API_URL.url + "new/" + lang + '/' + id)
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
