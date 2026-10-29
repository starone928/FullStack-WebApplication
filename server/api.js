const { MongoClient } = require("mongodb");

const express = require("express");

const cors = require("cors");

const cookieParser = require("cookie-parser");


const app = express();


const connectionString =
    "mongodb://127.0.0.1:27017";


const client =
    new MongoClient(connectionString);



// ==================================================
// Middleware
// ==================================================

app.use(
    cors({
        origin: true,
        credentials: true
    })
);


app.use(
    express.urlencoded({
        extended: true
    })
);


app.use(
    express.json()
);


app.use(
    cookieParser()
);



// ==================================================
// MongoDB Connection
// ==================================================

async function connectDB() {


    try {


        await client.connect();


        console.log(
            "MongoDB Connected"
        );


        const db =
            client.db("smartshopdb");


        return db;

    }


    catch (error) {


        console.log(
            "MongoDB Connection Error:",
            error.message
        );


        process.exit(1);

    }

}



// ==================================================
// GET - Get All Customers
// ==================================================

app.get(
    "/getcustomers",
    async (request, response) => {


        try {


            const db =
                await connectDB();


            const documents =
                await db
                    .collection(
                        "tblcustomers"
                    )
                    .find({})
                    .toArray();


            response
                .status(200)
                .json(documents);

        }


        catch (error) {


            console.log(
                error.message
            );


            response
                .status(500)
                .json({

                    message:
                        "Failed to get customers"

                });

        }

    }
);



// ==================================================
// GET - Check User ID
// ==================================================

app.get(
    "/checkuserid",
    async (request, response) => {


        try {


            const db =
                await connectDB();


            const userId =
                request.query.UserId;


            if (!userId) {


                return response.json({

                    available: false,

                    message: ""

                });

            }


            const customer =
                await db
                    .collection(
                        "tblcustomers"
                    )
                    .findOne({

                        UserId:
                            userId

                    });


            if (customer) {


                return response.json({

                    available: false,

                    message:
                        "User ID already exists"

                });

            }


            response.json({

                available: true,

                message:
                    "User ID available"

            });

        }


        catch (error) {


            console.log(
                error.message
            );


            response
                .status(500)
                .json({

                    available: false,

                    message:
                        "Unable to check User ID"

                });

        }

    }
);



// ==================================================
// GET - Check User Name
// ==================================================

app.get(
    "/checkusername",
    async (request, response) => {


        try {


            const db =
                await connectDB();


            const userName =
                request.query.UserName;


            if (!userName) {


                return response.json({

                    available: false,

                    message: ""

                });

            }


            const customer =
                await db
                    .collection(
                        "tblcustomers"
                    )
                    .findOne({

                        UserName:
                            userName

                    });


            if (customer) {


                return response.json({

                    available: false,

                    message:
                        "User Name already taken"

                });

            }


            response.json({

                available: true,

                message:
                    "User Name available"

            });

        }


        catch (error) {


            console.log(
                error.message
            );


            response
                .status(500)
                .json({

                    available: false,

                    message:
                        "Unable to check User Name"

                });

        }

    }
);



// ==================================================
// GET - Check Email
// ==================================================

app.get(
    "/checkemail",
    async (request, response) => {


        try {


            const db =
                await connectDB();


            const email =
                request.query.Email;


            if (!email) {


                return response.json({

                    available: false,

                    message: ""

                });

            }


            const customer =
                await db
                    .collection(
                        "tblcustomers"
                    )
                    .findOne({

                        Email:
                            email

                    });


            if (customer) {


                return response.json({

                    available: false,

                    message:
                        "Email already registered"

                });

            }


            response.json({

                available: true,

                message:
                    "Email available"

            });

        }


        catch (error) {


            console.log(
                error.message
            );


            response
                .status(500)
                .json({

                    available: false,

                    message:
                        "Unable to check Email"

                });

        }

    }
);



// ==================================================
// GET - Check Mobile
// ==================================================

app.get(
    "/checkmobile",
    async (request, response) => {


        try {


            const db =
                await connectDB();


            const mobile =
                request.query.Mobile;


            if (!mobile) {


                return response.json({

                    available: false,

                    message: ""

                });

            }


            const customer =
                await db
                    .collection(
                        "tblcustomers"
                    )
                    .findOne({

                        Mobile:
                            mobile

                    });


            if (customer) {


                return response.json({

                    available: false,

                    message:
                        "Mobile number already registered"

                });

            }


            response.json({

                available: true,

                message:
                    "Mobile number available"

            });

        }


        catch (error) {


            console.log(
                error.message
            );


            response
                .status(500)
                .json({

                    available: false,

                    message:
                        "Unable to check Mobile"

                });

        }

    }
);



// ==================================================
// POST - Register Customer
// ==================================================

