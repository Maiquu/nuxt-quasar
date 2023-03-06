![Quasar Framework logo](https://cdn.quasar.dev/logo-v2/header.png)

# [Quasar](https://quasar.dev/) Module for [Nuxt](https://nuxt.com/)

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]

- [✨ &nbsp;Release Notes](/CHANGELOG.md)
<!-- - [📖 &nbsp;Documentation](https://example.com) -->

## Features

- Automatically import [components](https://quasar.dev/vue-components)
- Automatically import [directives](https://quasar.dev/vue-directives)
- Automatically import svg icon sets provided by [`@quasar/extras`](https://github.com/quasarframework/quasar/tree/dev/extras)
- Configure used [animations](https://animate.style/), [webfonts and icon sets via](https://github.com/quasarframework/quasar/tree/dev/extras) `nuxt.config`
- Configure [Sass/Scss variables](https://quasar.dev/style/sass-scss-variables) used by `quasar` (Requires `sass@1.32.12`)
- [Nuxt DevTools](https://devtools.nuxtjs.org/) support

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

## Usage

```vue
<template>
  <q-btn color="primary" label="Primary" />
  <QBtn color="secondary" label="Secondary" />
  <LazyQBtn color="amber" glossy label="Amber" />
</template>
```

## Options

```js
export default defineNuxtConfig({
  modules: [
    'nuxt-quasar-ui'
  ],
  quasar: {
    // Plugins: https://quasar.dev/quasar-plugins
    plugins: []
    // Truthy values requires `sass@1.32.12`
    sassVariables: false
    // Requires `@quasar/extras` package
    extras: {
      font: null,
      fontIcons: []
      svgIcons: [],
      animations: [],
    }
  }
})
```

## Known issues
- SSR Hydration errors on several components

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
