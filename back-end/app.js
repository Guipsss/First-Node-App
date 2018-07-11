const express = require('express');
const app = express();
app.use(express.json());

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
 
// Connection URL
const url = 'mongodb://localhost:27017';
 
// Database Name
const dbName = 'myproject';

let data;

const findDocuments = function(db, callback) {
    const collection = db.collection('documents');
    collection.find({}).toArray(function(err, docs) {
        assert.equal(err, null);
        data = docs;
        callback(docs);
    });
}

let insData;
const insertDocuments = function(db, callback) {
    // Get the documents collection
    const collection = db.collection('documents');
    // Insert some documents
    collection.insertOne(insData, function(err, result) {
      assert.equal(err, null);
      console.log("Name inserted");
      callback(result);
    });
}

//app.get('/', (req, res) => res.send('Hello World!'));

app.use(function(req, res, next){
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.get('/', (req, res) => {
    // Use connect method to connect to the server
    MongoClient.connect(url, function(err, client) {
        assert.equal(null, err);
        console.log("Connected successfully to server");
    
        const db = client.db(dbName);

        findDocuments(db, function() {
            res.send(data);
            client.close();
        });
    });
});

app.post('/cadastrar', (req, res) => {
    console.log(req.body.name);
    insData = { name : req.body.name};
    
    MongoClient.connect(url, function(err, client) {
        assert.equal(null, err);
        console.log("Connected successfully to server");
    
        const db = client.db(dbName);

        insertDocuments(db, function(){
            res.send({ status : 'Success'});
            client.close();
        });
    });
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));