app.post(
    "/registercustomer",
    async (request, response) => {


        try {


            const db =
                await connectDB();


            const UserId =
                request.body.UserId;


            const UserName =
                request.body.UserName;


            const Password =
                request.body.Password;


            const Email =
                request.body.Email;


            const Mobile =
                request.body.Mobile;



            // ==========================================
            // Check User ID
            // ==========================================

            const existingUserId =
                await db
                    .collection(
                        "tblcustomers"
                    )
                    .findOne({

                        UserId:
                            UserId

                    });


            if (existingUserId) {


                return response
                    .status(409)
                    .json({

                        message:
                            "User ID already exists"

                    });

            }



            // ==========================================
            // Check User Name
            // ==========================================

            const existingUserName =
                await db
                    .collection(
                        "tblcustomers"
                    )
                    .findOne({

                        UserName:
                            UserName

                    });


            if (existingUserName) {


                return response
                    .status(409)
                    .json({

                        message:
                            "User Name already taken"

                    });

            }



            // ==========================================
            // Check Email
            // ==========================================

            const existingEmail =
                await db
                    .collection(
                        "tblcustomers"
                    )
                    .findOne({

                        Email:
                            Email

                    });


            if (existingEmail) {


                return response
                    .status(409)
                    .json({

                        message:
                            "Email already registered"

                    });

            }



            // ==========================================
            // Check Mobile
            // ==========================================

            const existingMobile =
                await db
                    .collection(
                        "tblcustomers"
                    )
                    .findOne({

                        Mobile:
                            Mobile

                    });


            if (existingMobile) {


                return response
                    .status(409)
                    .json({

                        message:
                            "Mobile number already registered"

                    });

            }



            // ==========================================
            // Create Customer
            // ==========================================

            const data = {

                UserId:
                    UserId,

                UserName:
                    UserName,

                Password:
                    Password,

                Email:
                    Email,

                Mobile:
                    Mobile

            };



            // ==========================================
            // Insert Customer
            // ==========================================

            const result =
                await db
                    .collection(
                        "tblcustomers"
                    )
                    .insertOne(data);


            console.log(
                "Record Inserted"
            );



            response
                .status(201)
                .json({

                    message:
                        "Customer registered successfully",

                    insertedId:
                        result.insertedId

                });

        }


        catch (error) {


            console.log(
                error.message
            );


            response
                .status(500)
                .json({

                    message:
                        "Failed to register customer"

                });

        }

    }
);



// ==================================================
// POST - Login Customer
// ==================================================

app.post(
    "/login",
    async (request, response) => {


        try {


            const db =
                await connectDB();


            // ==========================================
            // Get Email and Password
            // ==========================================

            const email =
                request.body.Email;


            const password =
                request.body.Password;



            // ==========================================
            // Find Customer
            // ==========================================

            const customer =
                await db
                    .collection(
                        "tblcustomers"
                    )
                    .findOne({

                        Email:
                            email,

                        Password:
                            password

                    });



            // ==========================================
            // Login Failed
            // ==========================================

            if (!customer) {


                return response
                    .status(401)
                    .json({

                        message:
                            "Invalid Email or Password"

                    });

            }



            // ==========================================
            // Create Login Cookie
            // ==========================================

            response.cookie(

                "isLoggedIn",

                "true",

                {

                    httpOnly: true,

                    maxAge:
                        24 *
                        60 *
                        60 *
                        1000,

                    sameSite:
                        "lax"

                }

            );



            // ==========================================
            // Login Successful
            // ==========================================

            response
                .status(200)
                .json({

                    message:
                        "Login successful",

                    customer: {

                        UserId:
                            customer.UserId,

                        UserName:
                            customer.UserName,

                        Email:
                            customer.Email,

                        Mobile:
                            customer.Mobile

                    }

                });

        }


        catch (error) {


            console.log(
                error.message
            );


            response
                .status(500)
                .json({

                    message:
                        "Login failed"

                });

        }

    }
);



// ==================================================
// GET - Authentication Check
// ==================================================

app.get(
    "/auth-check",
    (request, response) => {


        if (
            request.cookies.isLoggedIn ===
            "true"
        ) {


            response
                .status(200)
                .json({

                    loggedIn: true

                });

        }


        else {


            response
                .status(401)
                .json({

                    loggedIn: false

                });

        }

    }
);



// ==================================================
// GET - Sign Out
// ==================================================

app.get(
    "/signout",
    (request, response) => {


        response.clearCookie(
            "isLoggedIn"
        );


        response
            .status(200)
            .json({

                message:
                    "Signed out successfully"

            });

    }
);



// ==================================================
// Start Server
// ==================================================

async function startServer() {


    await connectDB();


    app.listen(
        4400,
        () => {


            console.log(
                "Server Started: http://127.0.0.1:4400"
            );

        }
    );

}


startServer();