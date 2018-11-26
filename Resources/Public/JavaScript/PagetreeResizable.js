define([
  'jquery',
  'jquery-ui/resizable'
], function ($) {
  'use strict';
  return {
    run: function (Storage) {
      function iframeOverlay(area) {
        var ifr = area.find('iframe');
        if (ifr) {
          var d = $('<div class="resize-iframe-overlay"></div>');

          area.append(d[0]);
          d.css({position: 'absolute'});
          d.css({top: ifr.position().top, left: 0});
          d.height(ifr.height());
          d.width('100%');
        }
      }

      var container = null;
      var styles = null;
      var contentWidth = null;
      var isPageModule = false;
      // Web > page
      if ($('.scaffold-content-navigation').length) {
        container = $('.scaffold-content-navigation');
        styles = function (width) {
          return '<style>.scaffold-content-navigation-expanded .scaffold-content-navigation{width:' + width + 'px} .scaffold-content-navigation-expanded .scaffold-content-module{left:' + width + 'px}</style>';
        };
        contentWidth = function () {
          if ($('#typo3-pagetree .x-panel-body ul').length || $('#typo3-pagetree svg g.nodes-wrapper').length) {
            return $('#typo3-pagetree .x-panel-body ul').length ? $('#typo3-pagetree .x-panel-body ul').prop('scrollWidth') : $('#typo3-pagetree svg g.nodes-wrapper')[0].getBBox().width;
          }
          return false;
        };
        isPageModule = true;
      }
      // Link browser
      else if ($('.element-browser .element-browser-main .element-browser-main-sidebar').length) {
        container = $('.element-browser .element-browser-main .element-browser-main-sidebar');
        styles = function (width) {
          return '<style>.element-browser .element-browser-main .element-browser-main-sidebar{width:' + width + 'px}</style>';
        };
        contentWidth = function () {
          if ($('.element-browser-main-sidebar .element-browser-body ul.list-tree-root').length) {
            return $('.element-browser-main-sidebar .element-browser-body ul.list-tree-root').prop('scrollWidth') + 10;
          }
          return false;
        };
      }
      if (container) {
        container.resizable({
          handles: 'e, w',
          minWidth: 200,
          create: function () {
            container.find('.ui-resizable-e').dblclick(function (e) {
              var width = contentWidth();
              if (width !== false) {
                if (container.width() < width) {
                  var difference = (width - container.width()) + 10;
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
            var stylesContainer = $('#pagetree-resize-styles');
            if (stylesContainer.length === 0) {
              $('<div id="pagetree-resize-styles"/>').appendTo('body');
            }
            stylesContainer.html(styles(ui.size.width));
          },
          // fix iframe problem
          start: function () {
            if (isPageModule) {
              var parent = $('.scaffold-content-navigation-expanded');
              var contentArea = parent.find('.scaffold-content-module');
              iframeOverlay(contentArea);
              var navigationArea = parent.find('.scaffold-content-navigation');
              iframeOverlay(navigationArea);
            }
          },
          stop: function (event, ui) {
            if (isPageModule) {
              $('.resize-iframe-overlay').remove();
              Storage.set('Backend.PagetreeResizable.width', ui.size.width);
            }
            else {
              Storage.set('Backend.PagetreeResizable.Browser.width', ui.size.width);
            }
          }
        });
      }
    }
  };
});
