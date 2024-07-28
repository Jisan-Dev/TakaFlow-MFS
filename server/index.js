const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 3000;
let jwt = require('jsonwebtoken');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.chn7ebi.mongodb.net/?appName=Cluster0`;

app.use(
  cors({
    origin: ['http://localhost:5173/'],
  })
);
app.use(express.json());

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
