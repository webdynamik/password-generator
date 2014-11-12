// passwort-generator.js 1.1.0
// http://passwort-generieren.de
// (c) 2014 Jan Krause
(function() {
    "use strict";

    var root = this;

    var PasswortGenerator = function(options) {
        if(!options){
            options = {};
            options.el = this._document.body;
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
    PasswortGenerator.VERSION = '1.1.0';

    //base
    PasswortGenerator._document = document;

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
            var _i, _len, _passwort = '';

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
                _passwort += ',.;:#+~*=&%$§!|/€@""^°`´\'\\';
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

            this._passwort = '';
            for (_i = 0, _len = this.options.length; _i < _len; _i++) {
                this._passwort += _passwort.charAt(Math.floor(Math.random() * _passwort.length));
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