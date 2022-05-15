import { compileVueSFC } from 'compile-vue-sfc';
import { join } from 'desm';
import { execaCommandSync as exec } from 'execa';
import { chProjectDir, copyPackageFiles, rmDist } from 'lion-system';

chProjectDir(import.meta.url);
rmDist();

await compileVueSFC({
	declarations: true,
	outDir: 'dist',
	projectRootPath: join(import.meta.url, '../src'),
	files: join(import.meta.url, '../src/components/*.vue'),
});

exec('tsc');
exec('tsc-alias');

await copyPackageFiles();
