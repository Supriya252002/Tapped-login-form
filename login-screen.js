/**
 * cbpFWTabs.js v1.0.0
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * https://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2014, Codrops
 * http://www.codrops.com
 */
;
(function(window) {

  'use strict';

  function extend(a, b) {
    for (var key in b) {
      if (b.hasOwnProperty(key)) {
        a[key] = b[key];
      }
    }
    return a;
  }

  function CBPFWTabs(el, options) {
    this.el = el;
    this.options = extend({}, this.options);
    extend(this.options, options);
    this._init();
  }

  CBPFWTabs.prototype.options = {
    start: 0
  };

  CBPFWTabs.prototype._init = function() {

    this.tabs = [].slice.call(this.el.querySelectorAll('nav > ul > li'));

    this.items = [].slice.call(this.el.querySelectorAll('.content-wrap > section'));
   
    this.current = -1;
   
    this._show();

    this._initEvents();
  };

  CBPFWTabs.prototype._initEvents = function() {
    var self = this;
    this.tabs.forEach(function(tab, idx) {
      tab.addEventListener('click', function(ev) {
        ev.preventDefault();
        self._show(idx);
      });
    });

  
    var passwordToggle = this.el.querySelector('.toggle-password');
    if (passwordToggle) {
      passwordToggle.addEventListener('click', function(ev) {
        ev.preventDefault();
        var passwordField = self.items[self.current].querySelector('input[type="password"], input[type="text"]');
        if (passwordField.type === 'password') {
          passwordField.type = 'text';
          passwordToggle.querySelector('i').classList.remove('bi-eye-slash-fill');
          passwordToggle.querySelector('i').classList.add('bi-eye-fill');
        } else {
          passwordField.type = 'password';
          passwordToggle.querySelector('i').classList.remove('bi-eye-fill');
          passwordToggle.querySelector('i').classList.add('bi-eye-slash-fill');
        }
      });
    }
  };

  CBPFWTabs.prototype._show = function(idx) {
    if (this.current >= 0) {
      this.tabs[this.current].className = this.items[this.current].className = '';
    }
    
    this.current = idx != undefined ? idx : this.options.start >= 0 && this.options.start < this.items.length ? this.options.start : 0;
    this.tabs[this.current].className = 'tab-current';
    this.items[this.current].className = 'content-current';
  };


  window.CBPFWTabs = CBPFWTabs;

})(window);


////////////////////////////
////////////////////////////
// CALL IT
////////////////////////////
////////////////////////////
(function() {

  [].slice.call(document.querySelectorAll('.tabs')).forEach(function(el) {
    new CBPFWTabs(el);
  });

})();
