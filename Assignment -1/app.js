const express = require('express');
const app = express();
const mongoose = require('mongoose');
const session = require('express-session')


app.use(express.urlencoded({extended:true}));


app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie:{
        httpOnly:true,
        maxAge: 7 * 24 * 60 * 60 * 1000 * 1
    }
}))





app.use(express.json())
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));



let windowState = {
  numbers: [],
  maxSize: 10,
  average: 0
};

    app.get('/numbers/:numberid', async (req, res) => {
    const numberId = req.params.numberid;

    try {
        const numbers = await fetchNo(numberId);
        update(numbers);

    const find = {
      numbers: numbers,
      windowPrevState: [...windowState.numbers],
      windowCurrState: [...windowState.numbers],
      avg: calculate(windowState.numbers).toFixed(2)
    };
  } 
  catch (error) {
    console.error('Error fetching or processing data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


async function fetchNo(numberId) {
  const url = `http://20.244.56.144/test/${numberId}`;
  const find = await fetch(url);
  const data = await find.json();
  return data.numbers;
}

 

const port=9876;
app.listen(port, () => {
  console.log(`Server running at Port:${port}`);
});
