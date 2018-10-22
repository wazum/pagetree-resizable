define([
    'jquery',
    'jquery-ui/resizable'
], function ($) {
    'use strict';

    $('.scaffold-content-navigation').resizable({
        handles: 'e, w',
        minWidth: 200,
        resize: function (event, ui) {
            // we can't directly modify the CSS of the element, because the
            // toggle for the whole page tree would not work anymore,
            // so we need to inject new styles dynamically
            if ($('#pagetree-resize-styles').length === 0) {
                $('<div id="pagetree-resize-styles"/>').appendTo('body');
            }
            $('#pagetree-resize-styles').html('<style>.scaffold-content-navigation-expanded .scaffold-content-module{left:' + ui.size.width + 'px;}</style>');
        },
        // fix iframe problem
        start: function () {
            var contentArea = $('.scaffold-content-navigation-expanded').find('.scaffold-content-module');
            var ifr = contentArea.find('iframe');
            var d = $('<div></div>');

            contentArea.append(d[0]);
            d[0].id = 'resize-overlay';
            d.css({position: 'absolute'});
            d.css({top: ifr.position().top, left: 0});
            d.height(ifr.height());
            d.width('100%');
        },
        stop: function () {
            var contentArea = $('.scaffold-content-navigation-expanded').find('.scaffold-content-module');
            contentArea.find('#resize-overlay').remove();
        }
    });

});

