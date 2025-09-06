import { createInertiaApp } from '@inertiajs/react';
import createServer from '@inertiajs/react/server';
import ReactDOMServer from 'react-dom/server';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createServer((page) =>
    createInertiaApp({
        page,
        render: ReactDOMServer.renderToString,
        title: (title) => (title ? `${title} - ${appName}` : appName),
        resolve: (name) => {
            if (name.includes('/')) {
                const [module, ...pageParts] = name.split('/');
                const page = pageParts.join('/');
                const modulePath = `../../app/Modules/${module}/Interface/Views/${page}.tsx`;
    
                const moduleFiles = import.meta.glob('../../app/Modules/**/Interface/Views/**/*.tsx', { eager: true });
                if (moduleFiles[modulePath]) {
                    return moduleFiles[modulePath];
                }
            }
    
            const pageFiles = import.meta.glob('./pages/**/*.tsx', { eager: true });
            const pagePath = `./pages/${name}.tsx`;
            return pageFiles[pagePath] || Promise.reject(`Component ${name} not found in Modules or Pages`);
        },
        setup: ({ App, props }) => {
            return <App {...props} />;
        },
    }),
);
