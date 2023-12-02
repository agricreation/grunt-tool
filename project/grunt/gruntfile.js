module.exports = function (grunt) {
  grunt.registerTask("hellow", function () {
    console.log("i am grunt running");
  });

  grunt.initConfig({
    concat: {
      options: {
        separator: "\n",
        sourceMap: true,
        banner: "/* Processed by grunt  */ \n",
      },
      css: {
        src: ["../css/app.css", "../css/style.css"],
        dest: "dist/css/app.css",
      },
      js: {
        src: ["../js/app.js"],
        dest: "dist/js/app.js",
      },
    },
    cssmin: {
      options: {
        mergeIntoShorthands: false,
        roundingPrecision: -1,
      },
      target: {
        files: {
          "../../htdocs/css/app.css": ["dist/css/app.css"],
        },
      },
    },
    uglify: {
      my_target: {
        options: {
          sourceMap: true,
        },
        files: {
          "../../htdocs/js/app.js": ["dist/js/app.js"],
        },
      },
    },
    copy: {
      bower: {
        files: [
          {
            expand: true,
            flatten: true,
            filter: "isFile",
            src: ["bower_components/jquery/dist/*"],
            dest: "../../htdocs/js/jquery/",
          },
        ],
      },
    },
    obfuscator: {
      options: {
          // banner: '// obfuscated with grunt-contrib-obfuscator.\n',
          // // debugProtection: true,
          // debugProtectionInterval: true,
          // domainLock: ['www.example.com']
      },
      task1: {
          options: {
              // options for each sub task
          },
          files: {
              '../../htdocs/js/app.o.js': [
                  'dist/js/app.js',
              ]
          }
      }
  },
    watch: {
      css: {
        files: ["../css/**/*.css"],
        tasks: ["concat:css", "cssmin"],
        options: {
          spawn: false,
        },
      },
      js: {
        files: ["../js/**/*.js"],
        tasks: ["concat:js", "uglify", "obfuscator"],
        options: {
          spawn: false,
        },
      },
    },
  });

  grunt.loadNpmTasks("grunt-contrib-concat");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-contrib-cssmin");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-obfuscator');
  grunt.registerTask("default", [
    "hellow",
    "copy",
    "concat",
    "cssmin",
    "uglify",
    'obfuscator',
    "watch",
  ]);
};
