import { compileVueSFC } from 'compile-vue-sfc';
import { join } from 'desm';
import { execaCommandSync as exec } from 'execa';
import { chProjectDir, copyPackageFiles, rmDist } from 'lion-system';
import * as fs from 'node:fs';

chProjectDir(import.meta.url);
rmDist();

await compileVueSFC({
	declarations: true,
	write: true,
	files: join(import.meta.url, '../src/components/*.vue'),
});

exec('tsc');
exec('tsc-alias');

fs.rmSync('./src/components/vue-notifications.vue.d.ts', { force: true });
fs.rmSync('./src/components/vue-notifications.vue.js', { force: true });

await copyPackageFiles();
