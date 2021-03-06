// Generated on 2015-03-03 using generator-polopoly-widget 0.0.0
module.exports = function(grunt){

	require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

	var autoprefixer = require('autoprefixer-core');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

		sass: {
		    build: {
		    	options: {
		    		style: 'expanded'
		    	},
		        files: {
		            'assets/css/index.css': 'assets/sass/index.scss'
		        }
		    }
		},

	    postcss: {
	        options: {
	            processors: [
	              autoprefixer({ browsers: ['> 1%'] }).postcss
	            ]
	        },
	        dist: { src: 'assets/css/*.css' }
	    },

		jshint: {
			files: {
				src : 'assets/js/*.js'
			},
		},

		concat: {
			buildIndex: {
				src: [	
						'assets/concat/polopoly-header.html',
						'assets/concat/style-open.txt',
						'assets/css/index.css',
						'assets/concat/style-close.txt',
						'assets/widget.html',
						'assets/concat/script-open.txt',
						'assets/js/buildParams.js',
						'assets/js/buildWidget.js',
						'assets/js/destroy.js',
						'assets/js/resizeCanvas.js',
						'assets/js/buildCanvas.js',
						'assets/js/getMousePos.js',
						'assets/js/loadImages.js',
						'assets/js/makeRange.js',
						'assets/js/drawFrame.js',
						'assets/js/index.js',
						'assets/concat/script-close.txt',
						'assets/concat/polopoly-footer.html'
						],
				dest: 'build/index.html'
			},
			distIndex: {
				src: [	
						'assets/concat/style-open.txt',
						'assets/css/index.css',
						'assets/concat/style-close.txt',
						'assets/widget.html',
						'assets/concat/script-open.txt',
						'assets/js/buildParams.js',
						'assets/js/buildWidget.js',
						'assets/js/destroy.js',
						'assets/js/resizeCanvas.js',
						'assets/js/buildCanvas.js',
						'assets/js/getMousePos.js',
						'assets/js/loadImages.js',
						'assets/js/makeRange.js',
						'assets/js/drawFrame.js',
						'assets/js/index.js',
						'assets/concat/script-close.txt',
						],
				dest: 'dist/index.html'
			}
		},

		browser_sync: {
			files: {
				src: [
					'build/index.html',
					]
			},
			options: {
				watchTask: true
			}
		},

		watch: {
		    css: {
		        files: ['assets/sass/**/*.scss'],
		        tasks: ['buildcss','concat']
		    },
			concat: {
				files: ['assets/*','assets/js/*.js'],
				tasks: ['concat']
			}
		}

    });

    grunt.registerTask('default', ['watch']);
    grunt.registerTask('buildcss',  ['sass', 'postcss']);

};