import { wayfinder } from '@laravel/vite-plugin-wayfinder';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';
import { defineConfig } from 'vite';
import fs from 'fs';
import path from 'path';

function findModuleViews(baseDir: string) {
    const modulesPath = path.resolve(__dirname, baseDir);
    const modules = fs.readdirSync(modulesPath);
    const views = [];
    modules.forEach(module => {
      const viewDir = path.join(modulesPath, module, 'view');
      if (fs.existsSync(viewDir)) {
        fs.readdirSync(viewDir).forEach(file => {
          if (file.endsWith('.jsx') || file.endsWith('.tsx')) {
            views.push(`app/Modules/${module}/Interface/Views/${file}` as never);
          }
        });
      }
    });
    return views;
}

const moduleViews = findModuleViews('app/Modules');

export default defineConfig({
    plugins: [
        laravel({
            input: [
                'resources/css/app.css', 
                'resources/js/app.tsx',
                ...moduleViews,
            ],
            ssr: 'resources/js/ssr.tsx',
            refresh: true,
        }),
        react(),
        tailwindcss(),
        wayfinder({
            formVariants: true,
        }),
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './resources/js'),
            ...Object.fromEntries(
                fs.readdirSync(path.resolve(__dirname, 'app/Modules')).map(module => [
                  `@${module.toLowerCase()}`,
                  `/app/Modules/${module}/Interface/Views`,
                ])
            ),
        },
    },
    esbuild: {
        jsx: 'automatic',
    },
});
