/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
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

export interface Constructable<T = unknown> {
  new (...args: unknown[]): T;
}

export function findRecord<Model = unknown>(
  destroyable: object,
  modelName: string,
  thunk: () => FindRecordThunkResult
) {
  // Passing the resource here is hard to type -- help wanted
  return useResource<FindRecord<Model>>(destroyable, FindRecord as any, () => {
    let reified = thunk();
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
  });
}

type FindAllThunkResult = { options: FindAllOptions } | FindAllOptions | void;

export function findAll<Model = unknown>(
  destroyable: object,
  modelName: string,
  thunk?: () => FindAllThunkResult
) {
  // Passing the resource here is hard to type -- help wanted
  return useResource<FindAll<Model>>(destroyable, FindAll as any, () => {
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
  // Passing the resource here is hard to type -- help wanted
  return useResource<Query<Model>>(destroyable, Query as any, () => {
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
  // Passing the resource here is hard to type -- help wanted
  return useResource<QueryRecord<Model>>(destroyable, QueryRecord as any, () => {
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
