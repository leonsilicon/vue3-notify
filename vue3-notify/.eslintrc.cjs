const path = require('path');
const { defineConfig } = require('eslint-define-config');

module.exports = defineConfig({
	extends: require.resolve('@leonzalion/configs/eslint.cjs'),
	parserOptions: {
		project: path.resolve(__dirname, 'tsconfig.eslint.json'),
		extraFileExtensions: ['vue'],
	},
	ignorePatterns: ['vue-notifications.vue.d.ts'],
	rules: {
		'import/no-extraneous-dependencies': [
			'error',
			{
				devDependencies: true,
				packageDir: [__dirname, path.resolve(__dirname, '..')],
			},
		],
	},
	overrides: [
		{
			files: ['src'],
			rules: {
				'import/extensions': [
					'error',
					'always',
					{
						pattern: {
							vue: 'never',
						},
						ignorePackages: true,
					},
				],
			},
		},
	],
});
