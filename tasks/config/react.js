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

    grunt.config.set('react', {
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

    grunt.loadNpmTasks('grunt-react');
};
