/**
 * React Module
 *
 * ---------------------------------------------------------------
 *
 * This grunt task is configured to clean out the contents in the .tmp/public of your
 * sails project.
 *
 * For usage docs see:
 * 		https://github.com/gruntjs/grunt-react
 */
module.exports = function(grunt) {

	grunt.config.set('react', {
      dev: {
        files: [
          {
            expand: true,
            cwd: 'assets/linker/js/',
            src: ['**/*.jsx'],
            dest: '.tmp/public/linker/js/',
            ext: '.js'
          }, {
            expand: true,
            cwd: 'assets/js/',
            src: ['**/*.jsx'],
            dest: '.tmp/public/js/',
            ext: '.js'
          }
        ]
      }
    });

	grunt.loadNpmTasks('grunt-react');
};
