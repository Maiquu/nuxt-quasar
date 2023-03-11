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
- Configure [Sass/Scss variables](https://quasar.dev/style/sass-scss-variables) used by `quasar`
- [Nuxt DevTools](https://devtools.nuxtjs.org/) support

## Prerequisites

Following modules are not installed with `nuxt-quasar-ui`

- [`quasar`](https://quasar.dev/)
- [`@quasar/extras`](https://github.com/quasarframework/quasar/tree/dev/extras) (Optional: required for using `extras`)
- `sass@1.32.12` (Optional: required for using `sassVariables`)

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

> See detailed usage at [playground](https://github.com/Maiquu/nuxt-quasar/tree/main/playground)

## Options

```js
export default defineNuxtConfig({
  modules: [
    'nuxt-quasar-ui'
  ],
  quasar: {
    // Plugins: https://quasar.dev/quasar-plugins
    plugins: []
    // Truthy values requires `sass@1.32.12`.
    sassVariables: false
    // Requires `@quasar/extras` package
    extras: {
      // string | null: Auto-import roboto font. https://quasar.dev/style/typography#default-font
      font: null,
      // string[]: Auto-import webfont icons. Usage: https://quasar.dev/vue-components/icon#webfont-usage
      fontIcons: []
      // string[]: Auto-import svg icon collections. Usage: https://quasar.dev/vue-components/icon#svg-usage
      svgIcons: [],
      // string[]: Auto-import animations from 'animate.css'. Usage: https://quasar.dev/options/animations#usage  
      animations: [],
    }
  }
})
```
## Regarding Meta tags
Avoid using quasar plugins and composables that manipulate `<meta>` tags.
Use [`useHead`](https://nuxt.com/docs/api/composables/use-head) instead.

List of known plugins/composables that do this:
- [`AddressbarColor`](https://quasar.dev/quasar-plugins/addressbar-color)
- [`Meta`](https://quasar.dev/quasar-plugins/meta)
- [`useMeta`](https://quasar.dev/vue-composables/use-meta)

## Limitations
List of (known) plugins that does not work with SSR (excluding ones listed obove):
- [`Dark`](https://quasar.dev/quasar-plugins/dark)

## Regarding component icons

By default, icons are not packaged with `quasar` module.
You will have to install `@quasar/extras` and append `'material-icons'` to `fontIcons` in your `nuxt.config.ts` file for icons to take effect.

```ts 
// nuxt.config.ts
export default {
  quasar: {
    extras: {
      fontIcons: ['material-icons']
    }
  }
}

```

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
