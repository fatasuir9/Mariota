module.exports = function(grunt) {

    grunt.initConfig({

    // Directories
    srcDir:{
        base: 'build',

        // Source build directory: Global
		jade: 'build/jade',
        sass: 'build/sass',
		js: 'build/js'
    },

    distDir:{
        base: 'public',

        // Destination public directory: Global
		view: 'public/views',
        css: 'public/css',
		js: 'public/js'
    },

    // Tasks & Configurations

	// Task no. 1: Jade
	jade: {
		compile: {
			options: {
				basedir: '<%= srcDir.jade %>',
				pretty: true,
				compileDebug: true,
				wrap: false
			},
			files: [{
				expand: true,
				cwd: '<%= srcDir.jade %>',
				src: ['**/*.jade'],
				dest: '<%= distDir.view %>',
				ext: '.php'
			}]
		}
	},

	// Task no. 2: HTMLmin
	htmlmin:{
		dist: {
			options: {
				removeComments: true,
				collapseWhitespace: true
			},
			files: {
				'<%= distDir.base %>/index.php': '<%= distDir.view %>/index.php',
			}
		},
	},

    // Task no. 3: Sass
    sass:{
        options:{
            style: 'compressed', // Sass file style
            noCache: false, // Disable the noCache
            cacheLocation: 'temp/sass', // Cached sass location
            update: true // Only compile changed files
        },
        dist:{
            files:[{
                expand: true,
                cwd: '<%= srcDir.sass %>',
                src: '**/*.{sass,scss}',
                dest: '<%= distDir.css %>',
                ext:'.css'
            }]
        },
    },

	// Task no. 4: Uglify
    uglify:{
        options:{
	        mangle: false, // Avoid functions - variables rename
	        preserveComments: /(?:^!|@(?:license|preserve|cc_on))/
			// Preserve all comments that start with a bang (!)
    	},
	    dist:{
	        files:[{
	            '<%= distDir.js %>/script.min.js':[
	                '<%= srcDir.js %>/script.js'
            	],
        	}]
    	},
    },

    // Task no. 5: Watch
    watch:{
        options:{
            spawn: false,
            livereload: true
        },
		jade: {
			files: '<%= srcDir.jade %>/**/*.jade',
			tasks: ['jade', 'htmlmin']
		},
		sass: {
			files: '<%= srcDir.sass %>/**/*.{scss,sass}',
			tasks: ['sass']
		},
    },

    });

    // Combined Tasks

    // Deployment
    grunt.registerTask('deploy',['jade', 'htmlmin', 'sass', 'uglify']);

    //Default
    grunt.registerTask('default',['watch']);

    // Depenent plugins
    grunt.loadNpmTasks('grunt-contrib-jade');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

};
