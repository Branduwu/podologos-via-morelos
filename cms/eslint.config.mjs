import studio from '@sanity/eslint-config-studio'

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
