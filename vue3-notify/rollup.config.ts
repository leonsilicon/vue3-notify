import vue from '@vitejs/plugin-vue';
import distGitkeep from 'rollup-plugin-dist-gitkeep';
import postcss from 'rollup-plugin-postcss';
import jsImports from 'vite-plugin-js-imports';
import { defineConfig } from 'rollup';
import path from 'node:path';
import alias from '@rollup/plugin-alias';
import depsExternal from 'rollup-plugin-deps-external';

export default defineConfig({
	plugins: [
		alias({
			entries: {
				'~': path.join(__dirname, './src'),
			},
		}),
		depsExternal(),
		vue({ reactivityTransform: true }),
		postcss(),
		jsImports(),
		distGitkeep(),
		vueTsc(),
	],
	input: path.join(__dirname, './src/index.ts'),
	output: {
		dir: path.join(__dirname, './dist'),
	},
});
