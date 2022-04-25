import vue from '@vitejs/plugin-vue';
import { join } from 'desm';
import dts from 'vite-plugin-dts';
import jsImports from 'vite-plugin-js-imports';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [vue({ reactivityTransform: true }), jsImports(), dts()],
	resolve: {
		alias: {
			'~': join(import.meta.url, './src'),
			'~test': join(import.meta.url, './test'),
		},
	},
	build: {
		lib: {
			entry: join(import.meta.url, './src/index.ts'),
			name: 'VueNotifications',
			formats: ['es'],
			fileName: 'vue-notifications',
		},
		rollupOptions: {
			external: ['vue'],
			output: {
				globals: {
					vue: 'Vue',
				},
			},
		},
	},
	test: {
		environment: 'happy-dom',
	},
});
