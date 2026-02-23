let studio = []
try {
  const module = await import('@sanity/eslint-config-studio')
  studio = module.default || module
} catch {
  studio = []
}

export default [
  ...studio,
  {
    files: ['**/*.{js,mjs,jsx,ts,tsx}'],
    languageOptions: {
      globals: {
        URL: 'readonly',
        console: 'readonly',
        process: 'readonly',
      },
    },
    rules: {
      'react/prop-types': 'off',
    },
  },
]
