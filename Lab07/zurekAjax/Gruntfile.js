module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-contrib-rename');
    grunt.initConfig({
        compress: {
            main: {
                options: {
                    archive: 'zurek.zip'
                },
                files: [{
                    src: ['package.json', 'bower.json', 'Gruntfile.js', 'serwer.js', 'public/**', 'db/*']
                }]
            }
        },
        rename: {
            main: {
               files: [
                           {src: ['zurek.zip'], dest: 'zurek.pdf'},
                  ]
            }
         }    });
    grunt.registerTask('default', ['compress', 'rename']);

};
