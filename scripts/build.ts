import { execaCommandSync as exec } from 'execa';
import { chProjectDir, copyPackageFiles, rmDist } from 'lion-system';

chProjectDir(import.meta.url);
rmDist();
exec('vue-tsc --declaration --emitDeclarationOnly ./src/components/vue-notifications.vue', { stdio: 'inherit' });
exec('vite build', { stdio: 'inherit' });
await copyPackageFiles();
