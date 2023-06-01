/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors');

module.exports = {
    content  : [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    important: true,
    purge    : [
        "./src/**/*.ts",
        "./src/**/*.js",
        "./src/**/*.jsx",
        "./src/**/*.tsx",
        "./index.html",
    ],
    theme    :
        {
            extend: {
                colors: {
                    transparent : 'transparent',
                    'app'       :
                        '#f2f2f2',
                    'app-dark'  :
                        '#333333',
                    'app-dark-t':
                        '#2c2c2c',
                    'app-t'     :
                        '#d6d6d6',
                },
                width : { '[300px]': '300px' },
                height: { '[370px]': '370px' },
            }
            ,
        }
    ,
    plugins: [],
}

