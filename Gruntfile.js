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

      taskName: {}
  });

    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    grunt.registerTask('all', ['jshint','qunit', 'shell']);

    // By default, lint and run all tests.
    grunt.registerTask('default', ['all']);
};