// route Handler: Log user in
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
    try {
        // extract and parse user data from front end
        const body = await req.json();
        const userEmail = body.email;
        const userPassword = body.password;

        // Get all users from database
        await client.connect();// connect the client to the server
        const db = client.db("ReelBuzzDB")// Connect to database and then to collection
        const collection = db.collection("Users")
        const allUsers = await collection.find({}).toArray();// return all users as an array

        // search through user database and find user , if true return status 200 and message,
        if (allUsers.find(obj => obj.email == userEmail && obj.password == userPassword)) {
            return Response.json({
                status: 200,
                message: "User successfully logged in"
            })
        } else {
            return Response.json({
                status: 404,
                message: "User Not Found"
            })
        }
    } catch (error) {
        return Response.json(
            { error: 'Internal Server Error' },
            { status: 500 })
    }
}