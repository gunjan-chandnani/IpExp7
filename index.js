const express = require('express');
const app = express();
const PORT = 3000;
const products = require('./data/products');

app.get('/products', (req, res) => {
  res.json(products);
});
app.get('/products/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const product = products.find(p => p.id === productId);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  });
  app.get('/search', (req, res) => {
    const { category, maxPrice } = req.query;
    let filteredProducts = products;
  
    if (category) {
      filteredProducts = filteredProducts.filter(p => p.category === category);
    }
    if (maxPrice) {
      filteredProducts = filteredProducts.filter(p => p.price <= parseInt(maxPrice));
    }
  
    res.json(filteredProducts);
  });
  
  

app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
