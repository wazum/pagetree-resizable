define([
    'jquery',
    'jquery-ui/resizable'
], function ($) {
    'use strict';
    return {
        run: function(Storage) {
            $('.scaffold-content-navigation').resizable({
                handles: 'e, w',
                minWidth: 200,
                create: function () {
                    var contentNavigation = $('.scaffold-content-navigation');
                    contentNavigation.find('.ui-resizable-e').dblclick(function (e) {
                        if ($('#typo3-pagetree .x-panel-body ul').length || $('#typo3-pagetree svg g.nodes-wrapper').length) {
                            var realWidth = $('#typo3-pagetree .x-panel-body ul').length ? $('#typo3-pagetree .x-panel-body ul').prop('scrollWidth') : $('#typo3-pagetree svg g.nodes-wrapper')[0].getBBox().width;
                            if (contentNavigation.width() < realWidth) {
                                var difference = (realWidth - contentNavigation.width()) + 10;
                                var pageX = $(this).offset().left;
                                var pageY = $(this).offset().top;
                                $(this).trigger('mouseover')
                                    .trigger({type: 'mousedown', which: 1, pageX: pageX, pageY: pageY})
                                    .trigger({type: 'mousemove', which: 1, pageX: pageX + difference, pageY: pageY})
                                    .trigger({type: 'mouseup', which: 1, pageX: pageX + difference, pageY: pageY});
                            }
                        }
                    });
                },
                resize: function (event, ui) {
                    // we can't directly modify the CSS of the element, because the
                    // toggle for the whole page tree would not work anymore,
                    // so we need to inject new styles dynamically
                    if ($('#pagetree-resize-styles').length === 0) {
                        $('<div id="pagetree-resize-styles"/>').appendTo('body');
                    }
                    $('#pagetree-resize-styles').html('<style>.scaffold-content-navigation-expanded .scaffold-content-navigation{width:' + ui.size.width + 'px} .scaffold-content-navigation-expanded .scaffold-content-module{left:' + ui.size.width + 'px}</style>');
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
                stop: function (event, ui) {
                    var contentArea = $('.scaffold-content-navigation-expanded').find('.scaffold-content-module');
                    contentArea.find('#resize-overlay').remove();
                    Storage.set('Backend.PagetreeResizable.width', ui.size.width);
                }
            });
        }
    };
});
