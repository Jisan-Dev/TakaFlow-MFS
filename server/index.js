const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 3000;
let jwt = require('jsonwebtoken');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.chn7ebi.mongodb.net/?appName=Cluster0`;
var bcrypt = require('bcryptjs');
const cookieParser = require('cookie-parser');
const { verifyToken } = require('./middlewares/verifyToken');

const corsOption = {
  origin: ['http://localhost:5173'],
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOption));
app.use(express.json());
app.use(cookieParser());

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
async function run() {
  try {
    const db = client.db('TakaFlowDB');
    const userCollection = db.collection('users');

    // generate jwt and set at cookies
    app.post('/jwt', async (req, res) => {
      const user = req.body;
      const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '365d' });
      res
        .cookie('token', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        })
        .send({ success: true });
    });

    // to find current user
    app.get('/currUser', verifyToken, async (req, res) => {
      const { phoneOrEmail } = req.user;
      let user = {};
      if (phoneOrEmail.includes('@')) {
        user = await userCollection.findOne({ email: phoneOrEmail });
      } else {
        user = await userCollection.findOne({ phone: phoneOrEmail });
      }
      res.send(user);
    });

    // to add a new user
    app.post('/users', async (req, res) => {
      const user = req.body;
      const isExist = await userCollection.findOne({ email: user.email });
      if (isExist) {
        res.status(409).send({ message: 'User already exists' });
        return;
      }

      // hash the pin of the user with bcryptjs
      const hashedPin = await bcrypt.hash(user.pin, 10);
      user.pin = hashedPin;
      user.createdAt = Date.now();

      const result = await userCollection.insertOne(user);

      // const isPinValid = await bcrypt.compare('12346', hashedPin);
      // console.log(isPinValid);

      res.send(result);
    });

    // to login a user
    app.post('/login', async (req, res) => {
      const { phoneOrEmail, pin } = req.body;
      let user = {};
      if (phoneOrEmail.includes('@')) {
        user = await userCollection.findOne({ email: phoneOrEmail });
      } else {
        user = await userCollection.findOne({ phone: phoneOrEmail });
      }

      if (!user) {
        res.status(401).send({ message: 'Invalid Credentials' });
        return;
      }
      // compare the hashed pin of the user with the provided pin
      const isPinValid = await bcrypt.compare(pin, user.pin);
      if (!isPinValid) {
        res.status(401).send({ success: false, message: 'Invalid Credentials' });
        return;
      }
      res.status(200).json({ success: true, message: 'Logged in successfully', user });
    });

    // Send a ping to confirm a successful connection
    await client.db('admin').command({ ping: 1 });
    console.log('Pinged your deployment. You successfully connected to MongoDB!');
  } finally {
  }
}
run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('hello world from takaFlow server');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
