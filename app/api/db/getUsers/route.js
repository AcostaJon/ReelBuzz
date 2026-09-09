//route handler: get users from mongodb
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

export async function GET(req, res) {
    // run
    try {
        // Connect the client to the server
        await client.connect();
        // Connect to database and then to collection
        const db = client.db("ReelBuzzDB")
        const collection = db.collection("Users")
        // return all users as an array
        const allUsers = await collection.find({}).toArray();
        return Response.json(allUsers);
    }
    // catch and throw any errors
    catch (err) {
        throw new Error('Failed to connect: ' + err)
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}

