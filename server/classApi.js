var mongoClient = require("mongodb").MongoClient;
var express = require("express");
var cors = require("cors");

var connectionString = "mongodb://127.0.0.1:27017";

var app = express();
app.use(cors());

app.use(express.urlencoded({
    extended: true    //it allows to translate the data coming from any client application.
}));
app.use(express.json());



// Creating API Method
// get method for fetching data

app.get('/getcustomers', function (request, response) {
    mongoClient.connect(connectionString, function (err, clientObject) {
        if (!err) {
            var dbo = clientObject.db("smartshopdb");
            dbo.collection("tblcustomers").find().toArray(function (err, document) {
                if (!err) {
                    response.send(documents);
                }
            })
        }
    })
});


//post method for submitting data.


app.post('/registercustomer', function (request, response) {
    mongoClient.connect(connectionString, function (err, clientObject) {
        if (!err) {
            var dbo = clientObject.db("smartshopdb");
            var data = {
                "UserId": request.body.UserId,
                "UserName": request.body.UserName,
                "Password": request.body.Password,
                "Email": request.body.Email,
                "Mobile": request.body.Mobile
            };
            dbo.collection("tblcustomers").insertOne(data, function (err, result) {
                if (!err) {
                    console.log(`Record Inserted`);
                }
            })
        }

    })
});

app.listen(4400);
console.log(`Server Started : http://127.0.0.1:4400` );