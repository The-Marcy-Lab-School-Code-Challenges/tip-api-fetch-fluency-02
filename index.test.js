/**
 * Test suite for the API Fetch Fluency challenge.
 * Expected behavior (answers) is defined by the reference implementation in index copy.js.
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

  test('handles email property instead of reviewerEmail (reviewerEmail || email)', async () => {
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

    // Reference: index copy.js uses review.reviewerEmail || review.email
    expect(result).toEqual(['alice@example.com', 'bob@example.com']);
  });

  test('maps all reviews to email (reviewerEmail or email); missing yields undefined/null', async () => {
    fetch.mockResolvedValueOnce({
      json: async () => ({
        id: 1,
        reviews: [
          { reviewerEmail: 'john@example.com' },
          { rating: 4 }, // No email -> undefined
          { reviewerEmail: 'jane@example.com' },
          { email: null } // reviewerEmail undefined, email null -> null
        ]
      })
    });

    const { getReviewerEmails } = require('./index.js');
    const result = await getReviewerEmails(1);

    // Reference: index copy.js uses review.reviewerEmail || review.email
    expect(result).toEqual(['john@example.com', undefined, 'jane@example.com', null]);
  });

  test('handles fetch errors', async () => {
    fetch.mockRejectedValueOnce(new Error('Network error'));

    const { getReviewerEmails } = require('./index.js');
    
    await expect(getReviewerEmails(1)).rejects.toThrow('Network error');
  });
});

describe('getBeautyProducts', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  test('returns only products with "beauty" tag', async () => {
    fetch.mockResolvedValueOnce({
      json: async () => ({
        products: [
          { id: 1, title: 'Mascara', tags: ['beauty', 'mascara'] },
          { id: 2, title: 'Laptop', tags: ['electronics'] },
          { id: 3, title: 'Lipstick', tags: ['beauty'] }
        ]
      })
    });

    const { getBeautyProducts } = require('./index.js');
    const result = await getBeautyProducts();

    expect(result).toEqual([
      { id: 1, title: 'Mascara', tags: ['beauty', 'mascara'] },
      { id: 3, title: 'Lipstick', tags: ['beauty'] }
    ]);
    expect(fetch).toHaveBeenCalledWith('https://dummyjson.com/products');
  });

  test('returns empty array when no products have beauty tag', async () => {
    fetch.mockResolvedValueOnce({
      json: async () => ({
        products: [
          { id: 1, tags: ['electronics'] },
          { id: 2, tags: ['home'] }
        ]
      })
    });

    const { getBeautyProducts } = require('./index.js');
    const result = await getBeautyProducts();

    expect(result).toEqual([]);
  });

  test('handles fetch errors', async () => {
    fetch.mockRejectedValueOnce(new Error('Network error'));

    const { getBeautyProducts } = require('./index.js');
    await expect(getBeautyProducts()).rejects.toThrow('Network error');
  });
});

describe('getSumOfPricesForMediumWeightProducts', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  test('returns sum of prices for products weighing between 3 and 6 lbs', async () => {
    fetch.mockResolvedValueOnce({
      json: async () => ({
        products: [
          { id: 1, price: 10, weight: 2 },
          { id: 2, price: 20, weight: 4 },
          { id: 3, price: 15, weight: 6 },
          { id: 4, price: 5, weight: 8 }
        ]
      })
    });

    const { getSumOfPricesForMediumWeightProducts } = require('./index.js');
    const result = await getSumOfPricesForMediumWeightProducts();

    expect(result).toBe(35); // 20 + 15 (weights 4 and 6 are in range)
    expect(fetch).toHaveBeenCalledWith('https://dummyjson.com/products');
  });

  test('returns 0 when no products in weight range', async () => {
    fetch.mockResolvedValueOnce({
      json: async () => ({
        products: [
          { id: 1, price: 10, weight: 1 },
          { id: 2, price: 20, weight: 10 }
        ]
      })
    });

    const { getSumOfPricesForMediumWeightProducts } = require('./index.js');
    const result = await getSumOfPricesForMediumWeightProducts();

    expect(result).toBe(0);
  });

  test('handles fetch errors', async () => {
    fetch.mockRejectedValueOnce(new Error('Network error'));

    const { getSumOfPricesForMediumWeightProducts } = require('./index.js');
    await expect(getSumOfPricesForMediumWeightProducts()).rejects.toThrow('Network error');
  });
});

describe('getHighlyRatedProducts', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  test('returns only products with rating >= 4', async () => {
    fetch.mockResolvedValueOnce({
      json: async () => ({
        products: [
          { id: 1, title: 'Good', rating: 4.5 },
          { id: 2, title: 'Bad', rating: 2 },
          { id: 3, title: 'Great', rating: 4 }
        ]
      })
    });

    const { getHighlyRatedProducts } = require('./index.js');
    const result = await getHighlyRatedProducts();

    expect(result).toEqual([
      { id: 1, title: 'Good', rating: 4.5 },
      { id: 3, title: 'Great', rating: 4 }
    ]);
    expect(fetch).toHaveBeenCalledWith('https://dummyjson.com/products');
  });

  test('returns empty array when no products have rating >= 4', async () => {
    fetch.mockResolvedValueOnce({
      json: async () => ({
        products: [
          { id: 1, rating: 3 },
          { id: 2, rating: 1.5 }
        ]
      })
    });

    const { getHighlyRatedProducts } = require('./index.js');
    const result = await getHighlyRatedProducts();

    expect(result).toEqual([]);
  });

  test('handles fetch errors', async () => {
    fetch.mockRejectedValueOnce(new Error('Network error'));

    const { getHighlyRatedProducts } = require('./index.js');
    await expect(getHighlyRatedProducts()).rejects.toThrow('Network error');
  });
});
