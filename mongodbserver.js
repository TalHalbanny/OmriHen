const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongodb = require('mongodb');
const cors = require('cors');



const port = 3000; 
const app = express();

const dbname = 'OmriHen';
const collname = 'ForSale';
const dblink = 'mongodb://localhost:27017';

const mongoclient = new mongodb.MongoClient(dblink);


app.use(cors());


app.use(cors());
app.use(express.static(path.join(__dirname))); // server for the directory of OmriHen Folder only.


//API For JSON Retrival from Mongo Collection.

app.get('/api/forsale', async (req, res) => {
    try {
        await mongoclient.connect();
        const db = mongoclient.db(dbname); //define database
        const collection = db.collection(collname); //define collection within database 
        
        const collectiondata = await collection.find().toArray();
        res.json(collectiondata);
    }
    catch (err) {
        console.error("Error Fetching Data:" + err);
        res.status(500).json({ error: "Internal Server Error"})
    }
});



app.listen(port, (err) => {
    if (err) throw err;
    console.log("Server Running on Port 3000")
}) 
