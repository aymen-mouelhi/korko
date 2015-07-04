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
module.exports = function (grunt) {

    grunt.config.set('browserify', {
        dist: {
            options: {
                transform: ["reactify", "envify"]
            }
        }
    });

    grunt.loadNpmTasks('grunt-browserify');
};