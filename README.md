Password Generator
==================
Standalone JavaScript Tool without any external dependency.

Configurable:

* length
* with or without
    * lowercase characters
    * uppercase characters
    * numbers
    * special characters
    * brackets
    * minus character
    * underscore character
    * space character


Online Demo: http://www.passwort-generieren.de/ (soon)


### How To Use

### Initialisation Example

#### Basic

```javascript
    var passwort  = new PasswortGenerator();
    console.log( passwort.get() );
```

#### Advanced

```javascript

var _options  = _options || window._options || {};

    _options.el = document.querySelector('.pw');
            _options.length = 8;
            _options.lowercase = true;
            _options.uppercase = true;
            _options.numbers = true;
            _options.special_character = true;
            _options.brackets = true;
            _options.minus = true;
            _options.underscore = true;
            _options.space = true;

    var password  = new PasswortGenerator(_options);

```

### Get Example

```javascript
    console.log( passwort.get() );
```

### Set Example

```javascript
    function onChange(e) {
        var obj = {};

        if(e.name == 'length') {
            obj[e.name] = parseInt(e.value);
        } else {
            obj[e.name] = e.checked ? true : false;
        }

        passwort.set(obj);
        passwort.render();
    }
```

## Minify

```
uglifyjs -o password-generator.min.js password-generator.js -p 5 -c -m
```


