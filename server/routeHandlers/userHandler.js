const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

router.post('/', async (req, res) => {
  try {
    const user = new User(req.body);
    const isExist = await User.findOne({ email: user.email });
    if (isExist) {
      res.status(409).send({ message: 'User already exists' });
      return;
    }

    // hash the pin of the user with bcryptjs
    const hashedPin = await bcrypt.hash(user.pin, 10);
    user.pin = hashedPin;
    // user.createdAt = Date.now();

    const result = await user.save();

    res.status(200).send({ result });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
