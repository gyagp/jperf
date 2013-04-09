/*jshint node: true */
/*global module */
module.exports = function( grunt ) {
  'use strict';

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    banner: {
      compact: '/*! <%= pkg.name %> <%= pkg.version %> (Custom Build) | <%= pkg.license %> */',
      full: '/*!\n' +
        ' * <%= pkg.name %> v<%= pkg.version %>\n' +
        ' * jperf.com\n *\n' +
        ' * Copyright (c) <%= _.pluck(pkg.contributors, "name").join(", ") %>\n' +
        ' * <%= pkg.license %> License\n */' +
        ' \n' +
        '/*\n' +
        ' * jPerf is a JavaScript library that helps you measure performance.\n' +
        ' */'
    },
    meta: {
    },
    qunit: {
      files: ['test/index.html']
    },    
    clean: {
      build: ['build', 'dist'],
      postbuild: ['build']
    },
    copy: {
      build: {
        files: {
          'dist/jperf.js': 'build/jperf.js'
        }
      }
    },
    jshint: {
      options: {
        boss: true,
        browser: true,
        curly: false,
        devel: true,
        eqeqeq: false,
        eqnull: true,
        expr: true,
        evil: true,
        immed: false,
        laxcomma: true,
        newcap: false,
        noarg: true,
        smarttabs: true,
        sub: true,
        undef: true,
        globals: {
          define: true,
          require: true
        }
      },
      files: [
        'Gruntfile.js',
        'js/*.js'
      ],
      tests: {
        options: {
          jquery: true,
          globals: {
            TEST: true,
            QUnit: true
          }
        },
        files: {
          src: ['test/*.js']
        }
      }      
    },    
    requirejs: {
      compile: {
        options: {
          baseUrl: 'js',
          optimize: "none",
          optimizeCss: "none",
          name: 'main',
          out: 'build/jperf.js',
          fileExclusionRegExp: /^(.git|node_modules|test)$/,
          wrap: {
            start: '<%= banner.full %>' + '\n(function(window, document, undefined){',
            end: '})(this, document);'
          },
          onBuildWrite: function (id, path, contents) {
            if ((/define\(.*?\{/).test(contents)) {
              //Remove AMD ceremony for use without require.js or almond.js
              contents = contents.replace(/define\(.*?\{/, '');
              contents = contents.replace(/\}\);\s*?$/,'');
              contents = contents.replace(/return.*[^return]*$/,'');
            }
            else if ((/require\([^\{]*?\{/).test(contents)) {
              contents = contents.replace(/require[^\{]+\{/, '');
              contents = contents.replace(/\}\);\s*$/,'');
            }

            return contents;
          }
        }
      }
    }
  });
  
  // Load required contrib packages
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-requirejs');

  
  grunt.registerTask('test', ['qunit']);
  grunt.registerTask('build', ['clean:build', 'requirejs', 'copy', 'clean:postbuild', 'jshint', 'test']);
  grunt.registerTask('default', 'build');
};
