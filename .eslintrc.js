module.exports = {
	env: {
		browser: true,
		es2020: true,
		node: true,
		jest: true,
	},
	extends: [
		'plugin:react/recommended',
		'airbnb',
	],
	settings: {
		'import/resolver': {
			node: {
				extensions: ['.js', '.jsx', '.ts', '.tsx'],
				paths: ['./src'],
			},
		},
	},
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 11,
		sourceType: 'module',
	},
	plugins: [
		'react',
		'@typescript-eslint',
	],
	rules: {
		'react/require-default-props': 'off',
		'react/prop-types': 'off',
		camelcase: 'off',
		indent: [2, 'tab'],
		'react/jsx-indent': [2, 'tab'],
		'react/jsx-indent-props': [2, 'tab'],
		'no-tabs': 'off',
		'import/no-unresolved': 'warn',
		'object-curly-spacing': 'off',
		'react/jsx-filename-extension': [1, {extensions: ['.tsx']}],
		'import/extensions': 'off',
		'no-unused-vars': 'off',
		'@typescript-eslint/no-unused-vars': ['error', {vars: 'all', args: 'after-used', ignoreRestSiblings: false}],
		'react/jsx-props-no-spreading': 'off',
		'no-autofocus': 'off',
		'max-len': ['error', {code: 120}],
		'no-underscore-dangle': 'off',
		'jsx-a11y/label-has-associated-control': [2, {assert: 'either', depth: 25}],
	},
};

/*
	env — позволяет задавать список сред, код для которых планируется проверять.
	В нашем случае тут имеются свойства es6, browser и node, установленные в true.
	Параметр es6 включает возможности ES6 за исключением модулей (эта возможность автоматически устанавливает,
	в блоке parserOptions, параметр ecmaVersion в значение 6). Параметр browser подключает глобальные
	переменные браузера, такие, как Windows.
	Параметр node добавляет глобальные переменные среды Node.js и области видимости, например — global.

	extends — представляет собой массив строк с конфигурациями, при этом каждая дополнительная конфигурация
	расширяет предыдущую. Здесь используются правила линтинга airbnb.

	plugins — тут представлены правила линтинга, которые мы хотим использовать. У нас применяются правила
	babel, import, jsx-a11y, react, prettier, о которых мы уже говорили.

	parser — по умолчанию ESLint использует синтаксический анализатор Espree, но, так как мы работаем
	с Babel, нам надо пользоваться Babel-ESLint.

	parserOptions — так как мы изменили стандартный синтаксический анализатор на babel-eslint, нам
	необходимо задать и свойства в этом блоке. Свойство ecmaVersion, установленное в значение 6,
	указывает ESLint на то, что проверяться будет ES6-код. Так как код мы пишем в EcmaScript-модулях,
	свойство sourceType установлено в значение module. И, наконец, так как мы используем React,
	что означает применение JSX, то в свойство ecmaFeatures записывается объект с ключом jsx,
	установленным в true.

	rules — эта часть файла .eslintrc.js нравится мне больше всего, так как она позволяет
	настраивать правила ESLint. Все правила, которые мы расширили или добавили с помощью плагинов,
	можно менять или переопределять, и делается это именно в блоке rules. В тексте файла имеются
	комментарии к правилам.
 */
