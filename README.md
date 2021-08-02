# ember-data-resources

Resources for reactive data fetching with ember-data


## Compatibility

* Ember.js v3.25 or above


## Installation

```
ember install ember-data-resources
```


## Usage

### `findAll`

```js
import { findAll } from 'ember-data-resources';

export default class MyComponent extends Component {
  @tracked included = '';

  blog = findAll(this, 'blog', () => ({ included: this.included }));
  // blog = findAll(this, 'blog');
}
```
```hbs
Available properties:
 - {{this.blog.records}}
 - {{this.blog.error}}
 - {{this.blog.isLoading}}
 - {{this.blog.isSuccess}}
 - {{this.blog.isError}}
 - {{this.blog.hasRun}}

Available methods:
 - <button {{on 'click' this.blog.retry}}>Retry</button>
```

### `findRecord`

```js
import { findRecord } from 'ember-data-resources';

export default class MyComponent extends Component {
  @tracked id = 1;

  blog = findRecord(this, 'blog', () => this.id)
  // blog = findRecord(this, 'blog', () => [this.id])
  // blog = findRecord(this, 'blog', () => [this.id, { ...options }])
}
```
```hbs
Available properties:
 - {{this.blog.record}}
 - {{this.blog.error}}
 - {{this.blog.isLoading}}
 - {{this.blog.isSuccess}}
 - {{this.blog.isError}}
 - {{this.blog.hasRun}}

Available methods:
 - <button {{on 'click' this.blog.retry}}>Retry</button>
```


### `query`

```js
import { query } from 'ember-data-resources';

export default class MyComponent extends Component {
  blog = query(this, 'blog', () => ({ ...query }));
  // blog = query(this, 'blog', () => [{ ...query }]);
  // blog = query(this, 'blog', () => [{ ...query }, { ...options }]);
}
```
```hbs
Available properties:
 - {{this.blog.records}}
 - {{this.blog.error}}
 - {{this.blog.isLoading}}
 - {{this.blog.isSuccess}}
 - {{this.blog.isError}}
 - {{this.blog.hasRun}}

Available methods:
 - <button {{on 'click' this.blog.retry}}>Retry</button>
```

### `queryRecord`

```js
import { queryRecord } from 'ember-data-resources';

export default class MyComponent extends Component {
  @tracked id = 1;

  blog = queryRecord(this, 'blog', () => ({ ...query }))
  // blog = findRecord(this, 'blog', () => [{ ...query }])
  // blog = findRecord(this, 'blog', () => [{ ...query }, { ...options }])
}
```
```hbs
Available properties:
 - {{this.blog.record}}
 - {{this.blog.error}}
 - {{this.blog.isLoading}}
 - {{this.blog.isSuccess}}
 - {{this.blog.isError}}
 - {{this.blog.hasRun}}

Available methods:
 - <button {{on 'click' this.blog.retry}}>Retry</button>
```

Contributing
------------------------------------------------------------------------------

See the [Contributing](CONTRIBUTING.md) guide for details.


License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
