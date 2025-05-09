/* eslint-disable @typescript-eslint/ban-types */
import { FindAll } from './-private/resources/find-all.ts';
import { FindRecord } from './-private/resources/find-record.ts';
import { Query } from './-private/resources/query.ts';
import { QueryRecord } from './-private/resources/query-record.ts';

import type { FindAllOptions } from './-private/resources/find-all';
import type { FindRecordOptions } from './-private/resources/find-record';
import type { QueryOptions, QueryQuery } from './-private/resources/query';
import type { QueryRecordOptions, QueryRecordQuery } from './-private/resources/query-record';
import type { Id } from './-private/resources/types';

type FindRecordThunkResult = Id | [Id] | [Id, FindRecordOptions];

/**
 * Wrapper around store.findRecord
 */
export function findRecord<Model = unknown>(
  destroyable: object,
  modelName: string,
  thunk: () => FindRecordThunkResult,
) {
  return FindRecord.from(destroyable, () => {
    const reified = thunk();
    let id: Id;
    let options: FindRecordOptions;

    if (Array.isArray(reified)) {
      id = reified[0];
      options = reified[1] ?? {};
    } else {
      id = reified as Id;
      options = {};
    }

    return {
      positional: [modelName, id],
      named: {
        options,
      },
    };
    // Cast needed Until min-supported TS is 4.7
  }) as FindRecord<Model>;
}

type FindAllThunkResult = { options: FindAllOptions } | FindAllOptions | void;

/**
 * Wrapper around store.findAll
 */
export function findAll<Model = unknown>(
  destroyable: object,
  modelName: string,
  thunk?: () => FindAllThunkResult,
) {
  return FindAll.from(destroyable, () => {
    const reified = thunk?.() || {};
    const options = 'options' in reified ? reified.options : reified;

    return {
      positional: [modelName],
      named: {
        options,
      },
    };
    // Cast needed Until min-supported TS is 4.7
  }) as FindAll<Model>;
}

type QueryThunkResult = QueryQuery | [QueryQuery] | [QueryQuery, QueryOptions];

/**
 * Wrapper around store.query
 */
export function query<Model = unknown>(
  destroyable: object,
  modelName: string,
  thunk: () => QueryThunkResult,
) {
  return Query.from(destroyable, () => {
    const reified = thunk();

    if (Array.isArray(reified)) {
      const [query, options] = reified;

      return {
        positional: [modelName, query],
        named: {
          options: options || {},
        },
      };
    }

    return {
      positional: [modelName, reified],
      named: {
        options: {},
      },
    };
    // Cast needed Until min-supported TS is 4.7
  }) as Query<Model>;
}

type QueryRecordThunkResult =
  | QueryRecordQuery
  | [QueryRecordQuery]
  | [QueryRecordQuery, QueryRecordOptions];

/**
 * Wrapper around store.queryRecord
 */
export function queryRecord<Model = unknown>(
  destroyable: object,
  modelName: string,
  thunk: () => QueryRecordThunkResult,
) {
  return QueryRecord.from(destroyable, () => {
    const reified = thunk();

    if (Array.isArray(reified)) {
      const [query, options] = reified;

      return {
        positional: [modelName, query],
        named: {
          options: options || {},
        },
      };
    }

    return {
      positional: [modelName, reified],
      named: {
        options: {},
      },
    };
    // Cast needed Until min-supported TS is 4.7
  }) as QueryRecord<Model>;
}
