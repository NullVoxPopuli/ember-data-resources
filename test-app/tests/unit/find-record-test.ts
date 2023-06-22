/* eslint-disable @typescript-eslint/no-explicit-any */
import { tracked } from '@glimmer/tracking';
import { setOwner } from '@ember/application';
import { helper } from '@ember/component/helper';
import { render } from '@ember/test-helpers';
import settled from '@ember/test-helpers/settled';
import Adapter from '@ember-data/adapter/json-api';
import Model, { attr } from '@ember-data/model';
import JSONAPISerializer from '@ember-data/serializer/json-api';
import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupRenderingTest, setupTest } from 'ember-qunit';

import { findRecord } from 'ember-data-resources';
import { IdRequiredError, IdTypeError } from 'ember-data-resources/-private/resources/errors';

import { setupMockData } from './-mock-data';

import type { Id } from 'ember-data-resources/-private/resources/types';

module('findRecord', function (hooks) {
  setupMockData(hooks);

  module('in js', function (hooks) {
    setupTest(hooks);

    test('it works when callback returns id', async function (assert) {
      class Blog extends Model {
        @attr name: string | undefined;
      }

      this.owner.register('model:blog', Blog);
      this.owner.register('serializer:blog', JSONAPISerializer);
      this.owner.register('adapter:blog', Adapter);

      class Test {
        @tracked id: Id = 1;
        blog = findRecord<Blog>(this, 'blog', () => this.id);
      }

      const instance = new Test();

      setOwner(instance, this.owner);

      assert.strictEqual(instance.blog.record, undefined, 'record');
      await settled();

      assert.false(instance.blog.isLoading, 'isLoading');
      assert.false(instance.blog.isError, 'isError');
      assert.true(instance.blog.hasRan, 'hasRan');
      assert.notOk(instance.blog.error?.message, 'error');
      assert.ok(instance.blog.record instanceof Blog, 'record type');
      assert.strictEqual(instance.blog.record?.name, 'name:1', 'record name');

      instance.id = '2';
      assert.true(instance.blog.hasRan, 'hasRan 2 (true, because we only changed the id)');
      await settled();

      assert.false(instance.blog.isLoading, 'isLoading 2');
      assert.false(instance.blog.isError, 'isError 2');
      assert.true(instance.blog.hasRan, 'hasRan 2');
      assert.notOk(instance.blog.error?.message, 'error 2');
      assert.ok(instance.blog.record instanceof Blog, 'record type 2');
      await settled();

      assert.strictEqual(instance.blog.record?.name, 'name:2', 'record name 2');
    });

    test('it works when callback returns an array with id', async function (assert) {
      class Blog extends Model {
        @attr name: string | undefined;
      }

      this.owner.register('model:blog', Blog);
      this.owner.register('serializer:blog', JSONAPISerializer);
      this.owner.register('adapter:blog', Adapter);

      class Test {
        @tracked id: Id = 1;
        blog = findRecord<Blog>(this, 'blog', () => [this.id]);
      }

      const instance = new Test();

      setOwner(instance, this.owner);

      assert.strictEqual(instance.blog.record, undefined, 'record');
      await settled();

      assert.false(instance.blog.isLoading, 'isLoading');
      assert.false(instance.blog.isError, 'isError');
      assert.true(instance.blog.hasRan, 'hasRan');
      assert.notOk(instance.blog.error?.message, 'error');
      assert.ok(instance.blog.record instanceof Blog, 'record type');
      assert.strictEqual(instance.blog.record?.name, 'name:1', 'record name');

      instance.id = '2';
      assert.true(instance.blog.hasRan, 'hasRan 2 (true, because we only changed the id)');
      await settled();

      assert.false(instance.blog.isLoading, 'isLoading 2');
      assert.false(instance.blog.isError, 'isError 2');
      assert.true(instance.blog.hasRan, 'hasRan 2');
      assert.notOk(instance.blog.error?.message, 'error 2');
      assert.ok(instance.blog.record instanceof Blog, 'record type 2');
      await settled();

      assert.strictEqual(instance.blog.record?.name, 'name:2', 'record name 2');
    });

    test('it should return an IdRequiredError when id is undefined', async function (assert) {
      class Blog extends Model {
        @attr name: string | undefined;
      }

      this.owner.register('model:blog', Blog);
      this.owner.register('serializer:blog', JSONAPISerializer);
      this.owner.register('adapter:blog', Adapter);

      class Test {
        @tracked id = undefined;
        blog = findRecord<Blog>(this, 'blog', () => this.id);
      }

      const instance = new Test();

      setOwner(instance, this.owner);

      assert.strictEqual(instance.blog.record, undefined, 'record');
      await settled();

      assert.false(instance.blog.isLoading, 'isLoading');
      assert.true(instance.blog.isError, 'isError');
      assert.ok(instance.blog.error instanceof IdRequiredError, 'record type');
      assert.ok(instance.blog.error?.message.includes('blog'), 'error message has modelName');
      assert.notOk(instance.blog.record, 'has no record');
    });

    test('it should return an IdTypeError when id is incorrect type', async function (assert) {
      class Blog extends Model {
        @attr name: string | undefined;
      }

      this.owner.register('model:blog', Blog);
      this.owner.register('serializer:blog', JSONAPISerializer);
      this.owner.register('adapter:blog', Adapter);

      class Test {
        @tracked id = new Date();

        // @ts-expect-error Testing behaviour with wrong type
        blog = findRecord<Blog>(this, 'blog', () => this.id);
      }

      const instance = new Test();

      setOwner(instance, this.owner);

      assert.strictEqual(instance.blog.record, undefined, 'record');

      await settled();

      assert.false(instance.blog.isLoading, 'isLoading');
      assert.true(instance.blog.isError, 'isError');
      assert.ok(instance.blog.error instanceof IdTypeError, 'error type');
      assert.ok(instance.blog.error?.message.includes('blog'), 'error message has modelName');
      assert.notOk(instance.blog.record, 'has no record');
    });
  });

  module('in a template', function (hooks) {
    setupRenderingTest(hooks);

    test('it works', async function (assert) {
      class Blog extends Model {
        @attr name: string | undefined;
      }

      this.owner.register('model:blog', Blog);
      this.owner.register('serializer:blog', JSONAPISerializer);
      this.owner.register('adapter:blog', Adapter);

      this.setProperties({ id: 1 });

      let yielded: any;

      this.setProperties({
        capture: helper(([data]) => {
          yielded = data;

          return;
        }),
      });

      await render(hbs`
        {{#let (find-record 'blog' this.id) as |data|}}
          {{this.capture data}}
          {{data.record.name}}
        {{/let}}
      `);

      assert.false(yielded.isLoading, 'isLoading');
      assert.strictEqual(yielded.error?.message, undefined, 'error message');
      assert.true(yielded.hasRan, 'hasRan');
      assert.false(yielded.isError, 'isError');
      assert.strictEqual(yielded.record.name, 'name:1', 'record name');

      assert.dom().hasText('name:1', 'template');

      this.setProperties({ id: 2 });
      await settled();

      assert.false(yielded.isLoading, 'isLoading 2');
      assert.strictEqual(yielded.error?.message, undefined, 'error message 2');
      assert.true(yielded.hasRan, 'hasRan 2');
      assert.false(yielded.isError, 'isError 2');
      assert.strictEqual(yielded.record.name, 'name:2', 'record name 2');

      assert.dom().hasText('name:2', 'template 2');
    });
  });
});
