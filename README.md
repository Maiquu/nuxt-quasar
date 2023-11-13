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

## Quick Setup

1. Add `nuxt-quasar-ui` dependency to your project

```bash
# Using pnpm
pnpm add quasar @quasar/extras
pnpm add -D nuxt-quasar-ui

# Using yarn
yarn add quasar @quasar/extras
yarn add --dev nuxt-quasar-ui

# Using npm
npm install quasar @quasar/extras
npm install --save-dev nuxt-quasar-ui
```

2. Add `nuxt-quasar-ui` to the `modules` section of `nuxt.config.ts`

```js
export default defineNuxtConfig({
  modules: [
    'nuxt-quasar-ui'
  ],
  quasar: { /* */ }
})
```

That's it! You can now use Quasar Nuxt in your Nuxt app ✨

## Demo

[StackBlitz](https://stackblitz.com/edit/github-g9bzsz?file=nuxt.config.ts)

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

### plugins
- Type: `string[]`
- Default: `[]`

List of quasar plugins to apply. (`Dialog`, `Notify` etc.)

### sassVariables
- Type: `boolean | string`
- Default: `false`

Enables usage of Quasar Sass/SCSS variables.
Can optionally be a string which points to a file that contains the variables.

> Requires `sass` installed.

### quietSassWarnings
- Type: `boolean`
- Default: `true`

Quasar is pinned to a specific version (1.32.12) of sass, which is causing deprecation warnings, polluting the console log when running Nuxt.
Enabling this option silences these deprecation warnings.

### lang
- Type: `string`
- Default: `'en-US'`

Default language pack used by Quasar Components.

### iconSet
- Type: `string | QuasarIconSet`
- Default: `'material-icons'`

Icon set used by Quasar Components. Should also be included in `extra.fontIcons` to take effect.

### cssAddon
- Type: `boolean`
- Default: `false`

When enabled, it provides breakpoint aware versions for all flex (and display) related CSS classes.

> Requires `sass` installed.

> **Warning**
> Note that there will be a noticeable bump in CSS footprint when enabling it. So only do it if you really need it.

### config
- Type: `object`
- Default: `{}`

Configurate default settings of UI related plugins and directives (`Dialog`, `Ripple` etc).

### config.brand
- Type: `object`
- Default: `{}`

Modify css variables used by Quasar. Alternative to `sassVariables`.
This option basicly appends a css file with variables defined at root level.

### extras.font
- Type: `'roboto-font' | 'roboto-font-latin-ext' | null`
- Default: `null`

Requires `@quasar/extras`.

### extras.fontIcons
- Type: `string[]`
- Default: `[]`

Import webfont icon sets provided by `@quasar/extras`.

### extras.svgIcons
- Type: `string[]`
- Default: `[]`

Auto-import svg icon sets provided by `@quasar/extras`.

### extras.animations
- Type: `string[] | "all"`
- Default: `[]`

Import animations provided by `@quasar/extras`.

### components.defaults
- Type: `object`
- Default: `{}`

> **Experimental**

Set default prop values for quasar components. Uses [magicast](https://github.com/unjs/magicast) to modify component prop definitions.
Does not support props that accepts function values.

### components.deepDefaults
- Type: `boolean`
- Default: `false`

> **Experimental**

When `true`, defaults will be applied to components that aren't used directly.
For example, if defaults for `QBtn` are set, it will affect all components that use `QBtn`. (For example: `QBtnDropdown`, `QEditor`)

Currently not very stable in development environment since vite will set `Cache-Control` headers for files located in `node_modules`
and changes made may not take effect without resetting the cache.

## CSS Import Ordering


Module will import css in following order:

1) Fonts
2) Icons
3) Animations
4) Quasar CSS
5) Brand

It is possible to change this order via `css` option.

### Example

```js
export default defineNuxtConfig({
  css: [
    // ...
    'quasar/fonts',
    'quasar/animations',
    'quasar/icons',
    'quasar/css',
    'quasar/brand' // If config.brand is used
    // ...
  ]
})
```


## Notes

Avoid using quasar plugins and composables that manipulate `<meta>` tags.
Use [`useHead`](https://nuxt.com/docs/api/composables/use-head) instead.

List of known plugins/composables that do this:
- [`AddressbarColor`](https://quasar.dev/quasar-plugins/addressbar-color)
- [`Meta`](https://quasar.dev/quasar-plugins/meta)
- [`useMeta`](https://quasar.dev/vue-composables/use-meta)


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
```

<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/nuxt-quasar-ui/latest.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-version-href]: https://npmjs.com/package/nuxt-quasar-ui

[npm-downloads-src]: https://img.shields.io/npm/dm/nuxt-quasar-ui.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-downloads-href]: https://npmjs.com/package/nuxt-quasar-ui

[license-src]: https://img.shields.io/npm/l/nuxt-quasar-ui.svg?style=flat&colorA=18181B&colorB=28CF8D
[license-href]: https://npmjs.com/package/nuxt-quasar-ui
