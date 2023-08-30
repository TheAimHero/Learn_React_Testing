import { rest } from 'msw';
import { setupServer } from 'msw/node';

export default function createServer(serverConfigOptions) {
  const handlers = serverConfigOptions.map(options => {
    return rest[options.method || 'get'](options.path, (req, res, ctx) => {
      return res(ctx.json(options.res(req, res, ctx)));
    });
  });

  const server = setupServer(...handlers);

  beforeAll(() => server.listen());

  afterEach(() => server.resetHandlers());

  afterAll(() => server.close());
}
