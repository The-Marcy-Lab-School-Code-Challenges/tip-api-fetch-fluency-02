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

In `index.js`, you'll need to implement helper functions and two main functions. Each function should make the appropriate API call(s) and process the returned data.

### Helper Functions

#### `fetchAllProducts()`

Write a helper function that:
- Fetches all products from the API
- Returns the products array from the response

**Example:**
```js
fetchAllProducts()
// → Returns a Promise that resolves to an array of products
```

#### `fetchProductById(productId)`

Write a helper function that:
- Takes a `productId` (number) as a parameter
- Fetches the specific product by ID
- Returns the product object

**Example:**
```js
fetchProductById(1)
// → Returns a Promise that resolves to a product object
```

---

### Main Functions

#### 1. `sumAllPrices()`

Write a function that:
- Uses `fetchAllProducts()` to get all products
- Calculates and returns the **sum of all product prices**

**Example:**
```js
sumAllPrices()
// → Returns a Promise that resolves to a number representing the total sum of all product prices
```

---

#### 2. `getReviewerEmails(productId)`

Write a function that:
- Takes a `productId` (number) as a parameter
- Uses `fetchProductById()` to get the specific product
- Extracts and returns an array of **all reviewer email addresses** for that product
- Handles cases where reviews might use `reviewerEmail` or `email` property
- Filters out any reviews that don't have an email

**Example:**
```js
getReviewerEmails(1)
// → Returns a Promise that resolves to an array of email strings, e.g., ['john@example.com', 'jane@example.com']
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

You can test your functions by calling them in `index.js`:

Run your code with:
```bash
node index.js
```

Or run the test suite:
```bash
npm test
```
