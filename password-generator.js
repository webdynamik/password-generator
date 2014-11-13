// passwort-generator.js 1.1.2
// http://passwort-generieren.de
// (c) 2014 Jan Krause
(function() {
    "use strict";

    var root = this;

    var PasswortGenerator = function(options) {
        if(!options){
            options = {};
            options.el = document.body;
        }

        this.options = this.extend(options, this.default_options);
    };

    // Export the object for **Node.js**
    if (typeof exports !== 'undefined') {
        if (typeof module !== 'undefined' && module.exports) {
            exports = module.exports = PasswortGenerator;
        }
        exports.PasswortGenerator = PasswortGenerator;
    } else {
        root.PasswortGenerator = PasswortGenerator;
    }

    // Current version.
    PasswortGenerator.VERSION = '1.1.2';

    PasswortGenerator.prototype = {
        options: {},
        default_options: {
            length: 11,
            lowercase: true,
            uppercase: true,
            numbers: true,
            special_character: true,
            brackets: true,
            minus: true,
            underscore: true,
            space: true
        },
        _passwort: '',

        extend: function(options,defaults){
            var extended = {};
            var prop;
            for (prop in defaults) {
                if (Object.prototype.hasOwnProperty.call(defaults, prop)) {
                    extended[prop] = defaults[prop];
                }
            }
            for (prop in options) {
                if (Object.prototype.hasOwnProperty.call(options, prop)) {
                    extended[prop] = options[prop];
                }
            }
            return extended;
        },

        generate: function() {
            var _i, _len, _passwortString = '';

            if(this.options.lowercase){
                _passwortString += 'abcdefghijklmnopqrstuvwxyz';
            }

            if(this.options.uppercase){
                _passwortString += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            }

            if(this.options.numbers){
                _passwortString += '0123456789';
            }

            if(this.options.special_character){
                _passwortString += ',.;:#+~*=&%$§!|/€@""^°`´\'\\';
            }

            if(this.options.brackets){
                _passwortString += '<>[](){}';
            }

            if(this.options.minus){
                _passwortString += '-';
            }

            if(this.options.underscore){
                _passwortString += '_';
            }

            if(this.options.space){
                _passwortString += ' ';
            }

            this._passwort = '';
            for (_i = 0, _len = this.options.length; _i < _len; _i++) {
                this._passwort += _passwortString.charAt(Math.floor(Math.random() * _passwortString.length));
            }
        },

        set: function(param) {
            this.options = this.extend(param,this.options);
        },

        get: function() {
            this.generate();
            return this._passwort;
        },

        render: function() {
            this.options.el.innerHTML = this.get();
        }
    };

}.call(this));