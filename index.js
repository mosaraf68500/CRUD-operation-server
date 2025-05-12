const express = require('express');
const cors = require('cors');
const app=express();
const port=process.env.PORT || 3000;


// middleware
app.use(cors());
app.use(express.json());

// user:CRUD
// pass: R2HKHmVRhQCKNyD0


app.get("/",(req,res)=>{
    res.send("simple crud operaton server");
});

app.listen(port,()=>{
    console.log(`simple CRUD opertion server running on:${port}`);
})