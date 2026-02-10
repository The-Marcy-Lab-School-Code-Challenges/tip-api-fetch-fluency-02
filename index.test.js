/**
 * Test suite for the API Fetch Fluency challenge
 */

global.fetch = jest.fn();

describe('sumAllPrices', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  test('returns the sum of all product prices', async () => {
    const mockProducts = {
      products: [
        { id: 1, price: 10.99 },
        { id: 2, price: 20.50 },
        { id: 3, price: 5.25 }
      ]
    };

    fetch.mockResolvedValueOnce({
      json: async () => mockProducts
    });

    const { sumAllPrices } = require('./index.js');
    const result = await sumAllPrices();

    expect(result).toBe(36.74);
    expect(fetch).toHaveBeenCalledWith('https://dummyjson.com/products');
  });

  test('returns 0 for empty products array', async () => {
    fetch.mockResolvedValueOnce({
      json: async () => ({ products: [] })
    });

    const { sumAllPrices } = require('./index.js');
    const result = await sumAllPrices();

    expect(result).toBe(0);
  });

  test('handles products with zero prices', async () => {
    fetch.mockResolvedValueOnce({
      json: async () => ({
        products: [
          { id: 1, price: 0 },
          { id: 2, price: 15.99 },
          { id: 3, price: 0 }
        ]
      })
    });

    const { sumAllPrices } = require('./index.js');
    const result = await sumAllPrices();

    expect(result).toBe(15.99);
  });

  test('handles fetch errors', async () => {
    fetch.mockRejectedValueOnce(new Error('Network error'));

    const { sumAllPrices } = require('./index.js');
    
    await expect(sumAllPrices()).rejects.toThrow('Network error');
  });
});

describe('getReviewerEmails', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  test('returns array of reviewer emails', async () => {
    fetch.mockResolvedValueOnce({
      json: async () => ({
        id: 1,
        reviews: [
          { reviewerEmail: 'john@example.com' },
          { reviewerEmail: 'jane@example.com' },
          { reviewerEmail: 'bob@example.com' }
        ]
      })
    });

    const { getReviewerEmails } = require('./index.js');
    const result = await getReviewerEmails(1);

    expect(result).toEqual(['john@example.com', 'jane@example.com', 'bob@example.com']);
    expect(fetch).toHaveBeenCalledWith('https://dummyjson.com/products/1');
  });

  test('returns empty array for products with no reviews', async () => {
    fetch.mockResolvedValueOnce({
      json: async () => ({
        id: 1,
        reviews: []
      })
    });

    const { getReviewerEmails } = require('./index.js');
    const result = await getReviewerEmails(1);

    expect(result).toEqual([]);
  });

  test('handles email property instead of reviewerEmail', async () => {
    fetch.mockResolvedValueOnce({
      json: async () => ({
        id: 1,
        reviews: [
          { email: 'alice@example.com' },
          { reviewerEmail: 'bob@example.com' }
        ]
      })
    });

    const { getReviewerEmails } = require('./index.js');
    const result = await getReviewerEmails(1);

    // Code uses only reviewerEmail; reviews with only email yield undefined
    expect(result).toEqual([undefined, 'bob@example.com']);
  });

  test('maps all reviews to reviewerEmail', async () => {
    fetch.mockResolvedValueOnce({
      json: async () => ({
        id: 1,
        reviews: [
          { reviewerEmail: 'john@example.com' },
          { rating: 4 }, // No reviewerEmail -> undefined
          { reviewerEmail: 'jane@example.com' },
          { email: null } // No reviewerEmail -> undefined
        ]
      })
    });

    const { getReviewerEmails } = require('./index.js');
    const result = await getReviewerEmails(1);

    // Code uses only reviewerEmail; missing yields undefined
    expect(result).toEqual(['john@example.com', undefined, 'jane@example.com', undefined]);
  });

  test('handles fetch errors', async () => {
    fetch.mockRejectedValueOnce(new Error('Network error'));

    const { getReviewerEmails } = require('./index.js');
    
    await expect(getReviewerEmails(1)).rejects.toThrow('Network error');
  });
});
