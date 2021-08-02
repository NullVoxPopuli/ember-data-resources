import { setOwner } from '@ember/application';
import settled from '@ember/test-helpers/settled';
import Model, { attr } from '@ember-data/model';
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

import { findAll } from 'ember-data-resources';

import { setupMockData } from './-mock-data';

module('findAll', function (hooks) {
  setupTest(hooks);
  setupMockData(hooks);

  test('it works', async function (assert) {
    class Blog extends Model {
      @attr name: string | undefined;
    }

    this.owner.register('model:blog', Blog);

    class Test {
      blog = findAll<Blog>(this, 'blog');
    }

    let instance = new Test();

    setOwner(instance, this.owner);

    assert.equal(instance.blog.records, undefined);
    await settled();

    assert.false(instance.blog.isLoading, 'isLoading');
    assert.notOk(instance.blog.error, 'error');
    assert.false(instance.blog.isError, 'isError');
    assert.true(instance.blog.hasRan, 'hasRan');
    assert.equal(instance.blog.records?.length, 3);
  });
});
