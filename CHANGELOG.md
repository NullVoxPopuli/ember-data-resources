# Changelog

## Release (2025-05-06)

* ember-data-resources 5.2.3 (patch)

#### :bug: Bug Fix
* `ember-data-resources`
  * [#436](https://github.com/NullVoxPopuli/ember-data-resources/pull/436) Fix publish ([@NullVoxPopuli](https://github.com/NullVoxPopuli))

#### Committers: 1
- [@NullVoxPopuli](https://github.com/NullVoxPopuli)

## Release (2025-05-05)

* ember-data-resources 5.2.2 (patch)

#### :bug: Bug Fix
* `ember-data-resources`
  * [#434](https://github.com/NullVoxPopuli/ember-data-resources/pull/434) Remove deprecation warning when switching to Ember 6 ([@jbescoyez](https://github.com/jbescoyez))

#### :memo: Documentation
* [#420](https://github.com/NullVoxPopuli/ember-data-resources/pull/420) fix query usage docs ([@Yelinz](https://github.com/Yelinz))

#### :house: Internal
* `ember-data-resources`
  * [#435](https://github.com/NullVoxPopuli/ember-data-resources/pull/435) Update release-plan ([@NullVoxPopuli](https://github.com/NullVoxPopuli))

#### Committers: 3
- Jean-Baptiste Escoyez ([@jbescoyez](https://github.com/jbescoyez))
- Yelin Zhang ([@Yelinz](https://github.com/Yelinz))
- [@NullVoxPopuli](https://github.com/NullVoxPopuli)

## Release (2024-02-20)

ember-data-resources 5.2.1 (patch)

#### :bug: Bug Fix
* `ember-data-resources`
  * [#408](https://github.com/NullVoxPopuli/ember-data-resources/pull/408) Add publish to the release workflow ([@NullVoxPopuli](https://github.com/NullVoxPopuli))

#### Committers: 1
- [@NullVoxPopuli](https://github.com/NullVoxPopuli)

## Release (2024-02-20)

ember-data-resources 5.2.0 (minor)

#### :rocket: Enhancement
* `ember-data-resources`
  * [#404](https://github.com/NullVoxPopuli/ember-data-resources/pull/404) Add some jsdoc for the JS helpers ([@NullVoxPopuli](https://github.com/NullVoxPopuli))

#### :bug: Bug Fix
* `ember-data-resources`
  * [#405](https://github.com/NullVoxPopuli/ember-data-resources/pull/405) Delete empty files ([@NullVoxPopuli](https://github.com/NullVoxPopuli))
* Other
  * [#403](https://github.com/NullVoxPopuli/ember-data-resources/pull/403) Update readme to test release automation ([@NullVoxPopuli](https://github.com/NullVoxPopuli))

#### :house: Internal
* `ember-data-resources`, `test-app`, `test-embroider-app`
  * [#379](https://github.com/NullVoxPopuli/ember-data-resources/pull/379) Update devDependencies ([@renovate[bot]](https://github.com/apps/renovate))
* `test-embroider-app`
  * [#382](https://github.com/NullVoxPopuli/ember-data-resources/pull/382) Update Node.js to v20.11.1 ([@renovate[bot]](https://github.com/apps/renovate))
* Other
  * [#400](https://github.com/NullVoxPopuli/ember-data-resources/pull/400) Prepare Release ([@github-actions[bot]](https://github.com/apps/github-actions))

#### Committers: 2
- [@NullVoxPopuli](https://github.com/NullVoxPopuli)
- [@github-actions[bot]](https://github.com/apps/github-actions)






## Release (2024-02-09)

ember-data-resources 5.1.0 (minor)

#### :rocket: Enhancement
* `@nullvoxpopuli/dev`, `ember-data-resources`, `test-app`, `test-embroider-app`
  * [#392](https://github.com/NullVoxPopuli/ember-data-resources/pull/392) Test against ember-resources@v7 ([@NullVoxPopuli](https://github.com/NullVoxPopuli))
* Other
  * [#394](https://github.com/NullVoxPopuli/ember-data-resources/pull/394) Support broader TypeScript Range (increasing to 4.8 - 5.3) ([@NullVoxPopuli](https://github.com/NullVoxPopuli))

#### :house: Internal
* Other
  * [#398](https://github.com/NullVoxPopuli/ember-data-resources/pull/398) Remove invalid turbo config field ([@NullVoxPopuli](https://github.com/NullVoxPopuli))
  * [#397](https://github.com/NullVoxPopuli/ember-data-resources/pull/397) Upgrade release-plan ([@NullVoxPopuli](https://github.com/NullVoxPopuli))
  * [#384](https://github.com/NullVoxPopuli/ember-data-resources/pull/384) Switch to release plan ([@NullVoxPopuli](https://github.com/NullVoxPopuli))
* `@nullvoxpopuli/dev`, `ember-data-resources`, `test-app`, `test-embroider-app`
  * [#393](https://github.com/NullVoxPopuli/ember-data-resources/pull/393) Update test dev dependencies ([@NullVoxPopuli](https://github.com/NullVoxPopuli))
  * [#389](https://github.com/NullVoxPopuli/ember-data-resources/pull/389) Upgrade babel deps ([@NullVoxPopuli](https://github.com/NullVoxPopuli))
* `test-app`, `test-embroider-app`
  * [#391](https://github.com/NullVoxPopuli/ember-data-resources/pull/391) Use decorator transform for easier local debugging ([@NullVoxPopuli](https://github.com/NullVoxPopuli))
  * [#388](https://github.com/NullVoxPopuli/ember-data-resources/pull/388) Upgrade ember-qunit ([@NullVoxPopuli](https://github.com/NullVoxPopuli))
  * [#385](https://github.com/NullVoxPopuli/ember-data-resources/pull/385) Upgrade to MSW 2 ([@NullVoxPopuli](https://github.com/NullVoxPopuli))
  * [#386](https://github.com/NullVoxPopuli/ember-data-resources/pull/386) Upgrade ember-cli-babel ([@NullVoxPopuli](https://github.com/NullVoxPopuli))
* `test-embroider-app`
  * [#390](https://github.com/NullVoxPopuli/ember-data-resources/pull/390) Upgrade embroider deps ([@NullVoxPopuli](https://github.com/NullVoxPopuli))

#### Committers: 2
- Jonas Metzener ([@anehx](https://github.com/anehx))
- [@NullVoxPopuli](https://github.com/NullVoxPopuli)

## 5.0.0

### Major Changes

- e06e7d9: ember-resources is now a peerDependency and no longer bundled with ember-data-resources
- 111a407: Drop support for Ember 3.25. Ember 3.28 is the minimum version now.

### Patch Changes

- 06fba00: Convert to V2 Addon
- 06fba00: Be compatible with both ember-resources@v5 and ember-resources@v6
