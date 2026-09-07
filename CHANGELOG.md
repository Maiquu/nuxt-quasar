# Changelog

## v3.1.1

[compare changes](https://github.com/Maiquu/nuxt-quasar/compare/0dd227f1fae5997e1485aadb2df94e564df42ab8...v3.1.1)

### 🩹 Fixes

- Filter non-identifier import-map keys ([ebb02ce](https://github.com/Maiquu/nuxt-quasar/commit/ebb02ce))

### 🏡 Chore

- Bump quasar devDependency version ([1e1eafa](https://github.com/Maiquu/nuxt-quasar/commit/1e1eafa))

### ❤️ Contributors

- Ege İliklier ([@Maiquu](https://github.com/Maiquu))

## v3.1.0

[compare changes](https://github.com/Maiquu/nuxt-quasar/compare/v3.0.1...v3.1.0)

### 🚀 Enhancements

- Support @quasar/extras v2 ([3c6ef13](https://github.com/Maiquu/nuxt-quasar/commit/3c6ef13))

### 🩹 Fixes

- Support @quasar/extras v2 exports ([3b08687](https://github.com/Maiquu/nuxt-quasar/commit/3b08687))

### 🏡 Chore

- Migrate to pnpm v11 ([ff32e86](https://github.com/Maiquu/nuxt-quasar/commit/ff32e86))
- Update dev dependencies ([644cedd](https://github.com/Maiquu/nuxt-quasar/commit/644cedd))
- Refine file exclusion patterns for Quasar packages in VSCode settings ([f4ad0c2](https://github.com/Maiquu/nuxt-quasar/commit/f4ad0c2))
- Update lockfile ([2c425c8](https://github.com/Maiquu/nuxt-quasar/commit/2c425c8))

### ✅ Tests

- Add Quasar extras v1 and v2 fixtures ([a6eef72](https://github.com/Maiquu/nuxt-quasar/commit/a6eef72))

### 🎨 Styles

- Test fixture lint ([553b472](https://github.com/Maiquu/nuxt-quasar/commit/553b472))

### ❤️ Contributors

- Ege İliklier ([@Maiquu](https://github.com/Maiquu))

## v3.0.1

[compare changes](https://github.com/Maiquu/nuxt-quasar/compare/v3.0.0...v3.0.1)

### 🩹 Fixes

- Explicitly name quasar plugin ([ee384d4](https://github.com/Maiquu/nuxt-quasar/commit/ee384d4))
- Ensure virtual plugins use \0 prefix for resolution ([044af20](https://github.com/Maiquu/nuxt-quasar/commit/044af20))

### ❤️ Contributors

- Ege İliklier ([@Maiquu](https://github.com/Maiquu))

## v3.0.0

[compare changes](https://github.com/Maiquu/nuxt-quasar/compare/v3.0.0-rc.3...v3.0.0)

### 📖 Documentation

- Remove peer dependency installation commands as `nuxi module add` already handles them ([763812f](https://github.com/Maiquu/nuxt-quasar/commit/763812f))

### 🏡 Chore

- Migrate playground to use nuxt 4 directory structure ([452fb55](https://github.com/Maiquu/nuxt-quasar/commit/452fb55))
- Update bump script ([61efb9a](https://github.com/Maiquu/nuxt-quasar/commit/61efb9a))

### ❤️ Contributors

- Ege İliklier ([@Maiquu](https://github.com/Maiquu))

## v3.0.0-rc.3

[compare changes](https://github.com/Maiquu/nuxt-quasar/compare/v3.0.0-rc.2...v3.0.0-rc.3)

### 🤖 CI

- Reorder npm installation step ([2298aa9](https://github.com/Maiquu/nuxt-quasar/commit/2298aa9))

### ❤️ Contributors

- Ege İliklier ([@Maiquu](https://github.com/Maiquu))

## v3.0.0-rc.2

[compare changes](https://github.com/Maiquu/nuxt-quasar/compare/v3.0.0-rc.1...v3.0.0-rc.2)

### 🤖 CI

- Update release workflow to ensure latest npm and explicitly set registry URL ([cc53b7e](https://github.com/Maiquu/nuxt-quasar/commit/cc53b7e))

### ❤️ Contributors

- Ege İliklier ([@Maiquu](https://github.com/Maiquu))

## v3.0.0-rc.1

[compare changes](https://github.com/Maiquu/nuxt-quasar/compare/v3.0.0-rc.0...v3.0.0-rc.1)

### 🤖 CI

- Add --no-git-checks option to pnpm publish commands ([d919db3](https://github.com/Maiquu/nuxt-quasar/commit/d919db3))

### ❤️ Contributors

- Ege İliklier ([@Maiquu](https://github.com/Maiquu))

## v3.0.0-rc.0

[compare changes](https://github.com/Maiquu/nuxt-quasar/compare/v2.1.13...v3.0.0-rc.0)

### 🚀 Enhancements

- ⚠️  Upgrade to nuxt 4 ([8ef389a](https://github.com/Maiquu/nuxt-quasar/commit/8ef389a))

### 🩹 Fixes

- ⚠️  Changed to `@use` instead of `@import` statements to avoid deprecation warning messages ([#115](https://github.com/Maiquu/nuxt-quasar/pull/115))

### 💅 Refactors

- Remove analyzeBundleSize test file ([677e522](https://github.com/Maiquu/nuxt-quasar/commit/677e522))

### 📖 Documentation

- Clarify usage of Quasar Sass/SCSS variables in README and module options ([74284cf](https://github.com/Maiquu/nuxt-quasar/commit/74284cf))

### 🏡 Chore

- Fix type errors after upgrade ([c0a8012](https://github.com/Maiquu/nuxt-quasar/commit/c0a8012))
- Update packageManager to pnpm@10.24.0 ([6e90ff1](https://github.com/Maiquu/nuxt-quasar/commit/6e90ff1))
- Add bump script ([e0f0a51](https://github.com/Maiquu/nuxt-quasar/commit/e0f0a51))
- Remove changelogen script from package.json ([f58ba28](https://github.com/Maiquu/nuxt-quasar/commit/f58ba28))

### 🤖 CI

- Migrate to trusted publishing ([a1243c7](https://github.com/Maiquu/nuxt-quasar/commit/a1243c7))
- Refine release workflow tag patterns and support rc tags ([8abd4c6](https://github.com/Maiquu/nuxt-quasar/commit/8abd4c6))

#### ⚠️ Breaking Changes

- ⚠️  Upgrade to nuxt 4 ([8ef389a](https://github.com/Maiquu/nuxt-quasar/commit/8ef389a))
- ⚠️  Changed to `@use` instead of `@import` statements to avoid deprecation warning messages ([#115](https://github.com/Maiquu/nuxt-quasar/pull/115))

### ❤️ Contributors

- Ege İliklier ([@Maiquu](https://github.com/Maiquu))
- Chris Harris ([@kathysledge](https://github.com/kathysledge))

## v2.1.13

[compare changes](https://github.com/Maiquu/nuxt-quasar/compare/v2.1.12...v2.1.13)

### 🩹 Fixes

- Implement better component autoimport check and configuration ([b66519d](https://github.com/Maiquu/nuxt-quasar/commit/b66519d))
- Add nulling check for autoImport, modify autoImport docs ([4d2c4fb](https://github.com/Maiquu/nuxt-quasar/commit/4d2c4fb))

### 🏡 Chore

- Update dependencies ([3a378cb](https://github.com/Maiquu/nuxt-quasar/commit/3a378cb))

### 🤖 CI

- Update gh action versions, use `pnpm/action-setup` instead of `corepack` ([d60cce0](https://github.com/Maiquu/nuxt-quasar/commit/d60cce0))

### ❤️ Contributors

- Ege İliklier ([@Maiquu](https://github.com/Maiquu))
- David Ovčačík ([@dovca](https://github.com/dovca))

## v2.1.12

[compare changes](https://github.com/Maiquu/nuxt-quasar/compare/v2.1.11...v2.1.12)

### 🩹 Fixes

- Accidentally removed `sass` preprocessor options at 083053f ([e930dbc](https://github.com/Maiquu/nuxt-quasar/commit/e930dbc))

### ❤️ Contributors

- Ege İliklier ([@Maiquu](http://github.com/Maiquu))

## v2.1.11

[compare changes](https://github.com/Maiquu/nuxt-quasar/compare/v2.1.10...v2.1.11)

### 🩹 Fixes

- Type error at `enableQuietSassWarnings` ([083053f](https://github.com/Maiquu/nuxt-quasar/commit/083053f))

### ❤️ Contributors

- Ege İliklier ([@Maiquu](http://github.com/Maiquu))

## v2.1.10

[compare changes](https://github.com/Maiquu/nuxt-quasar/compare/v2.1.9...v2.1.10)

### 🩹 Fixes

- Quasar files being externalized in `ssr`, resolves #107 ([#107](https://github.com/Maiquu/nuxt-quasar/issues/107))

### 🏡 Chore

- Updated dependencies ([12e8994](https://github.com/Maiquu/nuxt-quasar/commit/12e8994))
- Rename `typecheck` script to `test:types`, use `vue-tsc` for typechecking ([707e26a](https://github.com/Maiquu/nuxt-quasar/commit/707e26a))
- MIT License ([f31d05e](https://github.com/Maiquu/nuxt-quasar/commit/f31d05e))
- Update `packageManager` version ([dc5cd17](https://github.com/Maiquu/nuxt-quasar/commit/dc5cd17))
- Update dependencies (mostly dev) ([597c81c](https://github.com/Maiquu/nuxt-quasar/commit/597c81c))

### 🎨 Styles

- Migrate to `@nuxt/eslint-config` ([5f76d7c](https://github.com/Maiquu/nuxt-quasar/commit/5f76d7c))

### 🤖 CI

- Create release after publish succeeds ([a7792b2](https://github.com/Maiquu/nuxt-quasar/commit/a7792b2))

### ❤️ Contributors

- Ege İliklier ([@Maiquu](http://github.com/Maiquu))

## v2.1.9

[compare changes](https://github.com/Maiquu/nuxt-quasar/compare/v2.1.8...v2.1.9)

### 🩹 Fixes

- Build error by pinning typescript version to `5.6.3` ([596ddee](https://github.com/Maiquu/nuxt-quasar/commit/596ddee))

### ❤️ Contributors

- Ege İliklier ([@Maiquu](http://github.com/Maiquu))

## v2.1.8

[compare changes](https://github.com/Maiquu/nuxt-quasar/compare/v2.1.7...v2.1.8)

### 🩹 Fixes

- Suppress deprecation warnings emitted after `sass@1.79.0` ([7d51d82](https://github.com/Maiquu/nuxt-quasar/commit/7d51d82))

### 🏡 Chore

- Update deps and recreate lockfile ([116a74a](https://github.com/Maiquu/nuxt-quasar/commit/116a74a))
- Add title to playground ([55ec640](https://github.com/Maiquu/nuxt-quasar/commit/55ec640))

### ❤️ Contributors

- Ege İliklier ([@Maiquu](http://github.com/Maiquu))

## v2.1.7

[compare changes](https://github.com/Maiquu/nuxt-quasar/compare/v2.1.6...v2.1.7)

### 🩹 Fixes

- Empty runtime/plugin.d.ts, resolves #104 ([#104](https://github.com/Maiquu/nuxt-quasar/issues/104))

### 🏡 Chore

- **ci:** Bump node version to v22 ([af3baf0](https://github.com/Maiquu/nuxt-quasar/commit/af3baf0))

### ❤️ Contributors

- Ege İliklier ([@Maiquu](http://github.com/Maiquu))

## v2.1.6

[compare changes](https://github.com/Maiquu/nuxt-quasar/compare/v2.1.5...v2.1.6)

### 🩹 Fixes

- Error caused by incorrect resolving of components, closes #102 ([#102](https://github.com/Maiquu/nuxt-quasar/issues/102))

### 🏡 Chore

- Update nuxt to v3.13.2 ([11768fc](https://github.com/Maiquu/nuxt-quasar/commit/11768fc))
- Update dependencies ([1f36003](https://github.com/Maiquu/nuxt-quasar/commit/1f36003))

### ❤️ Contributors

- Ege İliklier ([@Maiquu](http://github.com/Maiquu))

## v2.1.5

[compare changes](https://github.com/Maiquu/nuxt-quasar/compare/v2.1.4...v2.1.5)

### 🩹 Fixes

- Augment `@nuxt/schema` rather than `nuxt/schema` ([9bf66c3](https://github.com/Maiquu/nuxt-quasar/commit/9bf66c3))

### 🏡 Chore

- Update dependencies ([e9aca04](https://github.com/Maiquu/nuxt-quasar/commit/e9aca04))

### ❤️ Contributors

- Ege İliklier ([@Maiquu](http://github.com/Maiquu))
- Daniel Roe ([@danielroe](http://github.com/danielroe))

## v2.1.4

[compare changes](https://github.com/Maiquu/nuxt-quasar/compare/v2.1.3...v2.1.4)

### 🏡 Chore

- Update dependencies ([530788a](https://github.com/Maiquu/nuxt-quasar/commit/530788a))

### ❤️ Contributors

- Ege İliklier ([@Maiquu](http://github.com/Maiquu))

## v2.1.3

[compare changes](https://github.com/Maiquu/nuxt-quasar/compare/v2.1.2...v2.1.3)

### 🏡 Chore

- Indicate compatibility with new v4 major ([fc39b76](https://github.com/Maiquu/nuxt-quasar/commit/fc39b76))
- Bump packageManager version ([b6859bb](https://github.com/Maiquu/nuxt-quasar/commit/b6859bb))
- Update non-major dependencies ([60d529a](https://github.com/Maiquu/nuxt-quasar/commit/60d529a))
- Updated `@nuxt/module-builder` ([7c5ab7e](https://github.com/Maiquu/nuxt-quasar/commit/7c5ab7e))

### ❤️ Contributors

- Ege İliklier ([@Maiquu](http://github.com/Maiquu))
- Daniel Roe ([@danielroe](http://github.com/danielroe))

## v2.1.2

[compare changes](https://github.com/Maiquu/nuxt-quasar/compare/v2.1.1...v2.1.2)

### 🩹 Fixes

- Resolved quasar paths for v2.16 and above ([870d8ea](https://github.com/Maiquu/nuxt-quasar/commit/870d8ea))
- Inlined quasar in ssr builds ([86568c2](https://github.com/Maiquu/nuxt-quasar/commit/86568c2))

### 🏡 Chore

- Bumped quasar devDependency ([a308f36](https://github.com/Maiquu/nuxt-quasar/commit/a308f36))

### ❤️ Contributors

- Ege İliklier ([@Maiquu](http://github.com/Maiquu))

## v2.1.1

[compare changes](https://github.com/Maiquu/nuxt-quasar/compare/v2.1.0...v2.1.1)

This patch reverts ([ce75131](https://github.com/Maiquu/nuxt-quasar/commit/ce75131)). This was a breaking change for users who relied on auto installation of peer dependencies.

### 📖 Documentation

- Updated README to reflect component default changes ([72117e2](https://github.com/Maiquu/nuxt-quasar/commit/72117e2))
- Removed second step from quick setup guide ([f742e4a](https://github.com/Maiquu/nuxt-quasar/commit/f742e4a))

### ❤️ Contributors

- Ege İliklier ([@Maiquu](http://github.com/Maiquu))

## v2.1.0

[compare changes](https://github.com/Maiquu/nuxt-quasar/compare/v2.0.8...v2.1.0)

### 🚀 Enhancements

- Quasar ui configurable via `app.config` ([b269497](https://github.com/Maiquu/nuxt-quasar/commit/b269497))

### 🔥 Performance

- Slightly faster loading of animations.css by taking over resolveId step ([da30e25](https://github.com/Maiquu/nuxt-quasar/commit/da30e25))
- Simpler/faster implemention of component defaults based on !37 ([845650c](https://github.com/Maiquu/nuxt-quasar/commit/845650c))
- Faster dev experience by reducing amount of network requests ([36f6f3a](https://github.com/Maiquu/nuxt-quasar/commit/36f6f3a))
- Use distributed quasar.sass file to speed up loading ([63bf95b](https://github.com/Maiquu/nuxt-quasar/commit/63bf95b))

### 🩹 Fixes

- QuietSassWarnings default is false if quasar version is >=2.14 ([5c14746](https://github.com/Maiquu/nuxt-quasar/commit/5c14746))
- Build error caused by missing file extension ([cd60a22](https://github.com/Maiquu/nuxt-quasar/commit/cd60a22))
- Use distributed css for cssAddon ([128e15d](https://github.com/Maiquu/nuxt-quasar/commit/128e15d))
- Use quasar.sass file only if user wants to override sass variables ([8d8ad80](https://github.com/Maiquu/nuxt-quasar/commit/8d8ad80))
- Removed experimental state from component defaults, removed `deepDefaults` property ([5c085d9](https://github.com/Maiquu/nuxt-quasar/commit/5c085d9))
- Brand deprecation message ([fe41a40](https://github.com/Maiquu/nuxt-quasar/commit/fe41a40))
- Type errors ([7c01858](https://github.com/Maiquu/nuxt-quasar/commit/7c01858))
- Setting prop defaults where prop definition is array of constructors ([864f96f](https://github.com/Maiquu/nuxt-quasar/commit/864f96f))

### 💅 Refactors

- Simplified quasar plugin injection ([1367639](https://github.com/Maiquu/nuxt-quasar/commit/1367639))

### 📖 Documentation

- Update README regarding latest changes ([c59883f](https://github.com/Maiquu/nuxt-quasar/commit/c59883f))
- Use new `nuxi module add` command in installation ([646a26e](https://github.com/Maiquu/nuxt-quasar/commit/646a26e))
- Add missing note to quietSassWarnings JSDOC ([8f21975](https://github.com/Maiquu/nuxt-quasar/commit/8f21975))

### 🏡 Chore

- Update changelog ([3b857d8](https://github.com/Maiquu/nuxt-quasar/commit/3b857d8))
- Update vitest (with jsdom) ([d30e005](https://github.com/Maiquu/nuxt-quasar/commit/d30e005))
- Update nuxt-module-builder ([651b3f2](https://github.com/Maiquu/nuxt-quasar/commit/651b3f2))
- Update dependencies ([7a61c1f](https://github.com/Maiquu/nuxt-quasar/commit/7a61c1f))
- Marked `@quasar/extras` as optional ([ce75131](https://github.com/Maiquu/nuxt-quasar/commit/ce75131))
- Added playground example from !37 ([2260c66](https://github.com/Maiquu/nuxt-quasar/commit/2260c66))
- Bump packageManager to pnpm@9 ([1e3600c](https://github.com/Maiquu/nuxt-quasar/commit/1e3600c))
- Add missing tsconfig to playground ([166324c](https://github.com/Maiquu/nuxt-quasar/commit/166324c))
- Use explicit build command ([952e239](https://github.com/Maiquu/nuxt-quasar/commit/952e239))
- Component defaults types are dynamically generated ([aa0d5d3](https://github.com/Maiquu/nuxt-quasar/commit/aa0d5d3))
- Moved all runtime code under `src/runtime/plugin`, removed unused runtime files ([f87efe0](https://github.com/Maiquu/nuxt-quasar/commit/f87efe0))
- Updated vscode settings ([bc77aec](https://github.com/Maiquu/nuxt-quasar/commit/bc77aec))
- Use `QuasarUIConfiguration` interface ([417e0e1](https://github.com/Maiquu/nuxt-quasar/commit/417e0e1))
- Deprecate re-ordering of `quasar/brand` ([aea6af7](https://github.com/Maiquu/nuxt-quasar/commit/aea6af7))
- Rename generated shim file ([f852d90](https://github.com/Maiquu/nuxt-quasar/commit/f852d90))

### ✅ Tests

- Removed component default tests ([be41339](https://github.com/Maiquu/nuxt-quasar/commit/be41339))
- Fix setup css tests ([5809c5e](https://github.com/Maiquu/nuxt-quasar/commit/5809c5e))
- Skip analyzeBundleSize tests ([9f66f6c](https://github.com/Maiquu/nuxt-quasar/commit/9f66f6c))

### ❤️ Contributors

- Ege İliklier ([@Maiquu](http://github.com/Maiquu))
- Daniel Roe ([@danielroe](http://github.com/danielroe))

## v2.0.8

[compare changes](https://github.com/Maiquu/nuxt-quasar/compare/v2.0.7...v2.0.8)

### 🩹 Fixes

- Remove `useId` and `useHydration` from auto-imports, closes #90 ([#90](https://github.com/Maiquu/nuxt-quasar/issues/90))

### 🏡 Chore

- Update dependencies ([c985cd8](https://github.com/Maiquu/nuxt-quasar/commit/c985cd8))
- Update snapshot ([71e12b3](https://github.com/Maiquu/nuxt-quasar/commit/71e12b3))

### ❤️ Contributors

- Ege İliklier ([@Maiquu](http://github.com/Maiquu))

## v2.0.7

[compare changes](https://github.com/Maiquu/nuxt-quasar/compare/v2.0.6...v2.0.7)

### 🩹 Fixes

- **playground:** Modified imports according to ([73759a5](https://github.com/Maiquu/nuxt-quasar/commit/73759a5))
- Type error related to configuring defaults of component with required props ([eae5606](https://github.com/Maiquu/nuxt-quasar/commit/eae5606))
- Added missing brand property "dark-page" ([4b499c9](https://github.com/Maiquu/nuxt-quasar/commit/4b499c9))

### 📖 Documentation

- **fix:** Incorrect commit ref link ([1aa42e6](https://github.com/Maiquu/nuxt-quasar/commit/1aa42e6))
- Remove broken link ([568bd9f](https://github.com/Maiquu/nuxt-quasar/commit/568bd9f))

### 🏡 Chore

- Updated dependencies ([7d1f6fd](https://github.com/Maiquu/nuxt-quasar/commit/7d1f6fd))

### ❤️ Contributors

- Arthur Buravlev <buravlev-arthur@yandex.ru>
- Ege İliklier ([@Maiquu](http://github.com/Maiquu))

## v2.0.6

[compare changes](https://github.com/Maiquu/nuxt-quasar/compare/v2.0.5...v2.0.6)

### 🩹 Fixes

- Non-unique arrays in options ([3ae9281](https://github.com/Maiquu/nuxt-quasar/commit/3ae9281))
- Missing auto-imported composable types caused by nuxt/nuxt#22476 ([e427d4](https://github.com/Maiquu/nuxt-quasar/commit/e427d4))

### 🏡 Chore

- Updated dependencies ([01d9a2a](https://github.com/Maiquu/nuxt-quasar/commit/01d9a2a))
- Remove unused devDependencies ([df8797e](https://github.com/Maiquu/nuxt-quasar/commit/df8797e))

### ❤️ Contributors

- Ege İliklier ([@Maiquu](http://github.com/Maiquu))

## v2.0.5

[compare changes](https://github.com/Maiquu/nuxt-quasar/compare/v2.0.4...v2.0.5)

### 🩹 Fixes

- **playground:** Page/layout ([46ab87f](https://github.com/Maiquu/nuxt-quasar/commit/46ab87f))
- Import `defineNuxtPlugin` from `#imports` ([fd7f005](https://github.com/Maiquu/nuxt-quasar/commit/fd7f005))

### ❤️  Contributors

- Ege İliklier ([@Maiquu](http://github.com/Maiquu))

## v2.0.4

[compare changes](https://github.com/Maiquu/nuxt-quasar/compare/v2.0.3...v2.0.4)

### 🩹 Fixes

- Mark `quasar` entry as side effect free ([bd90297](https://github.com/Maiquu/nuxt-quasar/commit/bd90297))
- Mark components with defaults as non-external modules ([4cede0d](https://github.com/Maiquu/nuxt-quasar/commit/4cede0d))
- Incorrect `deepDefaults` default ([cb58ced](https://github.com/Maiquu/nuxt-quasar/commit/cb58ced))
- **test:** Brittle `analyzeBundleSize` test ([d748c36](https://github.com/Maiquu/nuxt-quasar/commit/d748c36))

### 🏡 Chore

- Updated CHANGELOG.md ([8235f2f](https://github.com/Maiquu/nuxt-quasar/commit/8235f2f))
- Updated dependencies ([d12a626](https://github.com/Maiquu/nuxt-quasar/commit/d12a626))
- Remove unused dependencies/files ([64cba17](https://github.com/Maiquu/nuxt-quasar/commit/64cba17))
- Simpler animation handling ([66da408](https://github.com/Maiquu/nuxt-quasar/commit/66da408))
- Moved named exports in `module.ts` to seperate files due to output code exposing them ([f2769b8](https://github.com/Maiquu/nuxt-quasar/commit/f2769b8))
- Renamed tests ([0da655b](https://github.com/Maiquu/nuxt-quasar/commit/0da655b))

### ✅ Tests

- `analyzeBundleSize` ([24eb937](https://github.com/Maiquu/nuxt-quasar/commit/24eb937))

### ❤️  Contributors

- Ege İliklier ([@Maiquu](http://github.com/Maiquu))

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
