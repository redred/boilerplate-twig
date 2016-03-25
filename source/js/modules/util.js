;
/**
 *  util.js
 *
 *
 */

var APP = (function (module) {

  'use strict';

  module.util = (function () {

    var _name = 'util',
        debug_enable = true; /* Global flag; overrides module flags */

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    function debug(obj) {
      if (debug_enable === false) {
        return;
      }
      if ((typeof window.console !== 'undefined' && window.console !== null) && typeof window.console === 'object' && window.console.log) {
        window.console.log(obj);
      }
    }

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    if (debug_enable) debug('APP.' + _name + ' :: loaded');

    return {
      debug: debug
    };

  }) ();

  return module;

}) (APP || {});
