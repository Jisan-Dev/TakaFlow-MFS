const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const PORT = 3000 || process.env.PORT;
// const bcrypt = require('bcryptjs');
const userHandler = require('./routeHandlers/userHandler');

// express app initialization
const app = express();
app.use(express.json());

// cors
const cors = require('cors');
const corsOptions = {
  origin: ['http://localhost:5173'],
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

// cookie parse
const cookieParser = require('cookie-parser');
app.use(cookieParser());

// database connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch((error) => console.error('Error connecting to the database', error));

// Application routes
app.use('/users', userHandler);

app.get('/', (req, res) => {
  res.send('Hello from Takaflow Express Server');
});

// default error handler
function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500).json({
    error: {
      message: err.message || 'Server Error',
    },
  });
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
