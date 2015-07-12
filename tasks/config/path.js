/**
 * Created by Aymen Mouelhi (aymen.mouelhi@gmail.com) on 09/07/2015.
 */
/**
 * React Module
 *
 * ---------------------------------------------------------------
 *
 * This grunt task is configured to clean out the contents in the .tmp/public of your
 * sails project.
 *
 * For usage docs see:
 *        https://github.com/gruntjs/grunt-react
 */
module.exports = function (grunt) {
    // Todo: change name to list
    // Todo; loop over all files and do a console.log
    // http://javascriptplayground.com/blog/2014/01/creating-your-first-grunt-plugin/

    grunt.config.set('path', {
        dev: {
            files: [
                {
                    expand: true,
                    cwd: 'assets/react/js/',
                    src: ['**/*.jsx'],
                    dest: '.tmp/public/react/js/',
                    ext: '.js'
                }
            ]
        }

    });

    // Todo: load custom grunt module
    grunt.loadNpmTasks('grunt-react');
};
