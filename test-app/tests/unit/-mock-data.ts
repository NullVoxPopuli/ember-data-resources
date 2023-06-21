import * as QUnit from 'qunit';

import { rest, setupWorker } from 'msw';

let worker: ReturnType<typeof setupWorker>;

QUnit.begin(async () => {
  worker = setupWorker();
  await worker.start();
  // artificial timeout "just in case" worker takes a bit to boot
  await new Promise((resolve) => setTimeout(resolve, 1000));
  worker.printHandlers();
});

QUnit.done(async () => {
  worker.printHandlers();
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
      rest.get('/blogs', (req, res, ctx) => {
        const id = req.url.searchParams.get('q[id]');

        if (id) {
          const record = data.find((datum) => datum.id === id);

          return res(ctx.json({ data: record }));
        }

        return res(ctx.json({ data }));
      }),

      rest.get('/blogs/:id', (req, res, ctx) => {
        const { id } = req.params;

        const record = data.find((datum) => datum.id === id);

        if (record) {
          return res(ctx.json({ data: record }));
        }

        return res(
          ctx.status(404),
          ctx.json({ errors: [{ status: '404', detail: 'Blog not found' }] })
        );
      })
    );
  });

  hooks.afterEach(function () {
    worker?.resetHandlers();
  });
}
