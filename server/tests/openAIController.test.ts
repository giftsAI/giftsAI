import type { Request, Response } from 'express';
import getGiftRecommendations from '../controllers/openAIController';

describe('Test getGiftRecommendations middleware', () => {
  it('should return five gift recommendations', async () => {
    const req = {
      body: {
        receiver: 'wife',
        occasion: 'birthday',
        interest: 'cooking',
        budget: '<$200',
      },
    };
    const res = { locals: { recommendations: [] } };
    const next = jest.fn();

    await getGiftRecommendations(
      req as Request,
      res as unknown as Response,
      next
    );
    expect(res.locals).toHaveProperty('recommendations');
    expect(res.locals.recommendations).toBeInstanceOf(Array);
    expect(res.locals.recommendations).toHaveLength(5);
    expect(
      res.locals.recommendations.every((rec) => typeof rec === 'string')
    ).toEqual(true);
  });
});
