module.exports = function (grunt) {

  var port = 2013;

  var publish_dir = 'publish';
  var www_dir = 'www';
  var latte_dir = 'www';
  var model_dir = 'www/model';

  var less_files = {};
  less_files['www/css/screen.css'] = 'www/less/screen.less';
  //less_files['www/css/print.css'] = 'www/less/print.less';

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: {
      publish: [ publish_dir ]
    },
    copy: {
      publish: {
        files: [
          { expand: true, cwd: www_dir, src: ['**', '!**.latte'], dest: publish_dir }
        ]
      }
    },
    ristretto: {
      options: {
        model_dir: model_dir,
        latte_dir: latte_dir,
        www_dir: www_dir,
        publish_dir: publish_dir,
        port: port
      }
    },
    esteWatch: {
      options: {
        livereload: { enabled: false },
        dirs: [ www_dir+'/**' ]
      },
      less: function(filepath) {
        return ['less'];
      },
      css: function(filepath) {
        return ['ristretto:stylesheets'];
      },
      "*": function(filepath) {
        return ['ristretto:pages'];
      }
    },
    less: {
      production: {
        options: { yuicompress: true },
        files: less_files
      }
    }
  });
  
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-ristretto');
  grunt.loadNpmTasks('grunt-este-watch');

  grunt.registerTask('default', ['ristretto:server', 'less', 'ristretto:pages', 'esteWatch']);
  grunt.registerTask('publish', ['less', 'ristretto:publish', 'copy:publish']);
};