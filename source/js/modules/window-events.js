;
/**
 *  window-events.js
 *
 *  requires: 
 *    jQuery
 *    Underscore
 *    util.js
 *
 *  description:
 *    This module allows aggregation of window events like
 *    resize and scroll in a central, throttleable location.
 *
 *    Messages are broadcasted from here which can be
 *    subscribed to from any location.
 *
 *    For ex., 
 *      Broadcast: $('body').trigger('APP.windowEvents.displayChange');
 *      Subscribe: $('body').on('APP.windowEvents.displayChange');
 *
 */

var APP = (function (module, $) {

  'use strict';

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  module.windowEvents = (function () {

    var _name = 'windowEvents',
        debug_enable = true,
        debug = debug_enable ? module.util.debug : function () {},
        globalWindowEvents = null;

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    function WindowEvents() {

      this.defaults = {
        detectSelector: '.mq-helper'
      };
      this.config = $.extend({}, this.defaults);
      this.cssLoadInt = null;
      this.currentWidth = null;
      this.cssIsLoaded = false;
      this.pollInterval = 10;
      this.maxWait = 180000;
      this.waited = 0;
      this.firstRequestMade = false;
      this.keyCapture = [
        37, // left arrow
        39  // right arrow
      ];

      this.bindEvents();

      this.init();

    }

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    WindowEvents.prototype.init = function () {

      var self = this;

      // Monitor CSS load state
      this.cssLoadInt = setInterval(function () {
        self.pollCSS(self);
      }, self.pollInterval);

      this.getSetWidth();

    };

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    WindowEvents.prototype.pollCSS = function (self) {

      var self = this;

      if ($(self.config.detectSelector).css('display') === 'block') {

        // debug(_name + ': CSS Loaded');
        clearInterval(self.cssLoadInt);
        $('body').trigger('APP.windowEvents.cssLoaded', {
          width: self.getSetWidth()
        });
        $('body').attr('data-cssloaded', 'true');
        self.cssIsLoaded = true;
        debug(_name + ': CSS loaded');

      } else if (self.waited >= self.maxWait) {

        clearInterval(self.cssLoadInt);
        throw new Error("Error: CSS not loaded");

      }

      self.waited += self.pollInterval;

    };

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    /**
     *  Sync these breakpoints with variables.scss
     *
     *  $screen-xs: 480px
     *  $screen-sm: 768px
     *  $screen-md: 992px
     *  $screen-lg: 1200px
     *  $screen-xl: 1800px
     *
     *  Note that syncing via media query is more reliable
     *  than measuring window.innerWidth because of
     *  scrollbar implementation variations.
     */

    WindowEvents.prototype.getSetWidth = function () {

      var selector = this.config.detectSelector,
          displayWidth = parseInt($(selector).css('width'), 10),
          displaySize = 'xl';

      if (displayWidth >= 1400) {
        displaySize = 'xl';
      } else if (displayWidth >= 1200) {
        displaySize = 'lg';
      } else if (displayWidth >= 992) {
        displaySize = 'md';
      } else if (displayWidth >= 768) {
        displaySize = 'sm';
      } else {
        displaySize = 'xs';
      }

      $('body').attr('data-display-size', displaySize);

      return displaySize;

    };

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    WindowEvents.prototype.bindEvents = function () {

      var self = this;

      $(window)
        .resize(_.throttle(function () {
          self.triggerChange();
        }, 10))
        .resize(_.debounce(function () {
          // Trigger once more in case of performance lag
          self.debouncedChangeTrigger();
        }, 200));

      $('body').on('APP.windowEvents.windowCheck', function () {
        self.detectChange();
      });

      $(window)
        .scroll(_.throttle(function () {
          $('body').trigger('APP.windowEvents.windowScroll');
        }, 10));

      $(window)
        .on('keyup', function (e) {
          var keyCode = e.which;
          if ($.inArray(keyCode, self.keyCapture) >= 0) {
            e.preventDefault();
            $('body').trigger('APP.windowEvents.keyUp', {
              keyCode: keyCode
            });
          }
        }
      );

    };

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    WindowEvents.prototype.detectChange = function () {

      var thisWidth = this.getSetWidth();
      // debug('this.firstRequestMade: ' + this.firstRequestMade);

      if (this.firstRequestMade === false) {

        // debug('this.firstRequestMade');
        this.currentWidth = thisWidth;

        $('body')
          .trigger('APP.windowEvents.displayChange', {
            width: thisWidth
          });

        this.firstRequestMade = true;

      } else if (this.currentWidth === thisWidth) {

      } else {

        this.currentWidth = thisWidth;

        $('body')
          .trigger('APP.windowEvents.displayChange', {
            width: thisWidth
          });

      }

    };

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    WindowEvents.prototype.debouncedChangeTrigger = function () {

      var thisWidth = this.getSetWidth();

      $('body')
        .trigger('APP.windowEvents.displayChange', {
          width: thisWidth
        });

      $('body')
        .trigger('APP.windowEvents.debouncedResize', {
          width: thisWidth
        });

    };

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    if (debug_enable) debug('APP.' + _name + ' :: loaded');

    return {
      WindowEvents: WindowEvents
    };

  }) ();

  return module;

}) (APP || {}, jQuery);
