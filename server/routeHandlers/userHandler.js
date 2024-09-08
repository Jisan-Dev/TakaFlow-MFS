const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

router.post('/', async (req, res) => {
  try {
    const user = new User(req.body);
    const isExist = await User.findOne({ email: user.email });
    if (isExist) {
      res.status(409).json({ message: 'User already exists' });
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

router.get('/', async (req, res) => {
  const { phoneOrEmail, pin } = req.query;
  // let user = {};
  try {
    // if (phoneOrEmail.includes('@')) {
    //   user = await userCollection.findOne({ email: phoneOrEmail });
    // } else {
    //   user = await userCollection.findOne({ phone: phoneOrEmail });
    // }
    // Find user by username
    const query = {
      $or: [{ phone: phoneOrEmail }, { email: phoneOrEmail }],
    };
    const user = await User.findOne(query, { projection: { _id: 0 } });
    console.log(phoneOrEmail, pin);

    if (!user) {
      res.status(401).send({ message: 'Invalid Credentials' });
      return;
    }
    // compare the hashed pin of the user with the provided pin
    const isPinValid = bcrypt.compare(pin, user.pin);
    if (!isPinValid) {
      res.status(401).send({ success: false, message: 'Invalid Credentials' });
      return;
    }
    res.status(200).json({ success: true, message: 'Logged in successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', success: false, error });
  }
});

module.exports = router;
