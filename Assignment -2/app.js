const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

app.use(express.json());

app.get('/categories/:categoryName/products', async (req, res) => {
  const categoryName = req.params.categoryName;
  const { n = 10, page = 1, sort = 'rat_des' } = req.query;

  try {
    const products = await fetchProduct(categoryName, n, page, sort);
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

async function fetchTopProduct(categoryName, n, page, sort) {
  const testData = [
    {
         id: 1,
        name: 'Product A', 
        rating: 4.5, 
        price: 49.99,
        company: 'Company A', 
        discount: 10
    },
    { 
        id: 2,
        name: 'Product B',
        rating: 4.2, 
        price: 39.99, 
        company: 'Company B', 
        discount: 5 
    },
  ];

  switch (sort) {
    case 'rating_asc':
      testData.sort((a, b) => a.rating - b.rating);
      break;
    case 'rating_desc':
      testData.sort((a, b) => b.rating - a.rating);
      break;
    case 'company_asc':
      testData.sort((a, b) => a.company.localeCompare(b.company));
      break;
    case 'company_desc':
      testData.sort((a, b) => b.company.localeCompare(a.company));
      break;
    default:
      testData.sort((a, b) => b.rating - a.rating); 
  }


 
}

app.listen(port, () => {
  console.log(`Server running at Port: ${port}`);
});
