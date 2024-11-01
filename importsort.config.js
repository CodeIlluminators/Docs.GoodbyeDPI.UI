module.exports = {
	'.js': {
		parser: 'babylon',
		style: 'module',
		options: {
			groups: [
				// Group 1: Built-in node modules
				['^node:'],
				// Group 2: External packages
				['^@?\\w'],
				// Group 3: Internal aliases (e.g., @src, @components)
				['^@src', '^@components'],
				// Group 4: Parent imports (e.g., ../..)
				['^\\.\\.(?!/?$)', '^\\.\\./?$'],
				// Group 5: Sibling imports (e.g., ./file)
				['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
				// Group 6: Style imports
				['^.+\\.s?css$'],
			],
		},
	},
	'.ts': {
		parser: 'typescript',
		style: 'module',
		options: {
			groups: [
				// Group 1: Built-in node modules
				['^node:'],
				// Group 2: External packages
				['^@?\\w'],
				// Group 3: Internal aliases (e.g., @src, @components)
				['^@src', '^@components'],
				// Group 4: Parent imports (e.g., ../..)
				['^\\.\\.(?!/?$)', '^\\.\\./?$'],
				// Group 5: Sibling imports (e.g., ./file)
				['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
				// Group 6: Style imports
				['^.+\\.s?css$'],
			],
		},
	},
};
