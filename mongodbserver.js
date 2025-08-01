const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongodb = require('mongodb');

const port = 3000; 
const app = express();

const dbname = 'OmriHen';
const collname = 'ForSale';
const dblink = 'mongodb://localhost:27017';

const mongoclient = new mongodb.MongoClient(dblink);

async function connectToMongoDB(){
    try {
        await mongoclient.connect();
        console.log("Connected to Mongo Server Successfully")
        const db = mongoclient.db(dbname);
        const collection = db.collection(collname);

        //after connection get data from collection JSON to array.

        const collectiondata = await collection.find().toArray();
       
        collectiondata.forEach(doc => {
            console.log("Model:" + " " + doc.model + " " + "|" + " " + "Make:" + " " + doc.make + " " + "|" + " " + "Millage:" + " " + doc.km + " " + "|" + " " + "Year:" + " " + doc.year);
        });

    } catch (err) {
        console.error("Error in Establishing Connection to MongoDB");   
        }
}
    
connectToMongoDB();





app.listen(port, (err) => {
    if (err) throw err;
    console.log("Server Running on Port 3000")
}) 