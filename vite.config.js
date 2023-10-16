import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';

export default defineConfig({
    plugins: [
        laravel({
            input: [
                'resources/js/app.js',
                'resources/js/pages/home.js',
                'resources/js/pages/vocab.js',
            ],
            refresh: true,
        }),
    ],
    server: { 
        hmr: {
            host: 'localhost',
        },
    }, 
});
