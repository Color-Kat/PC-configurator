/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors')

module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    important: true,
    purge  : [
        "./src/**/*.ts",
        "./src/**/*.js",
        "./src/**/*.jsx",
        "./src/**/*.tsx",
        "./index.html",
    ],
    theme  :
        {
            extend: {
                colors: {
                    transparent : 'transparent',
                    'app'       :
                        '#1a1a1d',
                    'app-dark'  :
                        '#0f0f0f',
                    'app-accent':
                        '#ff3442',
                    'app-gray'  :
                        '#777777',
                    'app-light' :
                        '#f1f1f1',
                },
                width: {'[300px]' : '300px'},
                height: {'[370px]' : '370px'},
            }
            ,
        }
    ,
    plugins: [],
}

