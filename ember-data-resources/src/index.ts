// For direct use in templates' strict Mode
// for loose mode, these don't need to be imported, and are resolveable via
// the lower-kebab-case variant of each of these names
export { FindAll } from './-private/resources/find-all.ts';
export { FindRecord } from './-private/resources/find-record.ts';
export { Query } from './-private/resources/query.ts';
export { QueryRecord } from './-private/resources/query-record.ts';

// Resource wrappers in JS/TS classes
export { findAll, findRecord, query, queryRecord } from './js-helpers.ts';
