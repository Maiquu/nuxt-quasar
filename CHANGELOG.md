# Changelog

## v2.0.3

[compare changes](https://github.com/Maiquu/nuxt-quasar/compare/v2.0.2...v2.0.3)


### 🩹 Fixes

  - Using quasar sass variables from SFC ([6570562](https://github.com/Maiquu/nuxt-quasar/commit/6570562))
  - Variables not being overridden in production environments with SSR enabled ([6570562](https://github.com/Maiquu/nuxt-quasar/commit/6570562))
  - Unresolved virtual css when `experimental.inlineSSRStyles` is `true`, closes #66 ([#66](https://github.com/Maiquu/nuxt-quasar/issues/66))

### 📖 Documentation

  - Component defaults ([1851867](https://github.com/Maiquu/nuxt-quasar/commit/1851867))
  - Rephrase ([e63de9c](https://github.com/Maiquu/nuxt-quasar/commit/e63de9c))
  - Comments ([f530f4a](https://github.com/Maiquu/nuxt-quasar/commit/f530f4a))

### ❤️  Contributors

- Ege İliklier ([@Maiquu](http://github.com/Maiquu))

## v2.0.2

[compare changes](https://github.com/Maiquu/nuxt-quasar/compare/v2.0.1...v2.0.2)


### 🩹 Fixes

  - `isFontIconSet` typo ([6e93721](https://github.com/Maiquu/nuxt-quasar/commit/6e93721))

### ❤️  Contributors

- Ege İliklier ([@Maiquu](http://github.com/Maiquu))

## v2.0.1

[compare changes](https://github.com/Maiquu/nuxt-quasar/compare/v2.0.0...v2.0.1)

### 🩹 Fixes

  - `autoIncludeIconSet` default value ([0d46524](https://github.com/Maiquu/nuxt-quasar/commit/0d46524))

### ❤️  Contributors

- Ege İliklier ([@Maiquu](http://github.com/Maiquu))

## v2.0.0

[compare changes](https://github.com/Maiquu/nuxt-quasar/compare/v2.0.0-rc.0...v2.0.0)


### 💅 Refactors

  - `defaults.ts` ([922714b](https://github.com/Maiquu/nuxt-quasar/commit/922714b))

### 🏡 Chore

  - Removed unplugin ([b334e05](https://github.com/Maiquu/nuxt-quasar/commit/b334e05))
  - Added checks, added/moved jsdoc comments ([885a4d6](https://github.com/Maiquu/nuxt-quasar/commit/885a4d6))

### ✅ Tests

  - Component defaults functionality ([cb2a99c](https://github.com/Maiquu/nuxt-quasar/commit/cb2a99c))
  - Component default e2e tests ([c56f2c5](https://github.com/Maiquu/nuxt-quasar/commit/c56f2c5))

### ❤️  Contributors

- Ege İliklier ([@Maiquu](http://github.com/Maiquu))

## v2.0.0-rc.0

[compare changes](https://github.com/Maiquu/nuxt-quasar/compare/v1.7.4...v2.0.0-rc.0)


### 🚀 Enhancements

  - Accept `iconSet` object ([3503262](https://github.com/Maiquu/nuxt-quasar/commit/3503262))
  - Auto insert selected font icon set to `extras.fontIcons` ([5316695](https://github.com/Maiquu/nuxt-quasar/commit/5316695))
  - **experimental:** Configurable component defaults ([a9fcca6](https://github.com/Maiquu/nuxt-quasar/commit/a9fcca6))

### 🔥 Performance

  - Reduced number of resolvePath calls ([1903e2c](https://github.com/Maiquu/nuxt-quasar/commit/1903e2c))

### 🩹 Fixes

  - Allow svg sets for `iconSets` option ([5d5109b](https://github.com/Maiquu/nuxt-quasar/commit/5d5109b))
  - `resolveAnimation` ([689495c](https://github.com/Maiquu/nuxt-quasar/commit/689495c))
  - Quasar resolvers ([508f48b](https://github.com/Maiquu/nuxt-quasar/commit/508f48b))

### 💅 Refactors

  - Animation list dynamically imported from extras instead of const array ([465354a](https://github.com/Maiquu/nuxt-quasar/commit/465354a))

### 📖 Documentation

  - Updated README ([56242c6](https://github.com/Maiquu/nuxt-quasar/commit/56242c6))

### 🏡 Chore

  - Updated release workflow ([5216095](https://github.com/Maiquu/nuxt-quasar/commit/5216095))
  - Update release.yml ([5038a42](https://github.com/Maiquu/nuxt-quasar/commit/5038a42))
  - Fixed version numbers due to CI error ([45bb37e](https://github.com/Maiquu/nuxt-quasar/commit/45bb37e))
  - Bumped pnpm version ([5b6e719](https://github.com/Maiquu/nuxt-quasar/commit/5b6e719))
  - Updated dependencies ([5b7b314](https://github.com/Maiquu/nuxt-quasar/commit/5b7b314))
  - ⚠️  Added `@quasar/extras` as `peerDependency` ([9150348](https://github.com/Maiquu/nuxt-quasar/commit/9150348))
  - Updated playground ([f3256cf](https://github.com/Maiquu/nuxt-quasar/commit/f3256cf))

#### ⚠️  Breaking Changes

  - ⚠️  Added `@quasar/extras` as `peerDependency` ([9150348](https://github.com/Maiquu/nuxt-quasar/commit/9150348))

### ❤️  Contributors

- Ege İliklier ([@Maiquu](http://github.com/Maiquu))

## v1.7.4

[compare changes](https://github.com/Maiquu/nuxt-quasar/compare/v1.7.3...v1.8.0)


### 🚀 Enhancements

  - `nuxtApp.$q`, close #53 ([#53](https://github.com/Maiquu/nuxt-quasar/issues/53))

### 🩹 Fixes

  - `resolveSideEffect` regexp ([a14871f](https://github.com/Maiquu/nuxt-quasar/commit/a14871f))

### 🏡 Chore

  - Updated dependencies ([427d21c](https://github.com/Maiquu/nuxt-quasar/commit/427d21c))
  - Added `packageManager` field ([1d84d8b](https://github.com/Maiquu/nuxt-quasar/commit/1d84d8b))
  - Updated workflows ([9210a12](https://github.com/Maiquu/nuxt-quasar/commit/9210a12))
  - Fix workflow errors ([dcdffea](https://github.com/Maiquu/nuxt-quasar/commit/dcdffea))

### 🎨 Styles

  - Updated eslint config, applied lint fixes ([bfe7b40](https://github.com/Maiquu/nuxt-quasar/commit/bfe7b40))

### ❤️  Contributors

- Ege İliklier ([@Maiquu](http://github.com/Maiquu))

## v1.7.3

[Compare changes](https://github.com/Maiquu/nuxt-quasar/compare/v1.7.2...v1.7.3)


### 💅 Refactors

  - ResolveSideEffect does not interfere with path resolution ([b50c3a7](https://github.com/Maiquu/nuxt-quasar/commit/b50c3a7))
  - Quasar union types are no longer hard coded ([f04d4c0](https://github.com/Maiquu/nuxt-quasar/commit/f04d4c0))

### 🏡 Chore

  - Removed release script, added changelogen script for convenience ([cc690e1](https://github.com/Maiquu/nuxt-quasar/commit/cc690e1))

### 🎨 Styles

  - Renamed prefix of resolved ids ([eacfa03](https://github.com/Maiquu/nuxt-quasar/commit/eacfa03))

### ❤️  Contributors

- Ege İliklier ([@Maiquu](http://github.com/Maiquu))

## v1.7.2

[Compare changes](https://github.com/Maiquu/nuxt-quasar/compare/v1.7.1...v1.7.2)


### 🩹 Fixes

  - **playground:** Moved models.ts to seperate directory ([bd87745](https://github.com/Maiquu/nuxt-quasar/commit/bd87745))
  - Explicitly defining moduleSideEffects at resolveId to handle tree-shaking reliably. ([971109f](https://github.com/Maiquu/nuxt-quasar/commit/971109f))

### 🏡 Chore

  - Updated dependencies ([d8e7206](https://github.com/Maiquu/nuxt-quasar/commit/d8e7206))
  - Moved plugins under seperate directory ([83470a3](https://github.com/Maiquu/nuxt-quasar/commit/83470a3))

### ❤️  Contributors

- Ege İliklier ([@Maiquu](http://github.com/Maiquu))

## v1.7.1

[Compare changes](https://github.com/Maiquu/nuxt-quasar/compare/v1.7.0...v1.7.1)


### 🩹 Fixes

  - Overriding user defined vue options ([3c2f30b](https://github.com/Maiquu/nuxt-quasar/commit/3c2f30b))

### ❤️  Contributors

- Ege İliklier ([@Maiquu](http://github.com/Maiquu))

## v1.7.0

### 🩹 Fixes

  - Tree-shaking for auto imported composables ([18502fe](https://github.com/Maiquu/nuxt-quasar/commit/18502fe))

### 📖 Documentation

  - Added cssAddon docs ([814b65e](https://github.com/Maiquu/nuxt-quasar/commit/814b65e))
  - Added requires sass label to sassVariables ([dc150d5](https://github.com/Maiquu/nuxt-quasar/commit/dc150d5))

### ✅ Tests

  - CssAddon ([c140dbe](https://github.com/Maiquu/nuxt-quasar/commit/c140dbe))

### 🎨 Styles

  - Re-ordered defaults, explicit lang default ([63cea17](https://github.com/Maiquu/nuxt-quasar/commit/63cea17))

### ❤️  Contributors

- Ege İliklier ([@Maiquu](http://github.com/Maiquu))

## v1.6.1

### 🩹 Fixes

  - Build tree-shaking ([e511ebf](https://github.com/Maiquu/nuxt-quasar/commit/e511ebf))

### 🏡 Chore

  - Updated CHANGELOG.md ([c46ea41](https://github.com/Maiquu/nuxt-quasar/commit/c46ea41))

### 🎨 Styles

  - Brace-style 1tbs ([2a9d902](https://github.com/Maiquu/nuxt-quasar/commit/2a9d902))

### ❤️  Contributors

- Ege İliklier ([@Maiquu](http://github.com/Maiquu))

## v1.6.0

### 🚀 Enhancements

  - Configurable default language pack ([69ab380](https://github.com/Maiquu/nuxt-quasar/commit/69ab380))

### ❤️  Contributors

- Maiquu ([@Maiquu](http://github.com/Maiquu))

## v1.5.0

### 🚀 Enhancements

  - Setting defaults for plugins ([7d2518a](https://github.com/Maiquu/nuxt-quasar/commit/7d2518a))
  - Brand ([4538609](https://github.com/Maiquu/nuxt-quasar/commit/4538609))

### 🔥 Performance

  - Animations loaded from single file to reduce head tag clutter ([837305e](https://github.com/Maiquu/nuxt-quasar/commit/837305e))

### 🩹 Fixes

  - Types for auto-imports via virtual entry ([e4565c4](https://github.com/Maiquu/nuxt-quasar/commit/e4565c4))

### 📖 Documentation

  - Updated README with latest changes, fixed formating ([3afb7c2](https://github.com/Maiquu/nuxt-quasar/commit/3afb7c2))

### 🏡 Chore

  - Updated playground ([1e023fb](https://github.com/Maiquu/nuxt-quasar/commit/1e023fb))

### ✅ Tests

  - Modified tests related to animations ([0952bb8](https://github.com/Maiquu/nuxt-quasar/commit/0952bb8))
  - Added brand tests ([e57621f](https://github.com/Maiquu/nuxt-quasar/commit/e57621f))

### ❤️  Contributors

  - Maiquu ([@Maiquu](http://github.com/Maiquu))

## v1.4.0

### 🚀 Enhancements

  - Animations "all" option (#25)
  - Configurable dark plugin (#27)

### ❤️  Contributors

  - Maiquu ([@Maiquu](http://github.com/Maiquu))
  - cusitosr88 ([@cusitosr88](http://github.com/cusitosr88))

## v1.3.1

### 🩹 Fixes

  - Switched to useHead for backwards compatibility (#23)

### ❤️  Contributors

  - Ege İliklier ([@Maiquu](http://github.com/Maiquu))

## v1.3.0

### 🚀 Enhancements

  - Select iconSet used by Quasar (4af1f30)
  - UseHead/ssrContext integration (#19)

### 📖 Documentation

  - Updated README to include new features (5ccda7e)

### ❤️  Contributors

  - Maiquu ([@Maiquu](http://github.com/Maiquu))

## v1.2.0

### 🚀 Enhancements

  - Added quasar types (#14)
  - Added `quietSassWarnings` option, which mutes SCSS/SASS deprecation warnings when using newer versions of `sass`

### 🏡 Chore

  - Updated dependencies (52073a5)

### ❤️  Contributors

- Maiquu ([@Maiquu](http://github.com/Maiquu))
- Jason Landbridge ([@JasonLandbridge](http://github.com/JasonLandbridge))
- Oumar Barry ([@oumarbarry](http://github.com/oumarbarry))

## v1.1.1


### 🩹 Fixes

  - Test components being imported on quasar @^2.11.8 (4b0f441)

### 📖 Documentation

  - Updated README.md based on latest changes (1ffecaa)

### ❤️  Contributors

- Maiquu ([@Maiquu](http://github.com/Maiquu))

## v1.1.0


### 🚀 Enhancements

  - Allow user to decide load order of quasar css files via aliases (5489abf)

### 🩹 Fixes

  - Dark, Screen plugins (e21010e)

### ✅ Tests

  - Added several tests to confirm setupCss is working (cfd40bd)

### ❤️  Contributors

- Maiquu ([@Maiquu](http://github.com/Maiquu))
- JasonLandbridge ([@JasonLandbridge](http://github.com/JasonLandbridge))

## v1.0.5


### 🩹 Fixes

  - Auto-imports for direct usages of plugins (8c1e960)

### 📖 Documentation

  - Missing comma's in the code sample for quasar options (0159f8e)
  - Removed prerequisites section, updated quick setup (f2f3c61)
  - Added types to options (d0c42e1)
  - Minor casing error (d19a55d)

### 🏡 Chore

  - Updated dependencies (37b5c17)
  - Added meta.compatibility (7fae75f)

### ❤️  Contributors

- Maiquu ([@Maiquu](http://github.com/Maiquu))
- Jason Landbridge ([@JasonLandbridge](http://github.com/JasonLandbridge))

## v1.0.4


### 🩹 Fixes

  - Resolving directives, code transformation for directives (dd36477)

### 📖 Documentation

  - Added prerequisites section (2897f40)
  - Added FAQ section, removed known issues for now (8d923c1)

### 🏡 Chore

  - KebabCase utility (b2069cc)
  - KebabCase property for directive imports (fdf3ffd)
  - Directives showcase for playground (a242876)

### 🎨 Styles

  - Double quoted strings in transformed code for consistency (a698459)

### ❤️  Contributors

- Maiquu ([@Maiquu](http://github.com/Maiquu))

## v1.0.3


### 🩹 Fixes

  - Template plugin imports quasar plugins from correct path (1ccfb2c)

### 🏡 Chore

  - Added plugin showcase to playground (39ce3f1)
  - Added note regarding certain quasar plugins (8bac5d3)
  - Added 'plugins' to QuasarImports (8daf057)
  - Added notice about meta manipulating Quasar plugins to README.md (24bf991)

### ❤️  Contributors

- Maiquu ([@Maiquu](http://github.com/Maiquu))

## v1.0.2


### 🩹 Fixes

  - SassVariables default is false (99fcfc5)

### ❤️  Contributors

- Maiquu ([@Maiquu](http://github.com/Maiquu))

## v1.0.1
Initial Release
