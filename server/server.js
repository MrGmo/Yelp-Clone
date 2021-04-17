require('dotenv').config();
const express = require('express');
const db = require('./db');
const morgan = require('morgan');
const app = express();


app.use(express.json())


//Get all Restaurants
app.get('/api/restaurants', async (req, res) => {
  try {
    const results = await db.query('select * from restaurants');
    console.log(results);
    res.status(200).json({
      status: 'success',
      results: results.rows.length,
      data: {
        restaurants: results.rows,
    },
  });
  } catch (err){
    console.log(err)
  }
});


//Get a Restaurant
app.get('/api/restaurants/:id', async (req, res) => {
 console.log(req.params.id);
  try {
    const results = await db.query('select * from restaurants where id = $1', [req.params.id]);
    res.status(200).json({
      status: "success",
      data: {
        restaurant: results.rows[0],
      },
    });
  }catch (err) {
    console.log(err)
  }
});


//Create a Restaurant
app.post('/api/restaurants', (req, res) => {
  console.log(req.body);
  res.status(201).json({
    status: 'status',
    data: {
      restaurant: 'mcdonalds'
    }
  });
 });


//Update Restaurant
app.put('/api/restaurants/:id', (req, res) => {
  console.log(req.params.id);
  console.log(req.body);
  res.status(200).json({
    status: 'success',
    data: {
      restaurant: 'mcdonalds'
    }
  });
});


//Delete Restaurant
app.delete('/api/restaurants/:id', (req, res) => {
  res.status(204).json({
    status: 'success'
  });
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
});