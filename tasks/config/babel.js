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
 *        https://github.com/gruntjs/grunt-babel
 */
module.exports = function (grunt) {

    grunt.config.set('babel', {

        options: {
            sourceMap: true
        },
        dist: {
            files: {
                "assets/react/js/browserify/*.jsx": ".tmp/public/react/js/browserify/*.js"
            }
        }
    });

    grunt.loadNpmTasks('grunt-babel');
};
