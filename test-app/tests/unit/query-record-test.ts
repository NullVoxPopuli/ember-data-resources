/* eslint-disable @typescript-eslint/no-explicit-any */
import { tracked } from '@glimmer/tracking';
import { setOwner } from '@ember/application';
import { helper } from '@ember/component/helper';
import { render } from '@ember/test-helpers';
import settled from '@ember/test-helpers/settled';
import Model, { attr } from '@ember-data/model';
import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupRenderingTest, setupTest } from 'ember-qunit';

import { queryRecord } from 'ember-data-resources';

import { setupMockData } from './-mock-data';

module('queryRecord', function (hooks) {
  setupMockData(hooks);

  module('in js', function (hooks) {
    setupTest(hooks);

    test('it works', async function (assert) {
      class Blog extends Model {
        @attr name: string | undefined;
      }

      this.owner.register('model:blog', Blog);

      class Test {
        @tracked id = 1;
        blog = queryRecord<Blog>(this, 'blog', () => ({ q: { id: this.id } }));
      }

      let instance = new Test();

      setOwner(instance, this.owner);

      assert.strictEqual(instance.blog.record, undefined);
      await settled();

      assert.false(instance.blog.isLoading, 'isLoading');
      assert.false(instance.blog.isError, 'isError');
      assert.true(instance.blog.hasRan, 'hasRan');
      assert.notOk(instance.blog.error?.message, 'error');
      assert.ok(instance.blog.record instanceof Blog);
      assert.strictEqual(instance.blog.record?.name, 'name:1');

      instance.id = 2;
      assert.false(instance.blog.hasRan, 'hasRan');
      await settled();

      assert.false(instance.blog.isLoading, 'isLoading');
      assert.false(instance.blog.isError, 'isError');
      assert.true(instance.blog.hasRan, 'hasRan');
      assert.notOk(instance.blog.error?.message, 'error');
      assert.ok(instance.blog.record instanceof Blog);
      await settled();

      assert.strictEqual(instance.blog.record?.name, 'name:2');
    });
  });

  module('in a template', function (hooks) {
    setupRenderingTest(hooks);

    test('it works', async function (assert) {
      class Blog extends Model {
        @attr name: string | undefined;
      }

      this.owner.register('model:blog', Blog);

      this.setProperties({ id: 1 });

      let yielded: any;

      this.owner.register(
        'helper:capture',
        helper(([data]) => {
          yielded = data;

          return;
        })
      );

      await render(hbs`
        {{#let (query-record 'blog' (hash q=(hash id=this.id))) as |data|}}
          {{capture data}}
        {{/let}}
      `);

      assert.false(yielded.isLoading, 'isLoading');
      assert.strictEqual(yielded.error?.message, undefined);
      assert.true(yielded.hasRan, 'hasRan');
      assert.false(yielded.isError, 'isError');
      assert.strictEqual(yielded.record.name, 'name:1');

      this.setProperties({ id: 2 });
      await settled();

      assert.false(yielded.isLoading, 'isLoading');
      assert.false(yielded.isError, 'isError');
      assert.true(yielded.hasRan, 'hasRan');
      assert.notOk(yielded.error?.message, 'error');

      assert.strictEqual(yielded.record?.name, 'name:2');
    });
  });
});
