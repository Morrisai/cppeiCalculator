module.exports = function( grunt ) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON( 'package.json' ),


      watch: {
          html: {
            files: ['**/*.html','**/*.css','**/*.js'],           
            options: {
              livereload: true,
            },
          },
        },

   

    });


 
    grunt.loadNpmTasks('grunt-contrib-watch');

  
    
    grunt.registerTask('default', ['watch']);

    // Deploy using require js compile
   /// grunt.registerTask( 'deploy', [ 'shell:browserify' , 'copy:dist', 'regex-replace:distIndex', 'rsync:pushStaging'  ]);
    //grunt.registerTask( 'deploy:prod', [ 'shell:browserify' , 'copy:distProd', 'pngmin', 'regex-replace:distIndex', 'regex-replace:prodReplace', 'rsync:pushProd'  ]);

};