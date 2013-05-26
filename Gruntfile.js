module.exports = function (grunt) {


  // Ristretto config
  var publish_dir = 'publish';
  var www_dir = 'www';
  var latte_dir = www_dir;
  var model_dir = www_dir + '/model';
  var port = 2013;
  // /Ristretto config


  var www_path = function(path) {
    return www_dir + '/' + path;
  };

  var latte_path = function(path) {
    return latte_dir + '/' + path;
  };

  var less_files = {};
  less_files[www_path('css/screen.css')] = www_path('less/screen.less');
  //less_files[www_path('css/print.css')] = www_path('less/print.less');

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
    esteWatch: {
      options: {
        livereload: { enabled: false  },
        dirs: [
          www_dir,
          www_path('**')
        ]
      },
      less: function(filepath) {
        return ['less'];
      },
      css: function(filepath) {
        return ['ristretto:reloadStyles'];
      },
      "*": function(filepath) {
        return ['ristretto:reload'];
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
    less: {
      production: {
        options: { yuicompress: true  },
        files: less_files
      }
    }
  });
  
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-ristretto');
  grunt.loadNpmTasks('grunt-este-watch');

  grunt.registerTask('default', ['ristretto', 'ristretto:reload', 'esteWatch']);
  grunt.registerTask('publish', ['less', 'ristretto:publish', 'copy:publish']);
};