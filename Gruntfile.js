module.exports = function (grunt) {

  var publish_dir = 'publish';
  var www_dir = 'www';
  var latte_dir = www_dir;
  var model_dir = www_dir + '/model';
  var port = 2013;

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
    less: {
      production: {
        options: {
          yuicompress: true
        },
        files: less_files
      }
    },
    clean: {
      publish: [publish_dir]
    },
    copy: {
      publish: {
        files: [
          {expand: true, cwd: www_dir, src: ['**', '!**.latte'], dest: publish_dir}
        ]
      }
    },
    watch: {
      styles: {
        files: [www_path('**/*.less')],
        tasks: ['less', 'ristretto:stylesheets'],
        options: {
          nospawn: true
        }
      },
      scripts: {
        files: [www_path('**/*.*'), '!'+www_path('**/*.css'), '!'+www_path('/**/*.less')],
        tasks: ['ristretto:pages'],
        options: {
          nospawn: true
        }
      }
    },
    ristretto: {
      options: {
        model_dir: model_dir,
        latte_dir: latte_dir,
        www_dir: www_dir,
        publish_dir: publish_dir,
        port: port
      },
      server: {},
      publish: {},
      stylesheets: {},
      pages: {}
    }
  });

  
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-ristretto');

  grunt.registerTask('default', ['ristretto:server', 'less', 'ristretto:pages', 'watch']);
  grunt.registerTask('publish', ['less', 'clean:publish', 'copy:publish', 'ristretto:publish']);
};