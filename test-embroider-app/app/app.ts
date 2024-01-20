import 'decorator-transforms/globals';

import Application from '@ember/application';
import { importSync, isDevelopingApp, macroCondition } from '@embroider/macros';

import loadInitializers from 'ember-load-initializers';
import Resolver from 'ember-resolver';
import config from 'test-embroider-app/config/environment';

if (macroCondition(isDevelopingApp())) {
  importSync('test-embroider-app/deprecation-workflow');
}

export default class App extends Application {
  modulePrefix = config.modulePrefix;
  podModulePrefix = config.podModulePrefix;
  Resolver = Resolver;
}

loadInitializers(App, config.modulePrefix);
