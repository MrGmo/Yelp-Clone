require('dotenv').config();
const express = require('express');
const cors = require('cors')
const db = require('./db');
const morgan = require('morgan');
const app = express();

app.use(cors());
app.use(express.json())

//Get all Restaurants
app.get('/api/restaurants', async (req, res) => {
  try {
    const results = await db.query('select * from restaurants');
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
    const restaurant = await db.query('select * from restaurants where id = $1', [req.params.id]);

    const reviews = await db.query('select * from reviews where restaurant_id = $1', [req.params.id]);

    res.status(200).json({
      status: "success",
      data: {
        restaurant: restaurant.rows[0],
        reviews: reviews.rows
      },
    });
  }catch (err) {
  console.log(err)
  }
});

//Create a Restaurant
app.post('/api/restaurants', async (req, res) => {
  try {
    const results = await db.query('INSERT INTO restaurants (name, location, price_range) values ($1, $2, $3) returning *', [req.body.name, req.body.location, req.body.price_range]
    );
    res.status(201).json({
      status: 'status',
      data: {
        restaurant: results.rows[0]
      },
    });
  } catch (err) {
    console.log(err)
  }
 });

//Update Restaurant
app.put('/api/restaurants/:id', async (req, res) => {
 try {
   const results = await db.query('UPDATE restaurants SET name = $1, location = $2, price_range = $3 where id = $4 returning *', [req.body.name, req.body.location, req.body.price_range, req.params.id]
   );
   res.status(200).json({
    status: 'success',
    data: {
      restaurant: results.rows[0]
    },
  });
 } catch (err) {
   console.log(err)
 }
});

//Delete Restaurant
app.delete('/api/restaurants/:id', async (req, res) => {
  try {
    const results = await db.query('DELETE FROM restaurants where id = $1', [req.params.id])
    res.status(204).json({
      status: 'success'
    });
  } catch (err) {
    console.log(err)
  }
});

app.post('/api/restaurants/:id/addReview', async (req, res) => {
  try {
    const newReview = await db.query('INSERT INTO reviews (restaurant_id, name, review, rating) values ($1, $2, $3, $4) returning *;', [req.params.id, req.body.name, req.body.review, req.body.rating])
    res.status(201).json({
      status: 'success',
      data: {
        review: newReview.rows[0]
      }
    })
  } catch (err) {
    console.log(err)
  }
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
});