import { tracked } from '@glimmer/tracking';
import { setOwner } from '@ember/application';
import settled from '@ember/test-helpers/settled';
import Model, { attr } from '@ember-data/model';
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

import { findRecord } from 'ember-data-resources';

import { setupMockData } from './-mock-data';

module('findRecord', function (hooks) {
  setupTest(hooks);
  setupMockData(hooks);

  test('it works', async function (assert) {
    class Blog extends Model {
      @attr name: string | undefined;
    }

    this.owner.register('model:blog', Blog);

    class Test {
      @tracked id = 1;
      blog = findRecord<Blog>(this, 'blog', () => this.id);
    }

    let instance = new Test();

    setOwner(instance, this.owner);

    assert.equal(instance.blog.record, undefined);
    await settled();

    assert.false(instance.blog.isLoading, 'isLoading');
    assert.false(instance.blog.isError, 'isError');
    assert.true(instance.blog.hasRan, 'hasRan');
    assert.notOk(instance.blog.error, 'error');
    assert.ok(instance.blog.record instanceof Blog);
    assert.equal(instance.blog.record?.name, 'name:1');

    instance.id = 2;
    assert.false(instance.blog.hasRan, 'hasRan');
    await settled();

    assert.false(instance.blog.isLoading, 'isLoading');
    assert.false(instance.blog.isError, 'isError');
    assert.true(instance.blog.hasRan, 'hasRan');
    assert.notOk(instance.blog.error, 'error');
    assert.ok(instance.blog.record instanceof Blog);
    await settled();

    assert.equal(instance.blog.record?.name, 'name:2');
  });
});
