(function() {
  if (!this.require) {
    var modules = {}, cache = {};

    var require = function(name, root) {
      var path = expand(root, name), indexPath = expand(path, './index'), module, fn;
      module   = cache[path] || cache[indexPath];
      if (module) {
        return module;
      } else if (fn = modules[path] || modules[path = indexPath]) {
        module = {id: path, exports: {}};
        cache[path] = module.exports;
        fn(module.exports, function(name) {
          return require(name, dirname(path));
        }, module);
        return cache[path] = module.exports;
      } else {
        throw 'module ' + name + ' not found';
      }
    };

    var expand = function(root, name) {
      var results = [], parts, part;
      // If path is relative
      if (/^\.\.?(\/|$)/.test(name)) {
        parts = [root, name].join('/').split('/');
      } else {
        parts = name.split('/');
      }
      for (var i = 0, length = parts.length; i < length; i++) {
        part = parts[i];
        if (part == '..') {
          results.pop();
        } else if (part != '.' && part != '') {
          results.push(part);
        }
      }
      return results.join('/');
    };

    var dirname = function(path) {
      return path.split('/').slice(0, -1).join('/');
    };

    this.require = function(name) {
      return require(name, '');
    };

    this.require.define = function(bundle) {
      for (var key in bundle) {
        modules[key] = bundle[key];
      }
    };

    this.require.modules = modules;
    this.require.cache   = cache;
  }

  return this.require;
}).call(this);
this.require.define({"app/controllers/inspector":function(exports, require, module){(function() {
  var Background, Border, BorderRadius, BoxShadow, Dimensions, Inspector, Opacity, TextShadow, Utils,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  Background = require('./inspector/background');

  Border = require('./inspector/border');

  BorderRadius = require('./inspector/border_radius');

  Opacity = require('./inspector/opacity');

  BoxShadow = require('./inspector/box_shadow');

  TextShadow = require('./inspector/text_shadow');

  Dimensions = require('./inspector/dimensions');

  Utils = require('lib/utils');

  Inspector = (function(_super) {

    __extends(Inspector, _super);

    Inspector.name = 'Inspector';

    Inspector.prototype.className = 'inspector';

    function Inspector() {
      this.render = __bind(this.render, this);

      this.paint = __bind(this.paint, this);
      Inspector.__super__.constructor.apply(this, arguments);
      this.append(this.dimensions = new Dimensions({
        stage: this.stage
      }));
      this.append(this.background = new Background({
        stage: this.stage
      }));
      this.append(this.border = new Border({
        stage: this.stage
      }));
      this.append(this.borderRadius = new BorderRadius({
        stage: this.stage
      }));
      this.append(this.boxShadow = new BoxShadow({
        stage: this.stage
      }));
      this.append(this.opacity = new Opacity({
        stage: this.stage
      }));
      this.stage.selection.bind('change', this.paint);
      this.render();
    }

    Inspector.prototype.paint = function() {
      if (this.rendering) {
        return;
      }
      this.rendering = true;
      return Utils.requestAnimationFrame(this.render);
    };

    Inspector.prototype.render = function() {
      this.el.hide();
      this.dimensions.render();
      this.background.render();
      this.border.render();
      this.borderRadius.render();
      this.boxShadow.render();
      this.opacity.render();
      this.el.show();
      this.rendering = false;
      return this;
    };

    Inspector.prototype.release = function() {
      this.stage.selection.unbind('change', this.render);
      return Inspector.__super__.release.apply(this, arguments);
    };

    return Inspector;

  })(Spine.Controller);

  module.exports = Inspector;

}).call(this);
;}});
