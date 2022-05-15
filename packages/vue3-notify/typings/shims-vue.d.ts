declare module '*.vue.js' {
	import type { DefineComponent } from 'vue';

	// eslint-disable-next-line @typescript-eslint/ban-types
	const component: DefineComponent<{}, {}, any>;
	export default component;
}