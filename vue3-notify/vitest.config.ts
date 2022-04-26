import vue from '@vitejs/plugin-vue';
import { join } from 'desm';
import jsImports from 'vite-plugin-js-imports';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [vue({ reactivityTransform: true }), jsImports()],
	resolve: {
		alias: {
			'~': join(import.meta.url, 'src'),
		},
	},
	test: {
		environment: 'happy-dom',
	},
});
