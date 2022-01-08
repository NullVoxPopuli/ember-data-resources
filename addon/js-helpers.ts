/* eslint-disable @typescript-eslint/ban-types */
import { useResource } from 'ember-resources';

import { FindAll } from './-private/resources/find-all';
import { FindRecord } from './-private/resources/find-record';
import { Query } from './-private/resources/query';
import { QueryRecord } from './-private/resources/query-record';

import type { FindAllOptions } from './-private/resources/find-all';
import type { FindRecordOptions } from './-private/resources/find-record';
import type { QueryOptions, QueryQuery } from './-private/resources/query';
import type { QueryRecordOptions, QueryRecordQuery } from './-private/resources/query-record';
import type { Id } from './-private/resources/types';

type FindRecordThunkResult = Id | [Id] | [Id, FindRecordOptions];

export function findRecord<Model = unknown>(
  destroyable: object,
  modelName: string,
  thunk: () => FindRecordThunkResult
) {
  return useResource<FindRecord<Model>>(destroyable, FindRecord, () => {
    let reified = thunk();
    let id: Id | undefined = undefined;
    let options: FindRecordOptions;

    if (typeof reified === 'number') {
      id = reified;
      options = {};
    } else if (Array.isArray(options)) {
      id = options[0];
      options = options[1] || {};
    }

    return {
      positional: [modelName, id],
      named: {
        options,
      },
    };
  });
}

type FindAllThunkResult = { options: FindAllOptions } | FindAllOptions | void;

export function findAll<Model = unknown>(
  destroyable: object,
  modelName: string,
  thunk?: () => FindAllThunkResult
) {
  return useResource<FindAll<Model>>(destroyable, FindAll, () => {
    let reified = thunk?.() || {};
    let options = 'options' in reified ? reified.options : reified;

    return {
      positional: [modelName],
      named: {
        options,
      },
    };
  });
}

type QueryThunkResult = QueryQuery | [QueryQuery] | [QueryQuery, QueryOptions];

export function query<Model = unknown>(
  destroyable: object,
  modelName: string,
  thunk: () => QueryThunkResult
) {
  return useResource<Query<Model>>(destroyable, Query, () => {
    let reified = thunk();

    if (Array.isArray(reified)) {
      let [query, options] = reified;

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
  });
}

type QueryRecordThunkResult =
  | QueryRecordQuery
  | [QueryRecordQuery]
  | [QueryRecordQuery, QueryRecordOptions];

export function queryRecord<Model = unknown>(
  destroyable: object,
  modelName: string,
  thunk: () => QueryRecordThunkResult
) {
  return useResource<QueryRecord<Model>>(destroyable, QueryRecord, () => {
    let reified = thunk();

    if (Array.isArray(reified)) {
      let [query, options] = reified;

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
  });
}
