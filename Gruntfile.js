'use strict';

module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'), // the package file to use

      jshint: {
          all: [
              'password-generator.js',
              'Gruntfile.js',
              'tasks/**/*.js',
          ],
          options: {
              jshintrc: '.jshintrc'
          }
      },

      // Unit tests.
      qunit: {
          all_tests: ['tests/*.html'],
          urls: {
              options: {
                  urls: [
                      'http://localhost:80/passwort-generator/tests/index.html',
                  ]
              }
          }
      },

      phantom_test: {
          basic: {
              options: {
                  url: 'http://localhost:80/passwort-generator/index.html',
                  expected: [1, 2, 3, 4, 5, 6],
                  test: function test(a, b, c) {
                      if (!test.actual) { test.actual = []; }
                      test.actual.push(a, b, c);
                  }
              }
          }
      },

      taskName: {}
  });

    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-jshint');


    // The most basic of tests. Not even remotely comprehensive.
    grunt.registerMultiTask('phantom_test', 'A test, of sorts.', function() {
        var options = this.options();
        var phantomjs = require('./lib/phantomjs').init(grunt);
// Load up and Instantiate the test server
        if (options.server) { require(options.server); }
// Do something.
        phantomjs.on('test', options.test);
        phantomjs.on('done', phantomjs.halt);
        phantomjs.on('debug', function(msg) {
            grunt.log.writeln('debug:' + msg);
        });
// Built-in error handlers.
        phantomjs.on('fail.load', function(url) {
            phantomjs.halt();
            grunt.verbose.write('Running PhantomJS...').or.write('...');
            grunt.log.error();
            grunt.warn('PhantomJS unable to load "' + url + '" URI.');
        });
        phantomjs.on('fail.timeout', function() {
            phantomjs.halt();
            grunt.log.writeln();
            grunt.warn('PhantomJS timed out.');
        });
// This task is async.
        var done = this.async();
// Spawn phantomjs
        phantomjs.spawn(options.url, {
// Additional PhantomJS options.
            options: options.phantomJSOptions,
// Complete the task when done.
            done: function(err) {
                if (err) { done(err); return; }
                var assert = require('assert');
                var difflet = require('difflet')({indent: 2, comment: true});
                try {
                    assert.deepEqual(options.test.actual, options.expected, 'Actual should match expected.');
                    grunt.log.writeln('Test passed.');
                    done();
                } catch (err) {
                    grunt.log.subhead('Assertion Failure');
                    console.log(difflet.compare(err.expected, err.actual));
                    done(err);
                }
            }
        });
    });


    grunt.registerTask('test', ['jshint','qunit']);

    // By default, lint and run all tests.
    grunt.registerTask('default', ['test']);
};