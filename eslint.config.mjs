import { dirname } from 'path';
import { fileURLToPath } from 'url';

import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends(
    'next/core-web-vitals',
    'next/typescript',
    'standard',
    'plugin:tailwindcss/recommended',
    'prettier'
  ),
  ...compat.plugins('import'),
  {
    rules: {
      'no-undef': 'off',
      'import/order': [
        'error',
        {
          groups: [
            'builtin', // Built-in types are first
            'external', // External libraries
            'internal', // Internal modules
            ['parent', 'sibling'], // Parent and sibling types can be mingled together
            'index', // Then the index file
            'object', // Object imports
          ],
          'newlines-between': 'always',
          pathGroups: [
            {
              pattern: '@app/**',
              group: 'external',
              position: 'after',
            },
          ],
          pathGroupsExcludedImportTypes: ['builtin'],
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
    },
  },
  {
    ignores: ['components/ui/**'],
    files: ['*.ts', '*.tsx', '*.mjs'],
    rules: {
      'no-undef': 'off',
    },
  },
];

export default eslintConfig;
