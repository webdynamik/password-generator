'use strict';

module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'), // the package file to use
      shell: {
          phantom: {
              command: 'phantomjs tests/phantom/loadspeed.js http://localhost:80/passwort-generator/tests/index.html',
              options: {
                  stdout: true
              }
          }
      },
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
//          urls: {
//              options: {
//                  urls: [
//                      'http://localhost:80/passwort-generator/tests/index.html',
//                  ]
//              }
//          }
      },
      yslow: {
          options: {
              thresholds: {
                  weight: 180,
                  speed: 1000,
                  score: 80,
                  requests: 15
              }
          },
          pages: {
              files: [
                  {
                      src: 'http://localhost:80/passwort-generator/tests/index.html',
                      thresholds: {
                          weight: 280
                      }
                  },
                  {
                      src: 'http://localhost:80/passwort-generator/index.html'
                  }
              ]
          }
      },
      taskName: {}
  });

    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-yslow');

    grunt.registerTask('all', ['jshint','qunit', 'shell', 'yslow']);

    // By default, lint and run all tests.
    grunt.registerTask('default', ['all']);
};