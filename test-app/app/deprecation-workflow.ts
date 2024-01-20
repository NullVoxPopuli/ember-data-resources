import { registerDeprecationHandler } from '@ember/debug';

import config from 'test-app/config/environment';

const SHOULD_THROW = config.environment !== 'production';
const SILENCED_DEPRECATIONS: string[] = [
  // Add ids of deprecations you temporarily want to silence here.
];

registerDeprecationHandler((message, options, next) => {
  if (!options) {
    console.error('Missing options');
    throw new Error(message);
  }

  if (SILENCED_DEPRECATIONS.includes(options.id)) {
    return;
  } else if (SHOULD_THROW) {
    throw new Error(message);
  }

  next(message, options);
});
