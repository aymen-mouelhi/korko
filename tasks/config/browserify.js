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
module.exports = function(grunt) {

    var version = grunt.file.readJSON('package.json').version;
    var pipeline = require('../pipeline');

    grunt.config.set('browserify', {
        js: {
            src : pipeline.browserifyMainFile,
            dest: '.tmp/public/browserify/debug.' + version + '.js'
        },
        options: {
            transform: [require('grunt-react').browserify],
            basedir: pipeline.appRootDir
        }
    });

    grunt.loadNpmTasks('grunt-browserify');
};