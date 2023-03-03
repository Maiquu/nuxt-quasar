<!--
Get your module up and running quickly.

Find and replace all on all files (CMD+SHIFT+F):
- Name: Quasar Nuxt
- Package name: nuxt-quasar-ui
- Description: Quasar Integration for Nuxt
-->

# Quasar Nuxt

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]

> Quasar Integration for Nuxt

- [✨ &nbsp;Release Notes](/CHANGELOG.md)
<!-- - [📖 &nbsp;Documentation](https://example.com) -->

## Features

- TODO

## Quick Setup

1. Add `nuxt-quasar-ui` dependency to your project

```bash
# Using pnpm
pnpm add -D nuxt-quasar-ui

# Using yarn
yarn add --dev nuxt-quasar-ui

# Using npm
npm install --save-dev nuxt-quasar-ui
```

2. Add `nuxt-quasar-ui` to the `modules` section of `nuxt.config.ts`

```js
export default defineNuxtConfig({
  modules: [
    'nuxt-quasar-ui'
  ]
})
```

That's it! You can now use Quasar Nuxt in your Nuxt app ✨

## Development

```bash
# Install dependencies
npm install

# Generate type stubs
npm run dev:prepare

# Develop with the playground
npm run dev

# Build the playground
npm run dev:build

# Run ESLint
npm run lint

# Run Vitest
npm run test
npm run test:watch

# Release new version
npm run release
```

<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/nuxt-quasar-ui/latest.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-version-href]: https://npmjs.com/package/nuxt-quasar-ui

[npm-downloads-src]: https://img.shields.io/npm/dm/nuxt-quasar-ui.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-downloads-href]: https://npmjs.com/package/nuxt-quasar-ui

[license-src]: https://img.shields.io/npm/l/nuxt-quasar-ui.svg?style=flat&colorA=18181B&colorB=28CF8D
[license-href]: https://npmjs.com/package/nuxt-quasar-ui
