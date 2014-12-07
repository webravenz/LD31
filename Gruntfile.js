module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    less: {
      compile: {
        options: {
          paths: ["css"],
          cleancss: true
        },
        files: {
          "css/style.css": "css/style.less"
        }
      }
    },
    watch: {
      css: {
        files: ['css/*.less'],
        tasks: ['less']
      }
    },
    uglify: {
      app: {
        files: {
          'game.min.js': ['js/vendor/pixi.js', 'js/vendor/buzz.js', 'js/class/bullet/BulletsManager.js', 'js/class/bullet/Bullet.js', 'js/class/enemy/Enemy.js', 'js/class/enemy/EnemiesManager.js', 'js/class/Player.js', 'js/class/CollisionManager.js', 'js/class/Pool.js', 'js/class/SpriteSheetTextures.js', 'js/class/Controls.js', 'js/class/Sounds.js', 'js/class/utility/Utils.js', 'js/class/utility/Rectangle.js', 'js/class/ui/Scores.js', 'js/main.js'] 
        }
      }
    }
  });
  
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');

};