const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
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
    const collectiondb=  client.db('usersdb').collection('users');

    // get

    app.get("/users", async(req,res)=>{
        const cursor=collectiondb.find();
        const result=await cursor.toArray();
        res.send(result)

    })


    // find onee

    app.get("/users/:id", async(req,res)=>{
        const id=req.params.id;
        const query={_id:new ObjectId(id)};
        const result=await collectiondb.findOne(query);
        res.send(result)
    })

    // post
    app.post("/users", async(req,res)=>{
        const newUser=req.body;
        const result=await collectiondb.insertOne(newUser);
        res.send(result)
    })

    // DELETE

    app.delete("/users/:id", async(req,res)=>{
        const id=req.params.id;
        const query={_id: new ObjectId(id)}
        const result=await collectiondb.deleteOne(query);
        res.send(result);
        console.log('to be deleted',id)
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
