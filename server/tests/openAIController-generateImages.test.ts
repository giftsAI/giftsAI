import type { Request, Response } from 'express';
import { generateImages } from '../controllers/openAIController';

describe('Test generateImages middleware', () => {
  it('should invoke the express next funciton with an error object, when no gift recommendation is provided', async () => {
    const req = {};
    const res = { locals: { recommendations: [] } };
    const next = jest.fn();

    await generateImages(req as Request, res as unknown as Response, next);
    expect(next.mock.calls).toHaveLength(1);
    expect(next.mock.calls[0][0]).toEqual({
      log: `Error with generating images: no gift recommendation provided`,
      status: 500,
      message: 'An error occurred during your request.',
    });
  });

  it('should return five urls for the images', async () => {
    const req = {};
    const res = {
      locals: {
        recommendations: [
          'Gaming console',
          'Gaming headset',
          'Gaming chair',
          'Gaming mouse',
          'Gaming keyboard',
        ],
        images: [],
      },
    };
    const next = jest.fn();

    await generateImages(req as Request, res as unknown as Response, next);
    expect(res.locals.images.length).toEqual(5);
    expect(
      res.locals.images.every(
        (url: string) =>
          typeof url === 'string' && url.slice(0, 8) === 'https://'
      )
    );
  }, 20000);
});
