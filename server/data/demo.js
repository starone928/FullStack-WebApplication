var fs = require("fs");

console.log("Read Started");

fs.readFile("../data/help.txt", function (err, data) {
    if (!err) {
        console.log(data.toString());
    } else {
        console.log(err);
    }
}
)

console.log("Read Completed");


// The path Module

var path = require("path");

console.log(path.dirname("D\\Images\\pic.jpg"));
console.log(path.basename("D\\Images\\pic.jpg"));
console.log(path.extname("D\\Images\\pic.jpg"));


// The http Module
var http = require("http");

var server = http.createServer(function(req, res){
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end("<h2>Welcome to Node.js</h2>")
});


server.listen(3030);
console.log('Server Listening : http://127.0.0.1:3030');



// connecting mongo db old style
var mongoClient = require("mongodb").MongoClient;

var connectionString = "mongodb://127.0.0.1:27017";

mongoClient.connect(connectionString, function(err, clientObj){
    if(!err){
        console.log(`connected Successfully...`);
    }else{
        console.log(err.message);
    }
})



// connecting mongo db todays style


var mongoClient = require("mongodb").MongoClient;

var connectionString = "mongodb://127.0.0.1:27017";

async function connectDB() {
    try {
        var clientObj = await mongoClient.connect(connectionString);

        console.log("Connected Successfully...");
        var db = clientObj.db("smartshopdb");
        var collection = db.collection("tblproducts");
        console.log("Database: smartshopdb");
        console.log("Collection: tblproducts");
    } catch (err) {
        console.log(err.message);
    }
}

connectDB();




// A Basic GET API

var express = require("express");
var app = express();

app.get('/', function(req, res){
    res.send("<h2>API | Home</h2>");
});

app.get('/products', function(req, res){
    res.send([{'Name': 'TV', 'Price':6000.44}, {'Name':'Mobile', 'Price': 5600.55}]);
});

app.listen(3030);
console.log(`Server Started : http://127.0.0.1:3030`);


// route paramters

var express = require("express");
var app = express();

app.get('/', function(req, res){          // '/' it means bydefault index page will open
    res.send("<h2>API | Home</h2>");
});

app.get('/products', function(req, res){
    res.send([{'Name': 'TV', 'Price':6000.44}, {'Name':'Mobile', 'Price': 5600.55}]);
});

app.get('/details/:id/:name/:price', function(req, res){
    //parameter passing is important as per above sequence //req.params is object which contains all parameter
    res.send(`
        Product Id: ${req.params.id} <br/>         
        Name: ${req.params.name} <br/>
        Price: ${req.params.price}
        `);
});

app.listen(3030);
console.log(`Server Started : http://127.0.0.1:3030`);


//taking data by using API from our mongobd server
//old style output will not display
var express = require("express");
var mongoClient = require("mongodb").MongoClient;
var connectionString = "mongodb://127.0.0.1:27017";
 
var app = express();

app.get('/', function(req, res){
    res.send(`
        <h2>ISHOP - Online Shopping</h2>
        <h3>Requests</h3>
        <ul>
        <li><a href="http://127.0.0.1:3030/products"> GET - Products </a></li>
        </ul>
        `);
});
 
app.get('/products', function(req, res){
  mongoClient.connect(connectionString, function(err, clientObject){
    if(!err) {
      var dbo = clientObject.db("smartshopdb");
      dbo.collection("tblproducts").find().toArray(function(err, documents){
        if(!err) {
          res.send(documents);
        }
      })
    }
  })
});

app.get('/products/:id', function(req, res){
    var productId = parseInt(req.params.id);
    mongoClient.connect(connectionString, function(err, clientObject){
        if(!err){
            var dbo = clientObject.db("smartshopdb");
            dbo.collection("tblproducts").find({id:productId}).toArray(function(err, documents){
                if(!err) {
                    res.send(documents);
                }
            })
        }
    })
});
 
app.listen(3030);
console.log('Server Started : http://127.0.0.1:3030');

//use new style then only output will display
var express = require("express");
var mongoClient = require("mongodb").MongoClient;

var connectionString = "mongodb://127.0.0.1:27017";

var app = express();

app.get("/", function(req, res) {
    res.send(`
        <h2>ISHOP - Online Shopping</h2>
        <ul>
            <li><a href="/products">GET - Products</a></li>
        </ul>
    `);
});


app.get("/products", async function(req, res) {

    try {
        console.log("Products route requested");
        console.log("Trying to connect to MongoDB...");

        var clientObject = await mongoClient.connect(connectionString);

        console.log("MongoDB Connected");

        var dbo = clientObject.db("smartshopdb");

        var documents = await dbo
            .collection("tblproducts")
            .find()
            .toArray();

        console.log("Products found:", documents.length);

        res.send(documents);

        await clientObject.close();

    } catch (err) {

        console.log("ERROR:", err.message);

        res.status(500).send(err.message);
    }
});


app.get("/products/:id", async function(req, res) {

    try {
        var productId = parseInt(req.params.id);

        var clientObject = await mongoClient.connect(connectionString);

        var dbo = clientObject.db("smartshopdb");

        var documents = await dbo
            .collection("tblproducts")
            .find({ id: productId })
            .toArray();

        res.send(documents);

        await clientObject.close();

    } catch (err) {

        res.status(500).send(err.message);
    }
});


app.listen(3030, function() {
    console.log("Server Started: http://127.0.0.1:3030");
});






