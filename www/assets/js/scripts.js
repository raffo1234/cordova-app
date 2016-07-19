/************************************
*****    CURRENT LANGUAGE   *********
************************************/
function setCurrentLanguage(){
    var currentLanguage = '';
    var btn = $('.btn-language-js');

    btn.on('click', function(){
        var self = $(this);
        currentLanguage = self.data('lang');
        localStorage.setItem('lang', currentLanguage);
    });
}

/************************************
*****    HOME   *******************
************************************/

function loadingHome(){
    
    var ele = $(".intro-js"),
        logo = $(".logo-js"),
        main = $('#main'),
        loading = $(".loading-js"),
        flag_1 = ele.find('li').eq(0),
        flag_2 = ele.find('li').eq(1),
        flag_3 = ele.find('li').eq(2);

        if(ele.length == 0) return false;
        
        var eleSrc = ele.css('background-image');
        src = eleSrc.replace(/^url\(["']?/, '').replace(/["']?\)$/, '');
        $('<img />').attr('src', src).load(function () {
            
            TweenLite.to(ele, 0.35, {
                opacity: 1, onComplete: function () {
                    TweenLite.to(logo, 1.2, {delay: 0,
                        opacity: 1, scale: 1
                    });            
                    TweenLite.to(flag_1, 1.2, {delay: 0.6,
                        opacity: 1, top: 0
                    });        
                    TweenLite.to(flag_2, 1.2, {delay: 0.9,
                        opacity: 1, top: 0
                    });        
                    TweenLite.to(flag_3, 1.2, {delay: 1.2,
                        opacity: 1, top: 0
                    });        
                }
            });
        });

}

/************************************
*****    MESSAGES YEARS  *************
************************************/
function loadingMessagesYears(){

    var loading = $('.loading-js'),
        items = $('.messages-years-js'),
        $languages = $('.languages-js'),
        $language_btn = $languages.find('a'),
        idOnce;

        $language_btn.attr('href', 'mensajes.html?year=' + getParameterByName('year'));

        if(items.length == 0) return false;
        
        items.html('').empty();  

        $.ajax({
            type: "GET",
            url: "http://rafaelmeza.com/projects/igospa/api/v1/messages/" + localStorage.getItem('lang') + '?fields=date_created&sort=-date_created',
            data: {},
            dataType: 'json',
            contentType: "application/json; charset=utf-8",
            crossDomain: true,
            timeout: 15000,
            success: function (response) {

                var uniqueYears = [];
                $.map(response, function(n, i){
                    var date = n['date_created'];
                        var date_year_1 = date.split(' ');
                        var date_year_2 = date_year_1[0].split('-');
                        var date_year_3 = date_year_2[0];
                        
                        if($.inArray(date_year_3, uniqueYears) === -1) uniqueYears.push(date_year_3);
                });
                
                var item = '';
                $.each(uniqueYears, function(i,n){
                    var classActive = n == getParameterByName('year') ? "active" : "";
                    item += '<a href="javascript:void(0);" data-year="'+ n +'" class="btn-year btn-year-js '+ classActive +'">' +
                            ' <span>'+ n +'</span>' +
                            '</a>';
                });
                items.html(item);

                var btn_year = $('.btn-year-js');
                btn_year.on('click', function(e){
                    e.preventDefault();
                    var self = $(this),
                        selfYear = self.data('year');
                    
                    $language_btn.attr('href', 'mensajes.html?year=' + selfYear);
                    loadingMessages(false, selfYear);

                    // ADD/REMOVE ACTIVE CLASS
                    btn_year.removeClass('active');
                    self.addClass('active');
                });

                TweenLite.to(loading, .45, {delay: 0, autoAlpha: 0});
                TweenLite.to(items, 1, {delay: 0, autoAlpha: 1});

            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert('new textStatus=' + textStatus + ' errorThrown=' + errorThrown);
            },
            complete : function(xhr, status) {
                // alert('Petición realizada');
            }
        });
}


/************************************
*****    MESSAGES LIST   **************
************************************/
function loadingMessages(isOnce, year){

    var main = $('#main'),
        loading = $('.loading-js'),
        
        year = typeof year !== 'undefined' ? year : getParameterByName('year');

        var items = $('.messages-js');
        if(items.length == 0) return false;

        if(!isOnce){
            TweenLite.to(loading, .45, {delay: 0,
                    opacity: 1
            });
            TweenLite.to(main, .45, {delay: 0,
                opacity: 0, onComplete: function(){
                    items.html('').empty();            
                }
            });   
        }else{
            items.html('').empty();  
        }


        $.ajax({
            type: "GET",
            url: "http://rafaelmeza.com/projects/igospa/api/v1/messages/" + localStorage.getItem('lang') + '?sort=-date_created&year=' + year,
            data: {},
            dataType: 'json',
            contentType: "application/json; charset=utf-8",
            crossDomain: true,
            timeout: 15000,
            success: function (response) {

                var item = '';
                $.map(response, function(n, i){
                    var id = n['id'],
                        title = n['title'],
                        excerpt = n['excerpt'];

                    item += '<div id="message-'+ id +'" class="list-item">' +
                              '  <a href="mensajes2.html?id='+ id +'">' +
                              '      <h3>'+ title +' </h3>' +
                              '      <p>' + excerpt + '</p>' +
                              '  </a>' +
                              '</div>';
                });
                items.html(item);

                TweenLite.to(loading, .45, {delay: 0,
                    opacity: 0
                });
                TweenLite.to(main, 1, {delay: 0,
                    opacity: 1
                });

            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert('new textStatus=' + textStatus + ' errorThrown=' + errorThrown);
            },
            complete : function(xhr, status) {
                // alert('Petición realizada');
            }
        });
}






/************************************
*****    MESSAGE DETAIL   **************
************************************/
function loadingMessageDetail(){

    var main = $('#main'),
        loading = $('.loading-js');

        
        var container = $('.message-detail-js');
        if(container.length == 0) return false;

        var id = getParameterByName('id');
        
        container.html('').empty();
        $.ajax({
            type: "GET",
            url: "http://rafaelmeza.com/projects/igospa/api/v1/message/" + localStorage.getItem('lang') + '/' + id,
            data: {},
            dataType: 'json',
            contentType: "application/json; charset=utf-8",
            crossDomain: true,
            timeout: 15000,
            success: function (response) {

                var output = '',
                    title = response[0]['title'],
                    content = response[0]['content'],
                    url = "http://manya.pe/detalle_blog.php#!/blog/politicas-y-terminos-en-mi-web/33";

                 output += '<h2>'+ title +'</h2>' +
                           '<p>' + content + '</p>';    

                container.html(output);
                

                TweenLite.to(loading, .45, {delay: 0,
                    opacity: 0
                });
                TweenLite.to(main, 1, {delay: 0,
                    opacity: 1
                });

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

            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert('new textStatus=' + textStatus + ' errorThrown=' + errorThrown);
            },
            complete : function(xhr, status) {
                // alert('Petición realizada');
            }
        });
}



/************************************
*****   FAVORITE MESSAGES LIST  **************
************************************/
function loadingFavoriteMessages(isOnce, year){


    var main = $('#main'),
        loading = $('.loading-js'),
        
        year = typeof year !== 'undefined' ? year : getParameterByName('year');

        var items = $('.favorite-messages-js');
        if(items.length == 0) return false;



        if(!isOnce){
            TweenLite.to(loading, .45, {delay: 0,
                opacity: 1
            });
            TweenLite.to(main, .45, {delay: 0,
                opacity: 0, onComplete: function(){
                    items.html('').empty();            
                }
            });   
        }else{
            items.html('').empty();  
        }


        // WEBSQL - dao.js
        dao.initialize(function() {
            alert('database initialized');
        });
}




/************************************
*****    HISTORIES LIST   **************
************************************/
function loadingHistories(){

    var main = $('#main'),
        loading = $('.loading-js');

        
        var items = $('.histories-js');
        if(items.length == 0) return false;

        items.html('').empty();
        $.ajax({
            type: "GET",
            url: "http://rafaelmeza.com/projects/igospa/api/v1/histories/" + localStorage.getItem('lang'),
            data: {},
            dataType: 'json',
            contentType: "application/json; charset=utf-8",
            crossDomain: true,
            timeout: 15000,
            success: function (response) {

                var item = '';
                $.map(response, function(n, i){
                    var id = n['id'],
                        title = n['title'],
                        excerpt = n['excerpt'];

                    item += '<div '+ id +' class="list-item">' +
                              '  <a href="historia2.html?id='+ id +'">' +
                              '      <h3>'+ title +' </h3>' +
                              '      <p>' + excerpt + '</p>' +
                              '  </a>' +
                              '</div>';
                });
                items.html(item);

                TweenLite.to(loading, .45, {delay: 0,
                    opacity: 0
                });
                TweenLite.to(main, 1, {delay: 0,
                    opacity: 1
                });

            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert('new textStatus=' + textStatus + ' errorThrown=' + errorThrown);
            },
            complete : function(xhr, status) {
                // alert('Petición realizada');
            }
        });
}



/************************************
*****    HISTORY DETAIL   **************
************************************/
function loadingHistoryDetail(){

    var main = $('#main'),
        loading = $('.loading-js');

   
        
        var container = $('.history-detail-js');
        if(container.length == 0) return false;

        var id = getParameterByName('id');
        var $languages = $('.languages-js'),
            $language_btn = $languages.find('a');
            $language_btn.attr('href', 'historia2.html?id=' + id);
        
        container.html('').empty();
        $.ajax({
            type: "GET",
            url: "http://rafaelmeza.com/projects/igospa/api/v1/history/" + localStorage.getItem('lang') + '/' + id,
            data: {},
            dataType: 'json',
            contentType: "application/json; charset=utf-8",
            crossDomain: true,
            timeout: 15000,
            success: function (response) {

                var output = '',
                    title = response[0]['title'],
                    content = response[0]['content'];

                 output += '<h2>'+ title +'</h2>' +
                           '<p>' + content + '</p>';    

                container.html(output);

                TweenLite.to(loading, .45, {delay: 0,
                    opacity: 0
                });
                TweenLite.to(main, 1, {delay: 0,
                    opacity: 1
                });

            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert('new textStatus=' + textStatus + ' errorThrown=' + errorThrown);
            },
            complete : function(xhr, status) {
                // alert('Petición realizada');
            }
        });
}



/************************************
*****    NEWS LIST   **************
************************************/
function loadingNews(){

    var main = $('#main'),
        loading = $('.loading-js');

        
        var items = $('.news-js');
        if(items.length == 0) return false;

        items.html('').empty();
        $.ajax({
            type: "GET",
            url: "http://rafaelmeza.com/projects/igospa/api/v1/news/" + localStorage.getItem('lang'),
            data: {},
            dataType: 'json',
            contentType: "application/json; charset=utf-8",
            crossDomain: true,
            timeout: 15000,
            success: function (response) {

                var item = '';
                $.map(response, function(n, i){
                    var id = n['id'],
                        title = n['title'],
                        excerpt = n['excerpt'];

                    item += '<div class="listnews-item">'+
                                '    <a href="noticias2.html?id='+ id +'">'+
                                '        <span class="date">'+
                                '            <span class="month">'+
                                '                10 <br> '+
                                '                Set'+
                                '            </span>'+
                                '            <span class="year">'+
                                '                2014'+
                                '            </span>'+
                                '        </span>      '+  
                                '        <h3>'+ title +'</h3>'+
                                '        <p>'+ excerpt +'</p>'+
                                '        <img src="assets/images/noticia_thumb_1.jpg" class="img" />'+
                                '    </a>'+
                                '</div>';

                              

                });
                items.html(item);

                TweenLite.to(loading, .45, {delay: 0,
                    opacity: 0
                });
                TweenLite.to(main, 1, {delay: 0,
                    opacity: 1
                });

            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert('new textStatus=' + textStatus + ' errorThrown=' + errorThrown);
            },
            complete : function(xhr, status) {
                // alert('Petición realizada');
            }
        });
}


/************************************
*****    NEW DETAIL   **************
************************************/
function loadingNewDetail(){

    var main = $('#main'),
        loading = $('.loading-js');     
        
    var container = $('.new-detail-js');
    if(container.length == 0) return false;

    var id = getParameterByName('id');
    
    container.html('').empty();
    $.ajax({
        type: "GET",
        url: "http://rafaelmeza.com/projects/igospa/api/v1/new/" + localStorage.getItem('lang') + '/' + id,
        data: {},
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        crossDomain: true,
        timeout: 15000,
        success: function (response) {

            var output = '',
                title = response[0]['title'],
                content = response[0]['content'],
                url = "http://manya.pe/detalle_blog.php#!/blog/politicas-y-terminos-en-mi-web/33";;

            output += '<div class="carousel-img">'+
                       '     <img src="assets/images/lugar_1.jpg" title="La parroquia de Medjugorje" />'+
                       ' </div>'+
                       ' <h2>' + title + '</h2>'+
                       ' <p>'+ content +'</p>';
            
            container.html(output);

            TweenLite.to(loading, .45, {delay: 0,
                opacity: 0
            });
            TweenLite.to(main, 1, {delay: 0,
                opacity: 1
            });


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
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert('new textStatus=' + textStatus + ' errorThrown=' + errorThrown);
        },
        complete : function(xhr, status) {
            // alert('Petición realizada');
        }
    });
}



/************************************
********  PLACES LIST   **************
************************************/
function loadingPlaces(){

    var main = $('.header-carousel-inner-js'),
        loading = $('.loading-js'),
        $languages = $('.languages-js'),
        $language_btn = $languages.find('a'),
        idOnce;
        
        var items = $('.header-carousel-inner-js');
        if(items.length == 0) return false;

        items.html('').empty();
        $.ajax({
            type: "GET",
            url: "http://rafaelmeza.com/projects/igospa/api/v1/places/" + localStorage.getItem('lang'),
            data: {},
            dataType: 'json',
            contentType: "application/json; charset=utf-8",
            crossDomain: true,
            timeout: 15000,
            success: function (response) {

                var item = '';
                $.map(response, function(n, i){

                    var id = n['id'];
                        excerpt = n['image'];
                    if(i == 0){
                        idOnce = getParameterByName('id') != '' ? getParameterByName('id') : id;
                        $language_btn.attr('href', 'lugares.html?id=' + idOnce);
                        loadingPlaceDetail(idOnce, true);
                    }
                    var classActive = id == idOnce ? "active" : "";
                    item += '<a href="javascript:void(0);" data-id="'+ id +'" class="btn-thumb btn-thumb-js '+ classActive +'">'+
                            '    <img src="assets/images/lugar_thumb_1.jpg">'+
                            '</a>';

                });
                items.html(item);


                // HIDE LOADING
                TweenLite.to(loading, .45, {delay: 0, opacity: 0});
                TweenLite.to(main, 1, {delay: 0, opacity: 1});

                // click to get place by id
                $('.btn-thumb-js').on('click', function(e){
                    e.preventDefault();
                    var self = $(this),
                        selfID = self.data('id');
                    $language_btn.attr('href', 'lugares.html?id=' + selfID);
                    loadingPlaceDetail(selfID, false);

                    // ADD ACTIVE CLASS
                    $('.btn-thumb').removeClass('active');
                    self.addClass('active');
                });

            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert('new textStatus=' + textStatus + ' errorThrown=' + errorThrown);
            },
            complete : function(xhr, status) {
                // alert('Petición realizada');
            }
        });
}


/************************************
*****    PLACE DETAIL   **************
************************************/
function loadingPlaceDetail(id, isOnce){

    var main = $('#main'),
        loading = $('.loading-js'),
        $languages = $('.languages-js'),
        $language_btn = $languages.find('a');

        var container = $('.place-detail-js');
        if(container.length == 0) return false;

        if(!isOnce){
            TweenLite.to(loading, .45, {delay: 0,
                    opacity: 1
            });
            TweenLite.to(main, .45, {delay: 0,
                opacity: 0, onComplete: function(){
                    container.html('').empty();            
                }
            });   
        }else{
            container.html('').empty();    
        }
        
        $.ajax({
            type: "GET",
            url: "http://rafaelmeza.com/projects/igospa/api/v1/place/" + localStorage.getItem('lang') + '/' + id,
            data: {},
            dataType: 'json',
            contentType: "application/json; charset=utf-8",
            crossDomain: true,
            timeout: 15000,
            success: function (response) {

                var output = '',
                    title = response[0]['title'],
                    content = response[0]['content'];

                output += '<div class="carousel-img">'+
                           '     <img src="assets/images/lugar_1.jpg" title="La parroquia de Medjugorje" />'+
                           ' </div>'+
                           ' <h2>' + title + '</h2>'+
                           ' <p>'+ content +'</p>';
                
                container.html(output);

                TweenLite.to(loading, .45, {delay: 0,
                    opacity: 0
                });
                TweenLite.to(main, 1, {delay: 0,
                    opacity: 1
                });

            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert('new textStatus=' + textStatus + ' errorThrown=' + errorThrown);
            },
            complete : function(xhr, status) {
                // alert('Petición realizada');
            }
        });
}




// GENERALES
function dropdownLanguages(){
    var ele = $('.wrapper-languages-js');

    ele.on('click', function(){
        var self = $(this);

        if(!self.hasClass('active')){
            self.addClass('active');
            TweenLite.to($('.languages li').eq(2), 0.4, {delay: 0,
                autoAlpha: 1, left: 0
            });   
            TweenLite.to($('.languages li').eq(1), 0.4, {delay: 0.3,
                autoAlpha: 1, left: 0
            });   
            TweenLite.to($('.languages li').eq(0), 0.4, {delay: 0.5,
                autoAlpha: 1, left: 0
            });
        }else{
            self.removeClass('active');
            TweenLite.to($('.languages li').eq(0), 0.4, {delay: 0,
                autoAlpha: 0, left: 8
            });   
            TweenLite.to($('.languages li').eq(1), 0.4, {delay: 0.3,
                autoAlpha: 0, left: 8
            });   
            TweenLite.to($('.languages li').eq(2), 0.4, {delay: 0.5,
                autoAlpha: 0, left: 8
            });   
        }
    });

    $(window).on('click', function(){
        if(ele.hasClass('active')){
            ele.removeClass('active');   
            TweenLite.to($('.languages li').eq(0), 0.4, {delay: 0,
                autoAlpha: 0, left: 8
            });   
            TweenLite.to($('.languages li').eq(1), 0.4, {delay: 0.3,
                autoAlpha: 0, left: 8
            });   
            TweenLite.to($('.languages li').eq(2), 0.4, {delay: 0.5,
                autoAlpha: 0, left: 8
            });   
        }
    });
    
    ele.on('click', function(e){
        e.stopPropagation();
    });
}

function footerHide(){
    var ele = $('input, textarea'),
        footer = $('#footer');

    ele.focus(function(){
        TweenLite.set(footer, {
            autoAlpha: 0
        }); 
        $('html, body').animate({scrollTop: ele.offset().top}, 'fast');
    });
    ele.blur(function(){
        TweenLite.to(footer, 1, {delay: 0.2,
            autoAlpha: 1
        }); 
    });
}

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

$(window).on('load', function () {

});
$(window).on('resize orientationchange', function () {

});

$(document).ready(function () {

    


});