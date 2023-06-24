'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function (defaults) {
  let app = new EmberApp(defaults, {
    autoImport: {
      watchDependencies: ['ember-data-resources'],
    },
    'ember-cli-babel': {
      enableTypeScriptTransform: true,
    },
  });

  return app.toTree();
};
