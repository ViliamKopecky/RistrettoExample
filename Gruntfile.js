module.exports = function (grunt) {

  var config_path = __dirname + '/ristretto.json';
  var config = grunt.file.readJSON(config_path);
  config.config_path = config_path;

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),


    ristretto: {
      options: {
        config: config
      }
    },


    esteWatch: {
      options: {
        livereload: { enabled: false },
        dirs: [ config.www_dir+'/**' ]
      },
      "css": function(filepath) {
        return ['ristretto:stylesheets'];
      },
      "*": function(filepath) {
        return ['ristretto:pages'];
      }
    },

    release: {}

  });

  grunt.loadNpmTasks('grunt-este-watch');
  grunt.loadNpmTasks('grunt-ristretto');

  grunt.loadNpmTasks('grunt-release');

  grunt.registerTask('dev', ['ristretto:startup', 'esteWatch']);
  grunt.registerTask('build', ['ristretto:publish']);
};