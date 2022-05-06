export const exampleGruntfile = `"use strict";

/**
 * Module dependencies.
 */
var _ = require("lodash"),
  defaultAssets = require("./config/assets/default"),
  testAssets = require("./config/assets/test"),
  testConfig = require("./config/env/test"),
  fs = require("fs"),
  path = require("path");

module.exports = function (grunt) {
  // Project Configuration
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    env: {
      test: {
        NODE_ENV: "test",
      },
      dev: {
        NODE_ENV: "development",
      },
      prod: {
        NODE_ENV: "production",
      },
    },
    watch: {
      serverViews: {
        files: defaultAssets.server.views,
        options: {
          livereload: true,
        },
      },
      serverJS: {
        files: _.union(
          defaultAssets.server.gruntConfig,
          defaultAssets.server.allJS
        ),
        tasks: ["jshint"],
        options: {
          livereload: true,
        },
      },
      clientViews: {
        files: defaultAssets.client.views,
        options: {
          livereload: true,
        },
      },
      clientJS: {
        files: defaultAssets.client.js,
        tasks: ["jshint"],
        options: {
          livereload: true,
        },
      },
      clientCSS: {
        files: defaultAssets.client.css,
        tasks: ["csslint"],
        options: {
          livereload: true,
        },
      },
      clientSCSS: {
        files: defaultAssets.client.sass,
        tasks: ["sass", "csslint"],
        options: {
          livereload: true,
        },
      },
      clientLESS: {
        files: defaultAssets.client.less,
        tasks: ["less", "csslint"],
        options: {
          livereload: true,
        },
      },
    },
    nodemon: {
      dev: {
        script: "server.js",
        options: {
          nodeArgs: ["--debug"],
          ext: "js,html",
          watch: _.union(
            defaultAssets.server.gruntConfig,
            defaultAssets.server.views,
            defaultAssets.server.allJS,
            defaultAssets.server.config
          ),
        },
      },
    },
    concurrent: {
      default: ["nodemon", "watch"],
      debug: ["nodemon", "watch", "node-inspector"],
      options: {
        logConcurrentOutput: true,
      },
    },
    jshint: {
      all: {
        src: _.union(
          defaultAssets.server.gruntConfig,
          defaultAssets.server.allJS,
          defaultAssets.client.js,
          testAssets.tests.server,
          testAssets.tests.client,
          testAssets.tests.e2e
        ),
        options: {
          jshintrc: true,
          node: true,
          mocha: true,
          jasmine: true,
        },
      },
    },
    eslint: {
      options: {},
      target: _.union(
        defaultAssets.server.gruntConfig,
        defaultAssets.server.allJS,
        defaultAssets.client.js,
        testAssets.tests.server,
        testAssets.tests.client,
        testAssets.tests.e2e
      ),
    },
    csslint: {
      options: {
        csslintrc: ".csslintrc",
      },
      all: {
        src: defaultAssets.client.css,
      },
    },
    ngAnnotate: {
      production: {
        files: {
          "public/dist/application.js": defaultAssets.client.js,
        },
      },
    },
    uglify: {
      production: {
        options: {
          mangle: false,
        },
        files: {
          "public/dist/application.min.js": "public/dist/application.js",
        },
      },
    },
    cssmin: {
      combine: {
        files: {
          "public/dist/application.min.css": defaultAssets.client.css,
        },
      },
    },
    sass: {
      dist: {
        files: [
          {
            expand: true,
            src: defaultAssets.client.sass,
            ext: ".css",
            rename: function (base, src) {
              return src.replace("/scss/", "/css/");
            },
          },
        ],
      },
    },
    less: {
      dist: {
        files: [
          {
            expand: true,
            src: defaultAssets.client.less,
            ext: ".css",
            rename: function (base, src) {
              return src.replace("/less/", "/css/");
            },
          },
        ],
      },
    },
    "node-inspector": {
      custom: {
        options: {
          "web-port": 1337,
          "web-host": "localhost",
          "debug-port": 5858,
          "save-live-edit": true,
          "no-preload": true,
          "stack-trace-limit": 50,
          hidden: [],
        },
      },
    },
    mochaTest: {
      src: testAssets.tests.server,
      options: {
        reporter: "spec",
        timeout: 10000,
      },
    },
    mocha_istanbul: {
      coverage: {
        src: testAssets.tests.server,
        options: {
          print: "detail",
          coverage: true,
          require: "test.js",
          coverageFolder: "coverage/server",
          reportFormats: ["cobertura", "lcovonly"],
          check: {
            lines: 40,
            statements: 40,
          },
        },
      },
    },
    karma: {
      unit: {
        configFile: "karma.conf.js",
      },
    },
    protractor: {
      options: {
        configFile: "protractor.conf.js",
        noColor: false,
        webdriverManagerUpdate: true,
      },
      e2e: {
        options: {
          args: {}, // Target-specific arguments
        },
      },
    },
    copy: {
      localConfig: {
        src: "config/env/local.example.js",
        dest: "config/env/local.js",
        filter: function () {
          return !fs.existsSync("config/env/local.js");
        },
      },
    },
  });

  grunt.event.on("coverage", function (lcovFileContents, done) {
    // Set coverage config so karma-coverage knows to run coverage
    testConfig.coverage = true;
    require("coveralls").handleInput(lcovFileContents, function (err) {
      if (err) {
        return done(err);
      }
      done();
    });
  });

  // Load NPM tasks
  require("load-grunt-tasks")(grunt);
  grunt.loadNpmTasks("grunt-protractor-coverage");

  // Make sure upload directory exists
  grunt.task.registerTask(
    "mkdir:upload",
    "Task that makes sure upload directory exists.",
    function () {
      // Get the callback
      var done = this.async();

      grunt.file.mkdir(
        path.normalize(__dirname + "/modules/users/client/img/profile/uploads")
      );

      done();
    }
  );

  // Connect to the MongoDB instance and load the models
  grunt.task.registerTask(
    "mongoose",
    "Task that connects to the MongoDB instance and loads the application models.",
    function () {
      // Get the callback
      var done = this.async();

      // Use mongoose configuration
      var mongoose = require("./config/lib/mongoose.js");

      // Connect to database
      mongoose.connect(function (db) {
        done();
      });
    }
  );

  // Drops the MongoDB database, used in e2e testing
  grunt.task.registerTask("dropdb", "drop the database", function () {
    // async mode
    var done = this.async();

    // Use mongoose configuration
    var mongoose = require("./config/lib/mongoose.js");

    mongoose.connect(function (db) {
      db.connection.db.dropDatabase(function (err) {
        if (err) {
          console.log(err);
        } else {
          console.log(
            "Successfully dropped db: ",
            db.connection.db.databaseName
          );
        }
        db.connection.db.close(done);
      });
    });
  });

  grunt.task.registerTask("server", "Starting the server", function () {
    // Get the callback
    var done = this.async();

    var path = require("path");
    var app = require(path.resolve("./config/lib/app"));
    var server = app.start(function () {
      done();
    });
  });

  // Lint CSS and JavaScript files.
  grunt.registerTask("lint", ["sass", "less", "jshint", "eslint", "csslint"]);

  // Lint project files and minify them into two production files.
  grunt.registerTask("build", [
    "env:dev",
    "lint",
    "ngAnnotate",
    "uglify",
    "cssmin",
  ]);

  // Run the project tests
  grunt.registerTask("test", [
    "env:test",
    "lint",
    "mkdir:upload",
    "copy:localConfig",
    "server",
    "mochaTest",
    "karma:unit",
    "protractor",
  ]);
  grunt.registerTask("test:server", [
    "env:test",
    "lint",
    "server",
    "mochaTest",
  ]);
  grunt.registerTask("test:client", ["env:test", "lint", "karma:unit"]);
  grunt.registerTask("test:e2e", [
    "env:test",
    "lint",
    "dropdb",
    "server",
    "protractor",
  ]);
  // Run project coverage
  grunt.registerTask("coverage", [
    "env:test",
    "lint",
    "mocha_istanbul:coverage",
    "karma:unit",
  ]);

  // Run the project in development mode
  grunt.registerTask("default", [
    "env:dev",
    "lint",
    "mkdir:upload",
    "copy:localConfig",
    "concurrent:default",
  ]);

  // Run the project in debug mode
  grunt.registerTask("debug", [
    "env:dev",
    "lint",
    "mkdir:upload",
    "copy:localConfig",
    "concurrent:debug",
  ]);

  // Run the project in production mode
  grunt.registerTask("prod", [
    "build",
    "env:prod",
    "mkdir:upload",
    "copy:localConfig",
    "concurrent:default",
  ]);
};
`;

