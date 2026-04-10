// @ts-check
import eslintConfigPrettier from 'eslint-config-prettier'
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(eslintConfigPrettier, {
  ignores: [
    '**/node_modules/**',
    '.nuxt/**',
    '.output/**',
    'dist/**',
    'coverage/**',
    '.api-docs-html/**',
    'pnpm-lock.yaml',
    '*.min.*'
  ]
})
