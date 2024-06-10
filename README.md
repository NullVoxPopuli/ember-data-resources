# ember-data-resources

Resources for reactive data fetching with ember-data's `store` service.

## Compatibility

* ember-source v3.28 or above
* ember-data v3.28 or above
* ember-auto-import v2 or above
* ember-resources v5.3 or above
* typescript v4.8 or above

## Installation

```
npm add ember-data-resources
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
 - {{this.blog.hasRan}}

Available methods:
 - <button {{on 'click' this.blog.retry}}>Retry</button>
```

**in a template**

```hbs
{{#let (find-all 'blog') as |blogs|}}
  {{#if blogs.isLoading}}
      ...
  {{else if blogs.isError}}
    {{blogs.error}}
  {{else}}
    {{blogs.records}}
  {{/if}}

  Available properties:
   - {{blog.records}}
   - {{blog.error}}
   - {{blog.isLoading}}
   - {{blog.isSuccess}}
   - {{blog.isError}}
   - {{blog.hasRan}}

  Available methods:
   - <button {{on 'click' blog.retry}}>Retry</button>
{{/let}}
```

**in strict mode**

See: [First-class Component Templates](https://github.com/emberjs/rfcs/pull/779)

```jsx
import { FindAll } from 'ember-data-resources';

<template>
  {{#let (FindAll 'blog') as |blogs|}}
    ...
  {{/let}}
</template>
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
 - {{this.blog.hasRan}}

Available methods:
 - <button {{on 'click' this.blog.retry}}>Retry</button>
```

**in a template**

```hbs
{{#let (find-record 'blog' @id) as |blog|}}
{{!-- or: (find-record 'blog' @id options=...) --}}
  {{#if blog.isLoading}}
      ...
  {{else if blog.isError}}
    {{blog.error}}
  {{else}}
    {{blog.record}}
  {{/if}}

  Available properties:
   - {{blog.record}}
   - {{blog.error}}
   - {{blog.isLoading}}
   - {{blog.isSuccess}}
   - {{blog.isError}}
   - {{blog.hasRan}}

  Available methods:
   - <button {{on 'click' blog.retry}}>Retry</button>
{{/let}}
```

**in strict mode**

See: [First-class Component Templates](https://github.com/emberjs/rfcs/pull/779)

```jsx
import { FindRecord } from 'ember-data-resources';

<template>
  {{#let (FindRecord 'blog' @id) as |blog|}}
    ...
  {{/let}}
</template>
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
 - {{this.blog.hasRan}}

Available methods:
 - <button {{on 'click' this.blog.retry}}>Retry</button>
```

**in a template**

```hbs
{{#let (query 'blog' (hash ...)) as |blogs|}}
  {{#if blogs.isLoading}}
      ...
  {{else if blogs.isError}}
    {{blogs.error}}
  {{else}}
    {{blogs.records}}
  {{/if}}

  Available properties:
   - {{blog.records}}
   - {{blog.error}}
   - {{blog.isLoading}}
   - {{blog.isSuccess}}
   - {{blog.isError}}
   - {{blog.hasRan}}

  Available methods:
   - <button {{on 'click' blog.retry}}>Retry</button>
{{/let}}
```

**in strict mode**

See: [First-class Component Templates](https://github.com/emberjs/rfcs/pull/779)

```jsx
import { Query } from 'ember-data-resources';

<template>
  {{#let (Query 'blog' (hash ...)) as |blogs|}}
    ...
  {{/let}}
</template>
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
 - {{this.blog.hasRan}}

Available methods:
 - <button {{on 'click' this.blog.retry}}>Retry</button>
```

**in a template**

```hbs
{{#let (query-record 'blog' (hash ...)) as |blog|}}
  {{#if blog.isLoading}}
      ...
  {{else if blog.isError}}
    {{blog.error}}
  {{else}}
    {{blog.record}}
  {{/if}}

  Available properties:
   - {{blog.record}}
   - {{blog.error}}
   - {{blog.isLoading}}
   - {{blog.isSuccess}}
   - {{blog.isError}}
   - {{blog.hasRan}}

  Available methods:
   - <button {{on 'click' blog.retry}}>Retry</button>

{{/let}}
```

**in strict mode**

See: [First-class Component Templates](https://github.com/emberjs/rfcs/pull/779)

```jsx
import { QueryRecord } from 'ember-data-resources';

<template>
  {{#let (QueryRecord 'blog' (hash ...)) as |blog|}}
    ...
  {{/let}}
</template>
```

Contributing
------------------------------------------------------------------------------

See the [Contributing](CONTRIBUTING.md) guide for details.


License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
