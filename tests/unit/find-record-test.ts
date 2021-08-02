import { tracked } from '@glimmer/tracking';
import { setOwner } from '@ember/application';
import settled from '@ember/test-helpers/settled';
import Model, { attr } from '@ember-data/model';
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

import { findRecord } from 'ember-data-resources';

module('findRecord', function (hooks) {
  setupTest(hooks);

  test('it works', async function (assert) {
    class Blog extends Model {
      @attr name: string | undefined;
    }

    this.owner.register('model:blog', Blog);

    let store = this.owner.lookup('service:store');

    store.createRecord('blog', { id: 1, name: 'one' });
    store.createRecord('blog', { id: 2, name: 'two' });

    class Test {
      @tracked id = 1;
      blog = findRecord<Blog>(this, 'blog', () => this.id);
    }

    let instance = new Test();

    setOwner(instance, this.owner);

    assert.equal(instance.blog.record, undefined);
    await settled();

    assert.ok(instance.blog.record instanceof Blog);
    assert.equal(instance.blog.record?.name, 'one');

    instance.id = 2;
    assert.ok(instance.blog.record instanceof Blog);
    await settled();

    assert.ok(instance.blog.record instanceof Blog);
    assert.equal(instance.blog.record?.name, 'two');
  });
});
