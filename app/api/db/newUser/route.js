// route Handler: Store user in mongodb
const { MongoClient, ServerApiVersion } = require('mongodb');

// MongoDB connection string
const uri = `${process.env.MONGODB_URL}`;

// Create a mongo client
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

export async function POST(req, res) {
    // extract and parse user data from front end
    const body = await req.json()
    const userEmail = body.email
    const userPassword = body.password;
    const userFirstName = body.firstName;
    const userLastName = body.lastName

    // run
    try {
        // create user object and store in database
        const user = {
            email: userEmail,
            password:userPassword,
            firstName: userFirstName,
            lastName: userLastName
        }
        // Connect the client to the server	
        await client.connect();
        // connect to database and then to collection
        const db = client.db("ReelBuzzDB").collection("Users")
        // store user to database
        await db.insertOne(user);
        // return success response
        return Response.json({
            status: 201,
            message: "Success, new user created"
        })
    }
    // catch and throw any errors
    catch (err) {
        return Response.json(
            { message: 'Internal Server Error' },
            { status: 500 })
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}