module.exports = function(grunt) {

  // Configure tasks
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    paths: {
      bootstrap_sass: 'bower_modules/bootstrap-sass/assets/stylesheets/',
      bootstrap_js: 'bower_modules/bootstrap-sass/assets/javascripts/bootstrap.min.js',
      bootstrap_fonts: 'bower_modules/bootstrap-sass/assets/fonts/',
      modular_scale: 'bower_modules/modular-scale/stylesheets/',
      underscore_js: 'node_modules/underscore/underscore-min.js',
      html_templ_base: 'webroot/templates/',
      cachebreak_include: 'base.html'
    },
    sass: {
      dev: {
        options: {
          style: 'expanded',
          sourcemap: 'none',
          lineNumbers: true,
          precision: 8,
          loadPath: ['<%= paths.bootstrap_sass %>']
        },
        files: [
          {'webroot/css/site.css': 'source/scss/site.scss'},
          {'webroot/css/print.css': 'source/scss/print.scss'}
        ]
      }
    },
    cssmin: {
      minify: {
        expand: true,
        cwd: 'webroot/css/',
        src: ['*.css', '!*.min.css'],
        dest: 'webroot/css/',
        ext: '.min.css'
      }
    },
    concat: {
      options: {
        separator: ';',
      },
      scripts: {
        src: [
          // Libraries
          'bower_modules/jquery/jquery.min.js',
          'bower_modules/jquery.easing/js/jquery.easing.min.js',
          'node_modules/jquery-touchswipe/jquery.touchSwipe.min.js',
          'node_modules/moment/min/moment.min.js',
          // '<%= paths.bootstrap_js %>',
          '<%= paths.underscore_js %>',
          // Custom modules - Load order is sensitive
          'source/js/modules/util.js',
          'source/js/modules/window-events.js',
          'source/js/init.js'
        ],
        dest: "webroot/js/site.js"
      }
    },
    uglify: {
      build: {
        files: {
          'webroot/js/site.min.js': ['webroot/js/site.js']
        }
      }
    },
    copy: {
      fonts: {
        files: [
          {
            expand: true,
            cwd: 'source/fonts/',
            src: ['**/*'],
            dest: 'webroot/fonts/'
          }
        ]
      },
      bootstrap_fonts: { // Remove this later
        files: [
          {
            expand: true,
            cwd: '<%= paths.bootstrap_fonts %>',
            src: ['**/*'],
            dest: 'webroot/fonts/'
          }
        ]
      },
      images: {
        files: [
          {
            expand: true,
            cwd: 'source/img/',
            src: ['**/*'],
            dest: 'webroot/img/'
          }
        ]
      },
      scripts: {
        files: [
          {
            expand: true,
            cwd: 'source/js/',
            src: [
              'lib/respond/respond.min.js',
              'lib/modernizr/modernizr.custom.03959.js'
            ],
            dest: 'webroot/js/'
          }
        ]
      }
    },
    cachebreaker: {
      css: {
        options: {
          match: [
            'site.min.css',
            'site.css'
          ]
        },
        files: {
          src: ['<%= paths.html_templ_base %><%= paths.cachebreak_include %>']
        }
      },
      print: {
        options: {
          match: [
            'print.min.css',
            'print.css'
          ]
        },
        files: {
          src: [
            '<%= paths.html_templ_base %><%= paths.cachebreak_include %>'
          ]
        }
      },
      js: {
        options: {
          match: [
            'site.js',
            'site.min.js'
          ]
        },
        files: {
          src: [
            '<%= paths.html_templ_base %><%= paths.cachebreak_include %>'
          ]
        }
      }
    },
    watch: {
      html: {
        files: [
          'source/*.html',
          'source/_includes/*.html',
          'source/_layouts/*.html'
        ],
        tasks: [
          'cachebreaker:css',
          'cachebreaker:print'
        ]
      },
      images: {
        files: [
          'source/img/*',
          'source/img/**/*'
        ],
        tasks: [
          'copy:images'
        ]
      },
      css: {
        files: [
          'source/scss/*.scss',
          'source/scss/*/*.scss',
        ],
        tasks: [
          'sass',
          'copy:images',
          'cachebreaker:css',
          'cachebreaker:print'
        ]
      },
      scripts: {
        files: [
          'source/js/modules/*.js',
          'source/js/init.js'
        ],
        tasks: [
          'concat:scripts',
          'copy:images',
          'cachebreaker:js'
        ]
      }
    }
  });

  // Load plugins
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-cache-breaker');

  // Register tasks
  // Default: dev
  grunt.registerTask(
    'default', [
      'sass',
      'concat:scripts',
      'copy:fonts',
      'copy:bootstrap_fonts',
      'copy:images',
      'copy:scripts',
      'cachebreaker:css',
      'cachebreaker:print',
      'cachebreaker:js',
      'watch'
    ]
  );
  // Prod
  grunt.registerTask(
    'prod', [
      'sass',
      'cssmin:minify',
      'concat:scripts',
      'uglify:build',
      'copy:fonts',
      'copy:bootstrap_fonts',
      'copy:images',
      'copy:scripts',
      'cachebreaker:css',
      'cachebreaker:print',
      'cachebreaker:js'
    ]
  );
};
