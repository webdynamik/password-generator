var pw = false;

    pw = new PasswordGenerator({
                                    length: 5,
                                    lowercase: true,
                                    uppercase: true,
                                    numbers: true,
                                    special_character: false,
                                    brackets: false,
                                    minus: false,
                                    underscore: false,
                                    space: false
                                });
    pw2 = new PasswordGenerator();

QUnit.module( "Password-Generator Basics" );
QUnit.test( "Test initialisation with options", function( assert ) {
    assert.ok( window.PasswordGenerator , "PasswordGenerator object exist" );
    assert.ok( pw instanceof PasswordGenerator, "Creating a instance worked" );
});

QUnit.test( "Test initialisation without options", function( assert ) {
    assert.ok( window.PasswordGenerator , "PasswordGenerator object exist" );
    assert.ok( pw instanceof PasswordGenerator, "Creating a instance worked" );
});

QUnit.module( "Get And Set" );
QUnit.test( "Test get function", function( assert ) {
    var a = pw.get(),
        b = pw.get();
    assert.ok(a.length == 5 && b.length == 5, "Get returns with right length" );
    assert.ok( a != b , "Password are refreshed" );
});

QUnit.test( "Test set function", function( assert ) {
    pw.set({
        length: 1,
        lowercase: true,
        uppercase: false,
        numbers: false,
        special_character: false,
        brackets: false,
        minus: false,
        underscore: false,
        space: false
    });

    var a = pw.get();
    assert.ok(a === a.toLowerCase() , "Result is lowercase" );
    assert.ok(a.length == 1 , "Result length is one" );
});


QUnit.module( "Works 1000 times" );

QUnit.test( "Test for Lowercase", function( assert ) {
    pw.set({
        length: 50,
        lowercase: true,
        uppercase: false,
        numbers: false,
        special_character: false,
        brackets: false,
        minus: false,
        underscore: false,
        space: false
    });

    for (i = 1; i <= 1000; i++) {
        var a = pw.get();
        assert.ok(a === a.toLowerCase() , "Result is lowercase" );
        assert.ok(a.length == 50 , i + ". Result length is 50" );
    }
});

QUnit.test( "Test for Uppercase", function( assert ) {
    pw.set({
        length: 50,
        lowercase: false,
        uppercase: true,
        numbers: false,
        special_character: false,
        brackets: false,
        minus: false,
        underscore: false,
        space: false
    });

    for (i = 1; i <= 1000; i++) {
        var a = pw.get();
        assert.ok(a === a.toUpperCase() , "Result is uppercase" );
        assert.ok(a.length == 50 , i + ". Result length is 50" );
    }
});

QUnit.test( "Test for Numbers", function( assert ) {
    pw.set({
        length: 50,
        lowercase: false,
        uppercase: false,
        numbers: true,
        special_character: false,
        brackets: false,
        minus: false,
        underscore: false,
        space: false
    });

    for (i = 1; i <= 1000; i++) {
        var a = pw.get();
        assert.ok( !isNaN(parseFloat(a)) && isFinite(a) , "Result is number" );
        assert.ok(a.length == 50 , i + ". Result length is 50" );
    }
});

QUnit.test( "Test for special characters", function( assert ) {
    pw.set({
        length: 50,
        lowercase: false,
        uppercase: false,
        numbers: false,
        special_character: true,
        brackets: false,
        minus: false,
        underscore: false,
        space: false
    });


    for (i = 1; i <= 1000; i++) {
        var a = pw.get();
        assert.ok( !/,.;:#+~*=&%$§!|\/€@"^°`´\'\\/g.test(a) , "Result matches expectations" );
        assert.ok(a.length == 50 , i + ". Result length is 50" );
    }
});

QUnit.test( "Test for brackets", function( assert ) {
    pw.set({
        length: 50,
        lowercase: false,
        uppercase: false,
        numbers: false,
        special_character: false,
        brackets: true,
        minus: false,
        underscore: false,
        space: false
    });


    for (i = 1; i <= 1000; i++) {
        var a = pw.get();
        assert.ok( !/<>[](){}/g.test(a) , "Result matches expectations" );
        assert.ok(a.length == 50 , i + ". Result length is 50" );
    }
});

QUnit.test( "Test for minus", function( assert ) {
    pw.set({
        length: 50,
        lowercase: false,
        uppercase: false,
        numbers: false,
        special_character: false,
        brackets: false,
        minus: true,
        underscore: false,
        space: false
    });


    for (i = 1; i <= 1000; i++) {
        var a = pw.get();
        assert.ok( /\-/g.test(a) , "Result matches expectations" );
        assert.ok(a.length == 50 , i + ". Result length is 50" );
    }
});

QUnit.test( "Test for underscore", function( assert ) {
    pw.set({
        length: 50,
        lowercase: false,
        uppercase: false,
        numbers: false,
        special_character: false,
        brackets: false,
        minus: false,
        underscore: true,
        space: false
    });


    for (i = 1; i <= 1000; i++) {
        var a = pw.get();
        assert.ok( /_/g.test(a) , "Result matches expectations" );
        assert.ok(a.length == 50 , i + ". Result length is 50" );
    }
});

QUnit.test( "Test for space", function( assert ) {
    pw.set({
        length: 50,
        lowercase: false,
        uppercase: false,
        numbers: false,
        special_character: false,
        brackets: false,
        minus: false,
        underscore: false,
        space: true
    });


    for (i = 1; i <= 1000; i++) {
        var a = pw.get();
        assert.ok( /\s/gi.test(a) , "Result matches expectations" );
        assert.ok(a.length == 50 , i + ". Result length is 50" );
    }
});