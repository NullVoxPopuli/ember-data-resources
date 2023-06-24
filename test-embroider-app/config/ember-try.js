'use strict';

const getChannelURL = require('ember-source-channel-url');

module.exports = async function () {
  let pkg = require('../package.json');

  return {
    usePnpm: true,
    command: `pnpx turbo run test:ember --filter ${pkg.name}`,
    scenarios: [
      {
        name: 'ember-lts-3.28',
        npm: {
          devDependencies: {
            'ember-source': '~3.28.0',
            'ember-data': '~3.28.13',
            '@ember-data/store': '~3.28.0',
          },
        },
      },
      {
        name: 'ember-lts-4.4',
        npm: {
          devDependencies: {
            'ember-source': '~4.4.0',
            'ember-data': '~4.4.0',
            '@ember-data/store': '~4.4.0',
          },
        },
      },
      {
        name: 'ember-lts-4.8',
        npm: {
          devDependencies: {
            'ember-source': '~4.8.0',
            'ember-data': '~4.8.8',
            '@ember-data/store': '~4.8.8',
            '@ember-data/adapter': '~4.8.8',
            '@ember-data/model': '~4.8.8',
            '@ember-data/serializer': '~4.8.8',
            '@ember-data/canary-features': '~4.8.8',
          },
        },
      },
      {
        name: 'ember-lts-4.12',
        npm: {
          devDependencies: {
            'ember-source': '~4.12.0',
            'ember-data': '~4.12.0',
            '@ember-data/store': '~4.12.0',
          },
        },
      },
      {
        name: 'ember-5.0',
        npm: {
          devDependencies: {
            'ember-source': '~5.0.0',
            'ember-data': '~5.0.0',
            'ember-qunit': '^7.0.0',
            '@ember/test-helpers': '^3.0.3',
          },
        },
      },
      {
        name: 'ember-release',
        npm: {
          devDependencies: {
            'ember-source': await getChannelURL('release'),
            'ember-data': '~5.0.0',
            'ember-qunit': '^7.0.0',
            '@ember/test-helpers': '^3.0.3',
          },
        },
      },
      {
        name: 'ember-beta',
        npm: {
          devDependencies: {
            'ember-source': await getChannelURL('beta'),
            'ember-data': '~5.0.0',
            'ember-qunit': '^7.0.0',
            '@ember/test-helpers': '^3.0.3',
          },
        },
      },
      {
        name: 'ember-canary',
        npm: {
          devDependencies: {
            'ember-source': await getChannelURL('canary'),
            'ember-data': '~5.0.0',
            'ember-qunit': '^7.0.0',
            '@ember/test-helpers': '^3.0.3',
          },
        },
      },
    ],
  };
};
