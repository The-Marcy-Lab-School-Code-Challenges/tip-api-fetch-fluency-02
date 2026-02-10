# **Code Challenge: API Fetch Fluency**

**Instructions**

1. Clone down this assignment to your `tip-challenges` directory in your environment.
2. Code your solution using JavaScript in `index.js`.
3. **Be sure to run and test your code thoroughly.**
4. By the end of class, **commit and push your changes up to Github**.
5. Using the browser, verify that your solution is in your remote repo on GitHub.

---

## Overview

This challenge focuses on making fetch requests to an API and building functions that manipulate the returned data. You'll be working with the [DummyJSON Products API](https://dummyjson.com/docs/products) to practice API calls and data processing.

**Note:** This challenge runs in **Node.js**, not in the browser. You'll need to use Node's built-in `fetch` (available in Node 18+) or install a package like `node-fetch`.

---

## API Endpoints

You'll be working with two endpoints:

1. **Get all products:**
   ```js
   fetch('https://dummyjson.com/products')
   ```

2. **Get a single product by ID:**
   ```js
   fetch('https://dummyjson.com/products/{id}')
   ```
   Replace `{id}` with an actual product ID (e.g., `fetch('https://dummyjson.com/products/1')`)

---

## index.js

The code in `index.js` uses two helper functions and two main functions. Here's what each one does.

### Helper Functions

#### `fetchAllProducts()`

This helper calls the products API and returns the parsed JSON so other functions can use the data. **The function should return a Promise** that resolves to the API response object.

**Steps (high level):**
1. Call the API to get all products.
2. Parse the response as JSON.
3. Return that data (a Promise that resolves to an object with a `products` array).

```js
fetchAllProducts()
// → Returns a Promise that resolves to the API response object (with a products array)
```

#### `fetchProductById(productId)`

This helper fetches one product by ID and returns its data so callers can use fields like `reviews` or `title`. **The function should return a Promise** that resolves to the product object.

**Steps (high level):**
1. Call the API with the given product ID.
2. Parse the response as JSON.
3. Return that data (a Promise that resolves to the product object).

```js
fetchProductById(1)
// → Returns a Promise that resolves to a product object
```

---

### Main Functions

#### 1. `sumAllPrices()`

This function adds up every product’s price and returns the total. **The function should return a Promise** that resolves to that number.

**Steps (high level):**
1. Get all products (using the helper).
2. Read the `products` array from the response.
3. Add up each product’s `price`.
4. Return a Promise that resolves to that total (or 0 if there are no products).

```js
sumAllPrices()
// → Returns a Promise that resolves to a number (sum of all product prices)
```

---

#### 2. `getReviewerEmails(productId)`

This function returns a list of email addresses from the reviews for one product. **The function should return a Promise** that resolves to that array.

**Steps (high level):**
1. Fetch the product for the given ID (using the helper).
2. Read the product’s `reviews` array.
3. For each review, get the email (from `reviewerEmail` or `email`, whichever exists).
4. Return a Promise that resolves to that list of emails.

```js
getReviewerEmails(1)
// → Returns a Promise that resolves to an array of email strings (or undefined/null for missing emails)
```

---

### More Problems

These functions follow the same pattern: use the helpers, then filter or compute over the product data.

#### 3. `getBeautyProducts()`

Write a function that returns only the products whose `tags` array includes the string "beauty". Use `fetchAllProducts()` to get the data, then filter the `products` array and return the result. **The function should return a Promise** that resolves to that array.

```js
getBeautyProducts()
// → Returns a Promise that resolves to an array of product objects with the "beauty" tag
```

---

#### 4. `getSumOfPricesForMediumWeightProducts()`

Write a function that returns the sum of the prices of all products whose weight is between 3 and 6 pounds (inclusive). Use `fetchAllProducts()` to get the data, then filter by the product’s weight field and sum the prices of the matching products. **The function should return a Promise** that resolves to that number.

```js
getSumOfPricesForMediumWeightProducts()
// → Returns a Promise that resolves to a number (sum of prices for products weighing between 3 and 6 lbs)
```

---

#### 5. `getHighlyRatedProducts()`

Write a function that returns only the products whose `rating` is greater than or equal to 4. Use `fetchAllProducts()` to get the data, then filter the `products` array by rating and return the result. **The function should return a Promise** that resolves to that array.

```js
getHighlyRatedProducts()
// → Returns a Promise that resolves to an array of product objects with rating >= 4
```

---
## Tips

- Remember that `fetch()` returns a Promise, so you'll need to use `.then()` to handle the response
- The API returns JSON data, so you'll need to call `.json()` on the response
- Use arrow function syntax: `const functionName = () => { ... }`
- Check the API response structure by logging it first to understand the data format
- Test each function individually before moving to the next one
- The helper functions should return the data directly (not save to variables)

---

## Testing Your Code

You can test your functions by calling them in `index.js`, or run the full test suite.

**Run the test suite (recommended):**
```bash
npm test
```

See the [Test Suite](#test-suite) section above for what each test checks.

**Run your code manually:**
```bash
node index.js
```
