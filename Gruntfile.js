module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        jasmine: {
            components: {
                src: [
                    'lib/jquery/jquery-1.11.1.js',
                    'lib/jasmine-jquery/2.1.0/jasmine-jquery.js',
                    'src/*.js'
                ],
                options: {
                    specs: 'spec/*Spec.js',
                    keepRunner : true
                    //helpers: 'test/spec/*.js'
                }
            }
        },
        uglify: {
            clickElsewhere: {
                files: {
                    'clickElsewhere.min.js': 'src/clickElsewhere.js'
                }
            }
        }
    });

    grunt.registerTask('travis', ['jasmine']);
    grunt.registerTask('default', ['jasmine', 'uglify']);
};

