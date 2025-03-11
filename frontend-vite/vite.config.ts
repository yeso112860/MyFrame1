import {defineConfig, loadEnv, UserConfigExport} from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite'
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({command, mode}) => {
    const env = loadEnv(mode, process.cwd());

    const commonConfig: UserConfigExport = {
        plugins: [react(), tailwindcss(),],
        resolve: {
            alias: {
                "~": path.resolve(__dirname, "src"),
            },
        },
    };

    if (command === 'serve') {
        return {
            ...commonConfig,
            server: {
                open: true,
                strictPort: true,
                proxy: {
                    // Local proxy to avoid CORS issues in dev mode
                    '/api': {
                        target: env.VITE_BACKEND_BASE_URL,
                        changeOrigin: true,
                        rewrite: (path) => {
                            return path.replace(/^\/api/, '');
                        }
                    }
                }
            }
        };
    }

    // command === 'build'
    return {
        ...commonConfig
    };
});