export const exampleGulpfile = `'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
  defaultAssets = require('./config/assets/default'),
  testAssets = require('./config/assets/test'),
  gulp = require('gulp'),
  gulpLoadPlugins = require('gulp-load-plugins'),
  runSequence = require('run-sequence'),
  plugins = gulpLoadPlugins({
    rename: {
      'gulp-angular-templatecache': 'templateCache'
    }
  }),
  path = require('path'),
  endOfLine = require('os').EOL,
  protractor = require('gulp-protractor').protractor,
  webdriver_update = require('gulp-protractor').webdriver_update,
  webdriver_standalone = require('gulp-protractor').webdriver_standalone;

// Set NODE_ENV to 'test'
gulp.task('env:test', function () {
  process.env.NODE_ENV = 'test';
});

// Set NODE_ENV to 'development'
gulp.task('env:dev', function () {
  process.env.NODE_ENV = 'development';
});

// Set NODE_ENV to 'production'
gulp.task('env:prod', function () {
  process.env.NODE_ENV = 'production';
});

// Nodemon task
gulp.task('nodemon', function () {
  return plugins.nodemon({
    script: 'server.js',
    nodeArgs: ['--debug'],
    ext: 'js,html',
    watch: _.union(defaultAssets.server.views, defaultAssets.server.allJS, defaultAssets.server.config)
  });
});

// Watch Files For Changes
gulp.task('watch', function () {
  // Start livereload
  plugins.livereload.listen();

  // Add watch rules
  gulp.watch(defaultAssets.server.views).on('change', plugins.livereload.changed);
  gulp.watch(defaultAssets.server.allJS, ['jshint']).on('change', plugins.livereload.changed);
  gulp.watch(defaultAssets.client.js, ['jshint']).on('change', plugins.livereload.changed);
  gulp.watch(defaultAssets.client.css, ['csslint']).on('change', plugins.livereload.changed);
  gulp.watch(defaultAssets.client.sass, ['sass', 'csslint']).on('change', plugins.livereload.changed);
  gulp.watch(defaultAssets.client.less, ['less', 'csslint']).on('change', plugins.livereload.changed);

  if (process.env.NODE_ENV === 'production') {
    gulp.watch(defaultAssets.server.gulpConfig, ['templatecache', 'jshint']);
    gulp.watch(defaultAssets.client.views, ['templatecache', 'jshint']).on('change', plugins.livereload.changed);
  } else {
    gulp.watch(defaultAssets.server.gulpConfig, ['jshint']);
    gulp.watch(defaultAssets.client.views).on('change', plugins.livereload.changed);
  }
});

// CSS linting task
gulp.task('csslint', function (done) {
  return gulp.src(defaultAssets.client.css)
    .pipe(plugins.csslint('.csslintrc'))
    .pipe(plugins.csslint.reporter())
    .pipe(plugins.csslint.reporter(function (file) {
      if (!file.csslint.errorCount) {
        done();
      }
    }));
});

// JS linting task
gulp.task('jshint', function () {
  var assets = _.union(
    defaultAssets.server.gulpConfig,
    defaultAssets.server.allJS,
    defaultAssets.client.js,
    testAssets.tests.server,
    testAssets.tests.client,
    testAssets.tests.e2e
  );

  return gulp.src(assets)
    .pipe(plugins.jshint())
    .pipe(plugins.jshint.reporter('default'))
    .pipe(plugins.jshint.reporter('fail'));
});

// ESLint JS linting task
gulp.task('eslint', function () {
  var assets = _.union(
    defaultAssets.server.gulpConfig,
    defaultAssets.server.allJS,
    defaultAssets.client.js,
    testAssets.tests.server,
    testAssets.tests.client,
    testAssets.tests.e2e
  );

  return gulp.src(assets)
    .pipe(plugins.eslint())
    .pipe(plugins.eslint.format());
});

// JS minifying task
gulp.task('uglify', function () {
  var assets = _.union(
    defaultAssets.client.js,
    defaultAssets.client.templates
  );

  return gulp.src(assets)
    .pipe(plugins.ngAnnotate())
    .pipe(plugins.uglify({
      mangle: false
    }))
    .pipe(plugins.concat('application.min.js'))
    .pipe(gulp.dest('public/dist'));
});

// CSS minifying task
gulp.task('cssmin', function () {
  return gulp.src(defaultAssets.client.css)
    .pipe(plugins.cssmin())
    .pipe(plugins.concat('application.min.css'))
    .pipe(gulp.dest('public/dist'));
});

// Sass task
gulp.task('sass', function () {
  return gulp.src(defaultAssets.client.sass)
    .pipe(plugins.sass())
    .pipe(plugins.autoprefixer())
    .pipe(plugins.rename(function (file) {
      file.dirname = file.dirname.replace(path.sep + 'scss', path.sep + 'css');
    }))
    .pipe(gulp.dest('./modules/'));
});

// Less task
gulp.task('less', function () {
  return gulp.src(defaultAssets.client.less)
    .pipe(plugins.less())
    .pipe(plugins.autoprefixer())
    .pipe(plugins.rename(function (file) {
      file.dirname = file.dirname.replace(path.sep + 'less', path.sep + 'css');
    }))
    .pipe(gulp.dest('./modules/'));
});

// Angular template cache task
gulp.task('templatecache', function () {
  var re = new RegExp('\\' + path.sep + 'client\\' + path.sep, 'g');

  return gulp.src(defaultAssets.client.views)
    .pipe(plugins.templateCache('templates.js', {
      root: 'modules/',
      module: 'core',
      templateHeader: '(function () {' + endOfLine + '	\'use strict\';' + endOfLine + endOfLine + '	angular' + endOfLine + '		.module(\'<%= module %>\'<%= standalone %>)' + endOfLine + '		.run(templates);' + endOfLine + endOfLine + '	templates.$inject = [\'$templateCache\'];' + endOfLine + endOfLine + '	function templates($templateCache) {' + endOfLine,
      templateBody: '		$templateCache.put(\'<%= url %>\', \'<%= contents %>\');',
      templateFooter: '	}' + endOfLine + '})();' + endOfLine,
      transformUrl: function (url) {
        return url.replace(re, path.sep);
      }
    }))
    .pipe(gulp.dest('build'));
});

// Mocha tests task
gulp.task('mocha', function (done) {
  // Open mongoose connections
  var mongoose = require('./config/lib/mongoose.js');
  var error;

  // Connect mongoose
  mongoose.connect(function () {
    mongoose.loadModels();
    // Run the tests
    gulp.src(testAssets.tests.server)
      .pipe(plugins.mocha({
        reporter: 'spec',
        timeout: 10000
      }))
      .on('error', function (err) {
        // If an error occurs, save it
        error = err;
      })
      .on('end', function () {
        // When the tests are done, disconnect mongoose and pass the error state back to gulp
        mongoose.disconnect(function () {
          done(error);
        });
      });
  });

});

// Karma test runner task
gulp.task('karma', function (done) {
  return gulp.src([])
    .pipe(plugins.karma({
      configFile: 'karma.conf.js',
      action: 'run',
      singleRun: true
    }));
});

// Drops the MongoDB database, used in e2e testing
gulp.task('dropdb', function (done) {
  // Use mongoose configuration
  var mongoose = require('./config/lib/mongoose.js');

  mongoose.connect(function (db) {
    db.connection.db.dropDatabase(function (err) {
      if(err) {
        console.log(err);
      } else {
        console.log('Successfully dropped db: ', db.connection.db.databaseName);
      }
      db.connection.db.close(done);
    });
  });
});

// Downloads the selenium webdriver
gulp.task('webdriver_update', webdriver_update);

// Start the standalone selenium server
// NOTE: This is not needed if you reference the
// seleniumServerJar in your protractor.conf.js
gulp.task('webdriver_standalone', webdriver_standalone);

// Protractor test runner task
gulp.task('protractor', ['webdriver_update'], function () {
  gulp.src([])
    .pipe(protractor({
      configFile: 'protractor.conf.js'
    }))
    .on('end', function() {
      console.log('E2E Testing complete');
      // exit with success.
      process.exit(0);
    })
    .on('error', function(err) {
      console.log('E2E Tests failed');
      process.exit(1);
    });
});

// Lint CSS and JavaScript files.
gulp.task('lint', function (done) {
  runSequence('less', 'sass', ['csslint', 'eslint', 'jshint'], done);
});

// Lint project files and minify them into two production files.
gulp.task('build', function (done) {
  runSequence('env:dev', 'lint', ['uglify', 'cssmin'], done);
});

// Run the project tests
gulp.task('test', function (done) {
  runSequence('env:test', 'lint', 'mocha', 'karma', 'nodemon', 'protractor', done);
});

gulp.task('test:server', function (done) {
  runSequence('env:test', 'lint', 'mocha', done);
});

gulp.task('test:client', function (done) {
  runSequence('env:test', 'lint', 'karma', done);
});

gulp.task('test:e2e', function (done) {
  runSequence('env:test', 'lint', 'dropdb', 'nodemon', 'protractor', done);
});

// Run the project in development mode
gulp.task('default', function (done) {
  runSequence('env:dev', 'lint', ['nodemon', 'watch'], done);
});

// Run the project in debug mode
gulp.task('debug', function (done) {
  runSequence('env:dev', 'lint', ['nodemon', 'watch'], done);
});

// Run the project in production mode
gulp.task('prod', function (done) {
  runSequence('templatecache', 'build', 'env:prod', 'lint', ['nodemon', 'watch'], done);
});`;
