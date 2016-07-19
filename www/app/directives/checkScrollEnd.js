
(function () {
    'use strict';

    angular.module('igospa.directives').directive('checkScrollEnd', checkScrollEnd);

    function checkScrollEnd(){
        return {
            restrict: 'A',
            scope: {
                getMoreItems: '&'
            },
            link: function (scope, element, attrs) {

                element.bind('scroll', function(){
                    if($(this).scrollTop() + $(this).innerHeight()>=$(this)[0].scrollHeight)
                    {
                        scope.getMoreItems({page: attrs.page});
                    }
                });
            }
        }
    }
})();
