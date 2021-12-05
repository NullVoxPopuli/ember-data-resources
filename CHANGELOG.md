## [2.0.5](https://github.com/NullVoxPopuli/ember-data-resources/compare/v2.0.4...v2.0.5) (2021-12-05)


### Bug Fixes

* **deps:** update dependency ember-cli-htmlbars to ^6.0.1 ([df29e7f](https://github.com/NullVoxPopuli/ember-data-resources/commit/df29e7fca3c18d30c956d373553e24c46622151c))

## [2.0.4](https://github.com/NullVoxPopuli/ember-data-resources/compare/v2.0.3...v2.0.4) (2021-11-20)


### Bug Fixes

* **findRecord:** id falsey errors are now on the error property ([fc6e3f6](https://github.com/NullVoxPopuli/ember-data-resources/commit/fc6e3f67cc2978324056699f42d66cf67bd10fcf))

## [2.0.3](https://github.com/NullVoxPopuli/ember-data-resources/compare/v2.0.2...v2.0.3) (2021-11-15)


### Bug Fixes

* **deps:** update dependency ember-auto-import to ^2.2.4 ([5fefeaf](https://github.com/NullVoxPopuli/ember-data-resources/commit/5fefeaf59f35e454ae1e2e5b21d1309201298f24))

## [2.0.2](https://github.com/NullVoxPopuli/ember-data-resources/compare/v2.0.1...v2.0.2) (2021-11-06)


### Bug Fixes

* **deps:** update dependency ember-resources to ^4.0.1 ([646873f](https://github.com/NullVoxPopuli/ember-data-resources/commit/646873fb897c5a42f9ba6a5e6b1a3806a54f971b))

## [2.0.1](https://github.com/NullVoxPopuli/ember-data-resources/compare/v2.0.0...v2.0.1) (2021-11-01)


### Bug Fixes

* **deps:** update dependency ember-auto-import to ^2.2.3 ([e374292](https://github.com/NullVoxPopuli/ember-data-resources/commit/e374292645d72ab3c6af1ba60d9e020ac3a4d9aa))

# [2.0.0](https://github.com/NullVoxPopuli/ember-data-resources/compare/v1.1.4...v2.0.0) (2021-11-01)


### Bug Fixes

* **deps:** update dependency ember-resources to v4 ([9abbece](https://github.com/NullVoxPopuli/ember-data-resources/commit/9abbecedac3cae0bb2800ed60acf2a65415166e5))


### Features

* **readme:** declare ember-auto-import compatibility ([0cbc7a7](https://github.com/NullVoxPopuli/ember-data-resources/commit/0cbc7a73616e2439514d026f4807db9ae9d3f135))


### BREAKING CHANGES

* **readme:** ember-auto-import compatibility was not declared.

If any projects that previously used ember-auto-import@1,
this addon will no longer work for those projects until those projects
upgrade to either ember-auto-import@v2 or embroider.

For projects that already were using ember-auto-import@v2, there is no
breaking change. There is no behavioral difference in this addon's
features.

## [1.1.4](https://github.com/NullVoxPopuli/ember-data-resources/compare/v1.1.3...v1.1.4) (2021-10-21)


### Bug Fixes

* **deps:** update dependency ember-cli-htmlbars to v6 ([f5d64a7](https://github.com/NullVoxPopuli/ember-data-resources/commit/f5d64a7bed410a6dc6a4563ecc320c8456207c2a))

## [1.1.3](https://github.com/NullVoxPopuli/ember-data-resources/compare/v1.1.2...v1.1.3) (2021-10-20)


### Bug Fixes

* **deps:** update dependency ember-resources to ^3.2.2 ([9f6a300](https://github.com/NullVoxPopuli/ember-data-resources/commit/9f6a3005005a5efcc66d98be5c33b5b422e0effd))

## [1.1.2](https://github.com/NullVoxPopuli/ember-data-resources/compare/v1.1.1...v1.1.2) (2021-09-06)


### Bug Fixes

* **deps:** update dependency @ember/test-waiters to v3 ([2666dfc](https://github.com/NullVoxPopuli/ember-data-resources/commit/2666dfce187e02b664afdbfe7d6fb93be8b17721))

## [1.1.1](https://github.com/NullVoxPopuli/ember-data-resources/compare/v1.1.0...v1.1.1) (2021-09-06)


### Bug Fixes

* **deps:** update dependency ember-resources to ^3.2.1 ([e16d3b9](https://github.com/NullVoxPopuli/ember-data-resources/commit/e16d3b92842dc64f29e080fe9da57c2a8b0f8ad8))

# [1.1.0](https://github.com/NullVoxPopuli/ember-data-resources/compare/v1.0.1...v1.1.0) (2021-08-04)


### Bug Fixes

* add tests, template-only support, use better type signature for JS-resource helpers ([ee4838d](https://github.com/NullVoxPopuli/ember-data-resources/commit/ee4838db65f3378549d4da2709590772db6d1495))
* **internal:** add tests and fix allow generic types to be passed ([796abf6](https://github.com/NullVoxPopuli/ember-data-resources/commit/796abf66c6d35e64fe9e7f4029c6272e35b5b91b))
* **request:** add waitForPromise to .retry ([81b3d6b](https://github.com/NullVoxPopuli/ember-data-resources/commit/81b3d6b764a5fa57a5890a2629d729ffd8aa0475))


### Features

* **helpers:** add helpers for finding records ([b439460](https://github.com/NullVoxPopuli/ember-data-resources/commit/b439460905affc4b4cbbb64030de936269d9231b))

## [1.0.1](https://github.com/NullVoxPopuli/ember-data-resources/compare/v1.0.0...v1.0.1) (2021-08-03)


### Bug Fixes

* **deps:** update dependency ember-resources to ^3.1.2 ([663ca70](https://github.com/NullVoxPopuli/ember-data-resources/commit/663ca70696106c82f249fe04869fdddd2b638aef))

# 1.0.0 (2021-08-02)


### Features

* initial implementation ([3503b30](https://github.com/NullVoxPopuli/ember-data-resources/commit/3503b30d912c49a815adffc7a0c3b569b234991c))


### BREAKING CHANGES

* implement base features
 - findAll
 - findRecord
 - query
 - queryRecord
