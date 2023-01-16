/* eslint-disable @typescript-eslint/no-explicit-any */
import { setOwner } from '@ember/application';
import { helper } from '@ember/component/helper';
import { render } from '@ember/test-helpers';
import settled from '@ember/test-helpers/settled';
import Model, { attr } from '@ember-data/model';
import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupRenderingTest, setupTest } from 'ember-qunit';

import { findAll } from 'ember-data-resources';

import { setupMockData } from './-mock-data';

module('findAll', function (hooks) {
  setupMockData(hooks);

  module('in js', function (hooks) {
    setupTest(hooks);

    test('it works', async function (assert) {
      class Blog extends Model {
        @attr name: string | undefined;
      }

      this.owner.register('model:blog', Blog);

      class Test {
        blog = findAll<Blog>(this, 'blog');
      }

      const instance = new Test();

      setOwner(instance, this.owner);

      assert.strictEqual(instance.blog.records, undefined);
      await settled();

      assert.false(instance.blog.isLoading, 'isLoading');
      assert.notOk(instance.blog.error?.message, 'error');
      assert.false(instance.blog.isError, 'isError');
      assert.true(instance.blog.hasRan, 'hasRan');
      assert.strictEqual(instance.blog.records?.length, 3);
    });

    test('Array.prototype.filter works', async function (assert) {
      class Blog extends Model {
        @attr name: string | undefined;
      }

      this.owner.register('model:blog', Blog);

      class Test {
        blog = findAll<Blog>(this, 'blog');
      }

      const instance = new Test();

      setOwner(instance, this.owner);

      assert.strictEqual(instance.blog.records, undefined);
      await settled();

      const odd = instance.blog.records?.filter(
        (record) => parseInt(record.name?.split(':')[1] || '') % 2 === 1
      );

      assert.strictEqual(odd?.length, 2);
    });
  });

  module('in a template', function (hooks) {
    setupRenderingTest(hooks);

    test('it works', async function (assert) {
      class Blog extends Model {
        @attr name: string | undefined;
      }

      this.owner.register('model:blog', Blog);

      let yielded: any;

      this.owner.register(
        'helper:capture',
        helper(([data]) => {
          yielded = data;

          return;
        })
      );

      await render(hbs`
        {{#let (find-all 'blog') as |data|}}
          {{capture data}}
        {{/let}}
      `);

      assert.false(yielded.isLoading, 'isLoading');
      assert.notOk(yielded.error?.message, 'error');
      assert.true(yielded.hasRan, 'hasRan');
      assert.false(yielded.isError, 'isError');
      assert.strictEqual(yielded.records.length, 3);
    });

    test('Array.prototype.filter works', async function (assert) {
      class Blog extends Model {
        @attr name: string | undefined;
      }

      this.owner.register('model:blog', Blog);

      let yielded: any;

      this.owner.register(
        'helper:capture',
        helper(([data]) => {
          yielded = data;

          return;
        })
      );

      await render(hbs`
        {{#let (find-all 'blog') as |data|}}
          {{capture data}}
        {{/let}}
      `);

      const odd = yielded.records.filter(
        (record: any) => parseInt(record.name.split(':')[1]) % 2 === 1
      );

      assert.strictEqual(odd.length, 2);
    });
  });
});
