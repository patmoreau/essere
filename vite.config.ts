import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

const config = () => {
  return {
    name: 'serve-local-config',
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    configureServer(server: any) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      server.middlewares.use(async (req: any, res: any, next: any) => {
        if (req.url === '/config.json') {
          const content = await import('./env/prod/config.json');
          const localConfig = {
            ...content.default,
            // Use Vite proxy in local dev to keep API calls same-origin.
            DIRECTUS_URL: 'http://localhost:5173/directus/',
          };
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(localConfig));
        } else {
          next();
        }
      });
    },
  };
};

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), config()],
  server: {
    proxy: {
      '/directus': {
        target: 'https://essere.ca',
        changeOrigin: true,
        secure: true,
      },
    },
  },
});
