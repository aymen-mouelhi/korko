/**
 * Created by Aymen Mouelhi (aymen.mouelhi@gmail.com) on 25/05/2015.
 */
/**
 * Use Browserify
 *
 * ---------------------------------------------------------------
 *
 * This grunt task is configured to clean out the contents in the .tmp/public of your
 * sails project.
 *
 * For usage docs see:
 *        https://github.com/gruntjs/grunt-browserify
 */

var factor = require('factor-bundle');
module.exports = function(grunt) {

    var version = grunt.file.readJSON('package.json').version;
    var pipeline = require('../pipeline');
    var buildFile = '.tmp/public/browserify/debug.' + version + '.js';

    // Todo: Get file names

    grunt.config.set('browserify', {
        /*
        files: [
            {
                expand: true,
                src: pipeline.browserifyMainFile,
                dest: '.tmp/public/browserify/debug.' + version + '.js',
                ext: '.js'
            }
        ],
        */


        js: {
            // src : [pipeline.browserifyMainFile, 'assets/react/js/**/*.jsx'],
            //src : [pipeline.browserifyMainFile, 'assets/react/js/pin/**/*.jsx'],
            src : ['assets/react/js/pin/components/App.jsx', 'assets/react/js/pin/components/Pin.jsx'],
            dest: '.tmp/public/browserify/debug.' + version + '.js'
        },

        options: {
            plugin: [ factor, { outputs: [ '.tmp/public/browserify/pin/App.js', '.tmp/public/browserify/pin/Pin.js'] }],
            transform: [require('grunt-react').browserify],
            basedir: pipeline.appRootDir
        }

        /*
        dist: {
            files: {
                '.tmp/public/browserify/debug.0.0.1.js': [pipeline.browserifyMainFile, 'assets/react/js/test/*.jsx']
            },
            options: {
                transform: [require('grunt-react').browserify]
            }
        }
        */
    });

    grunt.loadNpmTasks('grunt-browserify');
};