'use strict';

var config = {
	port: 3000
};

module.exports = function(grunt) {

	// Load grunt tasks automatically
	require('load-grunt-tasks')(grunt);

	// Time how long tasks take. Can help when optimizing build times
	require('time-grunt')(grunt);

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		express: {
			options: {
				port: config.port
			},
			dev: {
				options: {
					script: 'keystone.js',
					debug: true
				}
			}
		},

		jshint: {
			options: {
				reporter: require('jshint-stylish'),
				force: true
			},
			all: ['routes/**/*.js',
				'models/**/*.js'
			],
			server: [
				'./keystone.js'
			]
		},

		concurrent: {
			dev: {
				tasks: ['nodemon', 'node-inspector', 'watch'],
				options: {
					logConcurrentOutput: true
				}
			}
		},

		'node-inspector': {
			custom: {
				options: {
					'web-host': 'localhost'
				}
			}
		},

		nodemon: {
			debug: {
				script: 'keystone.js',
				options: {
					nodeArgs: ['--debug'],
					env: {
						port: config.port
					}
				}
			}
		},

		watch: {
			js: {
				files: [
					'model/**/*.js',
					'routes/**/*.js'
				],
				tasks: ['jshint:all']
			},
			express: {
				files: [
					'keystone.js',
					'public/js/lib/**/*.{js,json}'
				],
				tasks: ['jshint:server', 'concurrent:dev']
			},
			livereload: {
				files: [
					'public/styles/**/*.css',
					'public/styles/**/*.less',
					'templates/**/*.jade',
					'node_modules/keystone/templates/**/*.jade'
				],
				options: {
					livereload: true
				}
			}
		},

		copy: {
			production: {
				files:[
					{expand: true, cwd: 'public/fonts/', src: ['**'], dest: 'dist/fonts/'},
					{expand: true, cwd: 'public/images/', src: ['**'], dest: 'dist/images/'}
				]
			},
			mobicopy: {
				files: [
					{expand: true, cwd: 'public/js/app/', src: ['**'], dest: 'mobile/www/js/app/'},
					{expand: true, cwd: 'public/js/lib/', src: ['**'], dest: 'mobile/www/js/lib/'},
					{expand: true, cwd: 'public/styles/', src: ['**'], dest: 'mobile/www/styles/'},
					{expand: true, cwd: 'public/fonts/', src: ['**'], dest: 'mobile/www/fonts/'},
					{expand: true, cwd: 'public/images/', src: ['**'], dest: 'mobile/www/images/'}
				]
			}
		},

		clean: {
			production: [
				'.tmp',
				'dist'
			],
			mobiclean: [
				'mobile/www/index.html',
				'mobile/www/js/app',
				'mobile/www/js/lib',
				'mobile/www/styles',
				'mobile/www/fonts',
				'mobile/www/images'
			]
		},

		'compile-handlebars': {
			production: {
				files: [{
					src: "templates/views/index.hbs",
					dest: ".tmp/index.html"
				}],
				templateData: {
					production: true
				}
			}
		},

		htmlmin: {                                     // Task
			production: {                                      // Target
				options: {                                 // Target options
					removeComments: true,
					collapseWhitespace: true
				},
				files: {                                   // Dictionary of files
					'dist/index.html': '.tmp/index.html',     // 'destination': 'source'
					'dist/views/blog.html': 'public/views/blog.html',
					'dist/views/post.html': 'public/views/post.html'
				}
			}
		},

		less: {
			production: {
				files: {
					"dist/styles/site.css": "public/styles/site.less"
				}
			}
		},

		concat: {
			production: {
				src: [
					'public/js/lib/angular/angular.js',
					'public/js/lib/angular-sanitize/angular-sanitize.js',
					'public/js/lib/angular-route/angular-route.js',
					'public/js/lib/angular-resource/angular-resource.js',
					'public/js/index.js',
					'public/js/app/services.js',
					'public/js/app/blog/blog.js',
					'public/js/app/post/post.js',
					'public/js/app/main.js'
				],
				dest: '.tmp/js/script.js'
			}
		},

		uglify: {
			production: {
				files: {
					'dist/js/script.js': '.tmp/js/script.js'
				}
			}
		}
	});

	// load jshint
	grunt.registerTask('lint', function(target) {
		grunt.task.run([
			'jshint'
		]);
	});

	// default option to connect server
	grunt.registerTask('serve', function(target) {
		grunt.task.run([
			'jshint',
			'concurrent:dev'
		]);
	});

	grunt.registerTask('server', function() {
		grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
		grunt.task.run(['serve:' + target]);
	});

	grunt.registerTask('mobilegen', function() {
		grunt.task.run([
			'clean:mobiclean',
			'copy:mobicopy'
		]);
	});

	grunt.registerTask('prod', function() {
		grunt.task.run([
			'clean:production',
			'compile-handlebars:production',
			'htmlmin:production',
			'less:production',
			'concat:production',
			'uglify:production',
			'copy:production'
		]);
	});

};
