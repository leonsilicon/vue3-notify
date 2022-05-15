import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
import WindiCSS from 'vite-plugin-windicss';

// https://vitejs.dev/config/
export default defineConfig({
	base: '/vue3-notify/',
	plugins: [
		vue({
			reactivityTransform: true,
		}),
		WindiCSS(),
	],
});
