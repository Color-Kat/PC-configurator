// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react-swc'
//
// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })

import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react-swc';
import * as path from "path";

export default defineConfig({
    build: {
        outDir: path.join(__dirname, "public"),

    },
    plugins: [
        react({}),
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'resources/js'),
            '@hooks': path.resolve(__dirname, 'resources/js/hooks'),
            '@assets': path.resolve(__dirname, 'resources/js/assets/'),
            '@components': path.resolve(__dirname, 'resources/js/components')
        },
        extensions: ['.js', '.ts', '.tsx', '.jsx'],
    },
});

