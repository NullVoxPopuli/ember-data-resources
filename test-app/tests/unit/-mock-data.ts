/* eslint-disable @typescript-eslint/no-explicit-any */
import * as QUnit from 'qunit';

import { http, HttpResponse } from 'msw';
import { setupWorker } from 'msw/browser';

let worker: ReturnType<typeof setupWorker>;

QUnit.begin(async () => {
  worker = setupWorker();
  await worker.start();
  // artificial timeout "just in case" worker takes a bit to boot
  await new Promise((resolve) => setTimeout(resolve, 1000));
  console.debug(worker.listHandlers());
});

QUnit.done(async () => {
  console.debug(worker.listHandlers());
  worker?.stop();
});

export function setupMockData(hooks: NestedHooks) {
  hooks.beforeEach(async function () {
    const data = [
      { id: '1', type: 'blog', attributes: { name: `name:1` } },
      { id: '2', type: 'blog', attributes: { name: `name:2` } },
      { id: '3', type: 'blog', attributes: { name: `name:3` } },
    ];

    // Remove handlers that were maybe added during a previous a test
    // this is useless now, but eventually I want setupMockData to pass
    // handlers
    worker.resetHandlers();

    worker.use(
      // The return type here is obnoxious... I'd argue not flexible enough.
      // any it is.
      http.get('/blogs', ({ request }): any => {
        let search = new URLSearchParams(request.url.split('?')[1]);
        const id = search.get('q[id]');

        if (id) {
          const record = data.find((datum) => datum.id === id);

          return HttpResponse.json({ data: record });
        }

        return HttpResponse.json({ data });
      }),

      // The return type here is obnoxious... I'd argue not flexible enough.
      // any it is.
      http.get('/blogs/:id', ({ params }): any => {
        const { id } = params;

        const record = data.find((datum) => datum.id === id);

        if (record) {
          return HttpResponse.json({ data: record });
        }

        return HttpResponse.json(
          { errors: [{ status: '404', detail: 'Blog not found' }] },
          { status: 404 },
        );
      }),
    );
  });

  hooks.afterEach(function () {
    worker?.resetHandlers();
  });
}
