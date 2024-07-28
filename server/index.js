const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 3000;
let jwt = require('jsonwebtoken');

app.use(
  cors({
    origin: ['http://localhost:5173/'],
  })
);
app.use(express.json());

app.get('/', (req, res) => {
  res.send('hello world from takaFlow server');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
