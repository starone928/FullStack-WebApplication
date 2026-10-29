var express = require("express");
var mongoClient = require("mongodb").MongoClient;
var cors = require("cors");

var connectionString = "mongodb://127.0.0.1:27017";

var app = express();
app.use(cors());

app.get("/", function (req, res) {
    res.send(`
        <h2>ISHOP - Online Shopping</h2>
        <ul>
            <li><a href="/products">GET - Products</a></li>
        </ul>
    `);
});


app.get("/products", async function (req, res) {

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


app.get("/products/:id", async function (req, res) {

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


app.listen(3030, function () {
    console.log("Server Started: http://127.0.0.1:3030");
});