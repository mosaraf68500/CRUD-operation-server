const express = require("express");
const { MongoClient, ServerApiVersion } = require("mongodb");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;

// middleware
app.use(cors());
app.use(express.json());

// user:CRUD
// pass: R2HKHmVRhQCKNyD0

const uri =
  "mongodb+srv://CRUD:R2HKHmVRhQCKNyD0@cluster0.nobizgo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

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
    await client.connect();
    const database=client.db('usersdb');
    const userCollection=database.collection('users')

    app.post("/users", async(req,res)=>{
        console.log("data in the server",req.body);
        const newUser=req.body;
        const result=await userCollection.insertOne(newUser);
        res.send(result);


    })
    
  } finally {
    
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("simple crud operaton server");
});

app.listen(port, () => {
  console.log(`simple CRUD opertion server running on:${port}`);
});
