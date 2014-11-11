// passwort-generator.js 1.0.0
// http://passwort-generieren.de
// (c) 2014 Jan Krause
(function(name, context, definition) {
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = definition();
    } else if (typeof define === 'function' && define.amd) {
        define(definition);
    } else {
        context[name] = definition();
    }
})('PasswortGenerator', this, function() {
    'use strict';

    var PasswortGenerator = function(options) {
            if(options){
                // other configs
                this.options = options;
            }
        };

    PasswortGenerator.prototype = {
        version: '1.0.0',
        options: {},
        default_options: {
            length: 8,
            lowercase: true,
            uppercase: true,
            numbers: true,
            special_character: false,
            brackets: false,
            minus: false,
            underscore: false,
            space: false
        },
        _passwort: '',

        merge_options: function(obj1,obj2){
            var obj3 = {};
            for (var attrname in obj1) { obj3[attrname] = obj1[attrname]; }
            for (var attrname in obj2) { obj3[attrname] = obj2[attrname]; }
            return obj3;
        },

        generate: function() {
            this.options = this.merge_options(this.options, this.default_options);

            var _i, _len, _passwort;

            if(this.options.lowercase){
                _passwort += 'abcdefghijklmnopqrstuvwxyz';
            }

            if(this.options.uppercase){
                _passwort += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            }

            if(this.options.numbers){
                _passwort += '0123456789';
            }

            if(this.options.special_character){
                _passwort += ',.;:#+~*=&%$§!|/';
            }

            if(this.options.brackets){
                _passwort += '<>[](){}';
            }

            if(this.options.minus){
                _passwort += '-';
            }

            if(this.options.underscore){
                _passwort += '_';
            }

            if(this.options.space){
                _passwort += ' ';
            }

            for (_i = 0, _len = this.options.length; _i < _len; _i++) {
                this._passwort += _passwort.charAt(Math.floor(Math.random() * _passwort.length));
            }
        },

        set: function(param) {
            this.options = this.merge_options(this.options,param);
        },

        get: function() {
            this.generate();
            return this._passwort;
        },

        render: function() {
            this.options.el.innerHTML = this.get();
        }
    };

    return PasswortGenerator;
});