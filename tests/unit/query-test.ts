import { setOwner } from '@ember/application';
import settled from '@ember/test-helpers/settled';
import Model, { attr } from '@ember-data/model';
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

import { query } from 'ember-data-resources';

module('query', function (hooks) {
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
      blog = query<Blog>(this, 'blog', () => ({}));
    }

    let instance = new Test();

    setOwner(instance, this.owner);

    assert.equal(instance.blog.record, undefined);
    await settled();

    assert.ok(Array.isArray(instance.blog.records));
    assert.equal(instance.blog.records?.length, 2);
  });
});
