import vue from '@vitejs/plugin-vue';
import { join } from 'desm';
import distGitkeep from 'rollup-plugin-dist-gitkeep';
import postcss from 'rollup-plugin-postcss';
import dts from 'vite-plugin-dts';
import jsImports from 'vite-plugin-js-imports';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [
		vue({ reactivityTransform: true }),
		postcss({ }),
		jsImports(),
		dts(),
		distGitkeep(),
	],
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
			formats: ['es', 'cjs'],
			fileName: (format) => (format === 'cjs' ? 'index.cjs' : 'index.js'),
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
