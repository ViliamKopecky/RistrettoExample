module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    less: {
      production: {
        options: {
          yuicompress: true
        },
        files: {
          "www/css/screen.css": "www/less/screen.less"
        }
      }
    },
    watch: {
      styles: {
        files: ['www/**/*.less'],
        tasks: ['less', 'ristretto:stylesheets']
      },
      scripts: {
        files: ['www/**/*', '!www/**/*.css', '!www/**/*.less'],
        tasks: ['ristretto:pages']
      }
    },
    ristretto: {
      options: {
        model_dir: 'www/model',
        latte_dir: 'www',
        www_dir: 'www',
        port: 2013
      },
      server: {
      },
      publish: {
      },
      stylesheets: {
      },
      pages: {
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-ristretto');

  grunt.registerTask('default', ['ristretto:server', 'less', 'ristretto:pages', 'watch']);
};