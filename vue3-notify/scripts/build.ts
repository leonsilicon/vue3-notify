import alias from '@rollup/plugin-alias';
import typescript from '@rollup/plugin-typescript';
import vue from '@vitejs/plugin-vue';
import { execaCommandSync as exec } from 'execa';
import {
	chProjectDir,
	copyPackageFiles,
	getProjectDir,
	rmDist,
} from 'lion-system';
import * as fs from 'node:fs';
import path from 'node:path';
import { rollup } from 'rollup';
import depsExternal from 'rollup-plugin-deps-external';
import distGitkeep from 'rollup-plugin-dist-gitkeep';
import postcss from 'rollup-plugin-postcss';
import jsImports from 'vite-plugin-js-imports';

chProjectDir(import.meta.url);
const projectDir = getProjectDir(import.meta.url);
rmDist();
exec(
	'vue-tsc --declaration --emitDeclarationOnly ./src/components/vue-notifications.vue',
	{ stdio: 'inherit' }
);

// Bundle the .vue files
const bundle = await rollup({
	plugins: [
		alias({
			entries: {
				'~': path.join(projectDir, './src'),
			},
		}),
		depsExternal(),
		vue({ reactivityTransform: true }),
		postcss(),
		jsImports(),
		distGitkeep(),
		typescript(),
	],
	input: './src/components/vue-notifications.vue',
	output: {
		file: path.join(projectDir, './src/components/vue-notifications.vue.js'),
	},
});
const result = await bundle.generate({ format: 'esm' });
fs.writeFileSync(
	'./src/components/vue-notifications.vue.js',
	result.output[0].code
);

exec('tsc');
exec('tsc-alias');

fs.rmSync('./src/components/vue-notifications.vue.d.ts', { force: true });
fs.rmSync('./src/components/vue-notifications.vue.js', { force: true });
await copyPackageFiles();
