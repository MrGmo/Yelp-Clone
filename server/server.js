require('dotenv').config();
const express = require('express');
const app = express();


app.get('/getRestaurants', (req, res) => {
  console.log('get all restaurants')
});

console.log('another test...')


const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
});