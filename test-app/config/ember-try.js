'use strict';

const getChannelURL = require('ember-source-channel-url');

module.exports = async function () {
  let pkg = require('../package.json');

  return {
    usePnpm: true,
    command: `pnpm dedupe && pnpx turbo run test:ember --filter ${pkg.name}`,
    scenarios: [
      {
        name: 'ember-resources-5.3',
        npm: {
          devDependencies: {
            'ember-resources': '~5.3.0',
            'ember-source': '~3.28.11',
            'ember-cli': '~4.12.1',
            'ember-data': '~3.28.3',
            '@ember-data/adapter': '~3.28.3',
            '@ember-data/canary-features': '~3.28.3',
            '@ember-data/model': '~3.28.13',
            '@ember-data/serializer': '~3.28.3',
            '@ember-data/store': '~3.28.3',
          },
        },
      },
      {
        name: 'ember-resources-7',
        npm: {
          devDependencies: {
            'ember-resources': '^7.0.0',
            'ember-source': '~3.28.11',
            'ember-cli': '~4.12.1',
            'ember-data': '~3.28.3',
            '@ember-data/adapter': '~3.28.3',
            '@ember-data/canary-features': '~3.28.3',
            '@ember-data/model': '~3.28.13',
            '@ember-data/serializer': '~3.28.3',
            '@ember-data/store': '~3.28.3',
          },
        },
      },
      {
        name: 'ember-lts-3.28',
        npm: {
          devDependencies: {
            'ember-source': '~3.28.11',
            'ember-cli': '~4.12.1',
            'ember-data': '~3.28.3',
            '@ember-data/adapter': '~3.28.3',
            '@ember-data/canary-features': '~3.28.3',
            '@ember-data/model': '~3.28.13',
            '@ember-data/serializer': '~3.28.3',
            '@ember-data/store': '~3.28.3',
          },
        },
      },
      {
        name: 'ember-lts-4.4',
        npm: {
          devDependencies: {
            'ember-source': '~4.4.4',
            'ember-cli': '~4.12.1',
            'ember-data': '~4.4.1',
            '@ember-data/adapter': '~4.4.1',
            '@ember-data/canary-features': '~4.4.1',
            '@ember-data/model': '~4.4.1',
            '@ember-data/serializer': '~4.4.1',
            '@ember-data/store': '~4.4.1',
          },
        },
      },
      {
        name: 'ember-lts-4.8',
        npm: {
          devDependencies: {
            'ember-source': '~4.8.4',
            'ember-cli': '~4.12.1',
            'ember-data': '~4.8.8',
            '@ember-data/adapter': '~4.8.8',
            '@ember-data/canary-features': '~4.8.8',
            '@ember-data/model': '~4.8.8',
            '@ember-data/serializer': '~4.8.8',
            '@ember-data/store': '~4.8.8',
            '@ember-data/tracking': '~4.8.8',
          },
        },
      },
      {
        name: 'ember-lts-4.12',
        npm: {
          devDependencies: {
            'ember-source': '~4.12.1',
            'ember-cli': '~4.12.1',
            'ember-data': '~4.12.0',
            '@ember-data/adapter': '~4.12.8',
            '@ember-data/canary-features': '~4.12.0',
            '@ember-data/model': '~4.12.0',
            '@ember-data/serializer': '~4.12.0',
            '@ember-data/store': '~4.12.0',
            '@ember-data/tracking': '~4.12.0',
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
        name: 'ember-lts-5.4',
        npm: {
          devDependencies: {
            'ember-source': '~5.4.0',
          },
        },
      },
      {
        name: 'ember-release',
        npm: {
          devDependencies: {
            'ember-source': await getChannelURL('release'),
          },
        },
      },
      {
        name: 'ember-beta',
        npm: {
          devDependencies: {
            'ember-source': await getChannelURL('beta'),
          },
        },
      },
      {
        name: 'ember-canary',
        npm: {
          devDependencies: {
            'ember-source': await getChannelURL('canary'),
          },
        },
      },
    ],
  };
};
