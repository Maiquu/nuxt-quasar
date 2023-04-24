# Changelog

## v1.7.2

[compare changes](https://github.com/Maiquu/nuxt-quasar/compare/v1.7.1...v1.7.2)


### 🩹 Fixes

  - **playground:** Moved models.ts to seperate directory ([bd87745](https://github.com/Maiquu/nuxt-quasar/commit/bd87745))
  - Explicitly defining moduleSideEffects at resolveId to handle tree-shaking reliably. ([971109f](https://github.com/Maiquu/nuxt-quasar/commit/971109f))

### 🏡 Chore

  - Updated dependencies ([d8e7206](https://github.com/Maiquu/nuxt-quasar/commit/d8e7206))
  - Moved plugins under seperate directory ([83470a3](https://github.com/Maiquu/nuxt-quasar/commit/83470a3))

### ❤️  Contributors

- Ege İliklier ([@Maiquu](http://github.com/Maiquu))

## v1.7.1

[compare changes](https://github.com/Maiquu/nuxt-quasar/compare/v1.7.0...v1.7.1)


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
