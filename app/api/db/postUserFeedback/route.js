// route handler: Store user feedback in mongodb
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
    // extract frontend data - user feedback
    const feedback = await req.json();

    // run
    try {
        // Connect the client to the server
        await client.connect();
        // connect to database and then to collection
        const collection = client.db("ReelBuzzDB").collection("Reviews")
        // store user feedback in collection
        await collection.insertOne(feedback);
        // return success response
        return Response.json("Success, new feedback")
    }
    // catch and throw any errors
    catch (err) {
        throw new Error('Failed to connect, ' + err)
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}