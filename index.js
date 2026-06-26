const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();

app.use(cors())

const port = process.env.PORT || 7000;


const items = [
  {
    id: 1,
    name: "Laptop",
    description: "A portable computer for work and gaming."
  },
  {
    id: 2,
    name: "Headphones",
    description: "Wireless headphones with noise cancellation."
  },
  {
    id: 3,
    name: "Smartwatch",
    description: "A wearable device to track fitness and notifications."
  }
];

//basic-curd-server-two
//LFJa1ZDWXcZVknDF


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = process.env.DB_URI;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });

    const db = client.db("e-commerce");
    const productCollection = db.collection("products");

    app.get("/products", async (req, res) => {
      const cursor = productCollection.find();
      const result = await cursor.toArray();
      // console.log(result);
      // console.log(cursor);
      res.send(result);
    })
    
    app.get("/products/:productId", async (req, res) => {
      // const params
      // console.log(req.params.productId);
      const productId = req.params.productId;
      console.log(productId);
      const query = {_id: new ObjectId(productId)}

      // console.log(query);

      const result = await productCollection.findOne(query);
      // console.log(result);
      res.send(result)
      
    })

    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



app.get('/', (req, res) => {
  res.send('Alhamdulillah Basic Curd Server is Running. Alhamdulillah');
});

app.get("/items", (req, res) => {
    res.send(items)
})

app.listen(port, () => {
  console.log(`Basic curd server is running ${port}`);
});