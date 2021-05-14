module.exports = {
	root: true,
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 2018,
		sourceType: 'module',
	},
	env: {
		browser: true,
	},
	rules: {
		'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		'react/prop-types': 'off',
		'react/sort-comp': 'off',
		'react/jsx-filename-extension': 'off',
		'react/prefer-stateless-function': 'off',
		 'react/react-in-jsx-scope':'off'
	},
	parser: 'babel-eslint',
   // plugin:prettier/recommended 配合vscode进行保存自动格式
	extends: [
        "airbnb",
        "plugin:prettier/recommended"
    ]
};
