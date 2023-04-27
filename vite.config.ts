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
    base: './',
    plugins: [
        react({}),
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src/'),
            '@hooks': path.resolve(__dirname, 'src/hooks/'),
            '@assets': path.resolve(__dirname, 'src/assets/'),
            '@components': path.resolve(__dirname, 'src/components/'),
            '@pages': path.resolve(__dirname, 'src/pages/'),
            '@UI': path.resolve(__dirname, 'src/UI/'),
            '@utils': path.resolve(__dirname, 'src/utils/')
        },
        extensions: ['.js', '.ts', '.tsx', '.jsx'],
    },
});

