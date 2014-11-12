passwort-generator
==================


{
        length: 50,
        lowercase: false,
        uppercase: false,
        numbers: false,
        special_character: true,
        brackets: false,
        minus: false,
        underscore: false,
        space: false
}


Minify
uglifyjs -o passwort-generator.min.js passwort-generator.js -p 5 -c -m