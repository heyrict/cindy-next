import { webhookPost } from '../webhook';

const endpoint = '/v1/graphql';
const ping = {
  foo: 'bar',
};

describe('test webhookPost', () => {
  beforeAll(() => {
    global.fetch = jest.fn().mockImplementation(
      (_endpoint, ping) =>
        new Promise(resolve =>
          resolve({
            ok: true,
            json: () => ({
              ...JSON.parse(ping.body),
            }),
          }),
        ),
    );
  });

  it('test', () => {
    webhookPost(endpoint, ping).then(pong => {
      expect(pong).toStrictEqual(ping);
    });
  });
});
