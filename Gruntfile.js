module.exports = function(grunt) {
  //config grunt init information
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    // clean scss and cache
    clean: {
      build: ['build','.sass-cache'],
      release: ['build/**/styles/'],
      end: ['build/**/*.scss']
    },
    //this is copy file
    copy: {
      main: {
        files: [
          {expand: true , cwd: 'app' , src: '**' , dest: 'build/'},
          {expand: true , cwd: 'components' , src: '**' , dest: 'build/components'},
          {expand: true , cwd: 'core/' , src: '**' , dest: 'build/' , flatten: true , filter: 'isFile'}
        ]
      }
    },
    //this is load scss
    loadscss:{
      components:{src: "components/styles/**/*.scss" , dest:"components/index.scss",exclude:['components']},
      app:{src: "app/**/styles/**/*.scss" , dest:"app/@@@/index.scss",exclude:['app']}
    },
   //compile the scss
    sass: {
      dist: {
          expand: true,
          noCache: true,
          src: ['build/**/index.scss'],
          dest: 'build',
          rename : function(dest , src){
            return  dest + "/" + src.split("/")[1] + '/index.css';
          }
      }
    },
    //concat the css
    concat: {
        options: {
          separator: '',
        },
        dist: {
          src: "build/**/index.css",
          dest: 'build/style/stylesheet.css',
        }
    },
    
    // imagemin
    imagemin: {
      dynamic: {
        options: {
          optimizationLevel: 3,
        },
        files: [{
          expand: true,
          src: ['images/**/*.{png,jpg,jpeg,gif}'],
          dest: 'build/',
          rename : function(dest , src){
              var folder_name = src.substring(0,src.lastIndexOf('/'));
              var file_name = src.substring(src.lastIndexOf('/'),src.lenght);
              return dest + folder_name + file_name;
          }
        }]
      }
    }
  });

  //load scss 
  grunt.registerMultiTask('loadscss','Generate the loader file for module index.scss files',function(){
    grunt.file.defaultEncoding = 'utf8';
    excludePath = function(path , arrays){
        for(var key in arrays){
          if(path.indexOf(key) > 0){
            return true;
          }else{
            return false;
          }
        }
    };
    config = this.data;
    indexFiles = grunt.file.expand(config.src);
    fileContent = '';
    indexFiles.forEach(function(file){
      fileName = file.split('/')[file.split('/').length-1];
      modelName = file.split('/')[1];
      if(!excludePath(file,config.exclude)){
        file = '@import   "styles/' + fileName + '";\n';
        fileContent += file;
        grunt.log.oklns(file);
      }
      grunt.file.write(config.dest.replace('@@@',modelName),fileContent);
    });
  });

  //load the extends about grunt
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-imagemin');

  //run task
  grunt.registerTask('dev',['clean:build','loadscss','copy:main','sass','concat','clean:release','clean:end']);

  //this task about image
  grunt.registerTask('img',['imagemin']);
};