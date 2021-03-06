'use strict';

/* globals module */

module.exports = function(grunt) {

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        concat: {
            options: {
                stripBanners: false,
                banner: '/*!\n' +
                        ' * Built on <%= grunt.template.today("yyyy-mm-dd") %>\n' +
                        ' */\n\n' +
                        '\'use strict\';\n\n',
                process: function (src) {
                    return src.split('\n').splice(4).join('\n');
                }
            },
            build: {
                files: [
                    {
                        src: [
                            'js/main/core.js',
                            'js/main/main.js',
                            'js/main/init.js',
                            'js/main/runtime.js',
                            'js/main/messages.js',
                            'js/main/directories.js',
                            'js/main/images.js',
                            'js/main/events.js',
                            'js/main/buttons.js',
                            'js/main/ticks.js',
                            'js/main/ui.js',
                            'js/main/run.js'
                        ],
                        dest: 'extension/js/extension.js'
                    },
                    {
                        src: [
                            'js/main/core.js',
                            'js/main/main.js',
                            'js/main/init.js',
                            'js/main/runtime.js',
                            'js/main/messages.js',
                            'js/main/ui.js',
                            'js/background/checkboxes.js',
                            'js/background/directories.js',
                            'js/background/events.js',
                            'js/background/updates.js',
                        ],
                        dest: 'extension/js/support.js'
                    },
                    {
                        src: [
                            'js/main/main.js',
                            'js/main/messages.js',
                            'js/background/updates.js',
                            'js/background/notifications.js',
                            'js/pages/background.js'
                        ],
                        dest: 'extension/js/background.js'
                    }
                ]
            }
        },

        uglify: {
            options: {
                mangle: {
                    sort: false,
                    toplevel: false,
                    eval: false
                },
                compress: {
                    sequences: false,
                    properties: true,
                    dead_code: true,
                    drop_debugger: true,
                    unsafe: false,
                    conditionals: false,
                    comparisons: true,
                    evaluate: false,
                    booleans: true,
                    loops: false,
                    unused: true,
                    hoist_funs: false,
                    hoist_vars: false,
                    if_return: false,
                    join_vars: true,
                    cascade: false,
                    warnings: true,
                    negate_iife: false,
                    pure_getters: false,
                    pure_funcs: false,
                    drop_console: true,
                },
                beautify: false,
                report: false,
                sourceMap: false,
                wrap: false,
                preserveComments: false
            },
            build: {
                files: [
                    {
                        expand: true,
                        src: [
                            'extension/js/*.js'
                        ],
                        ext: '.js'
                    }
                ]
            }
        },

        'json-minify': {
            build: {
                files: 'extension/**/*.json'
            }
        },

        sass: {
            options: {
                style: 'compressed',
                precision: 3,
                noCache: true
            },
            build: {
                files: [
                    {
                        expand: true,
                        src: [
                            'sass/*.scss',
                            '!sass/vars.scss',
                            '!sass/dialog.scss',
                            '!sass/normalize.scss'
                        ],
                        flatten: true,
                        dest: 'extension/css/',
                        ext: '.css'
                    }
                ]
            }
        },

        slim :{
            options: {
                pretty: false
            },
            build: {
                files: [
                    {
                        expand: true,
                        src: [
                            'slim/*.slim',
                            '!slim/*.include.slim'
                        ],
                        flatten: true,
                        dest: 'extension/html/',
                        ext: '.html'
                    }
                ]
            }
        },

        copy: {
            javascript: {
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: [
                            'js/pages/*.js',
                            '!js/pages/background.js'
                        ],
                        dest: 'extension/js/',
                        filter: 'isFile'
                    }
                ]
            },
            misc: {
                files: [
                    {
                        expand: true,
                        src: [
                            'img/icon*.png',
                            '_locales/*/*',
                            'updates.json',
                            'manifest.json'
                        ],
                        dest: 'extension/',
                        filter: 'isFile'
                    }
                ]
            }
        },

        watch: {
            options: {
                spawn: false
            },
            all: {
                files: [
                    '*',
                    '**/*'
                ],
                tasks: 'development'
            },
            javascript: {
                files: [
                    'js/*.js',
                    'js/**/*.js'
                ],
                tasks: [
                    'concat',
                    'copy:javascript'
                ]
            },
            sass: {
                files: ['**/*.scss'],
                tasks: 'sass'
            },
            slim: {
                files: ['**/*.slim'],
                tasks: 'slim'
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-slim');
    grunt.loadNpmTasks('grunt-json-minify');

    grunt.registerTask('development', [
        'concat',
        'sass',
        'slim',
        'copy'
    ]);

    grunt.registerTask('production', [
        'concat',
        'sass',
        'slim',
        'copy',
        'json-minify',
        'uglify'
    ]);

};
