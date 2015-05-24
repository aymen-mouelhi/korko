module.exports = function (grunt) {
	grunt.registerTask('linkAssetsBuild', [
        'sails-react:devJsRelative',
        'sails-react:devStylesRelative',
        'sails-react:devTpl',
        'sails-react:devJsRelativeJade',
        'sails-react:devStylesRelativeJade',
        'sails-react:devTplJade'
	]);
};
