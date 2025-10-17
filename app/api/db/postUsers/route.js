// post users to mongo db
// import mongodb object
const { MongoClient, ServerApiVersion } = require('mongodb');

export async function POST(obj) {
    // extract data passed to post function
    const data = await obj.json();

    // connection string
    const uri = "mongodb+srv://admin:SXHXFgx0uY6huPAU@customers.culx3.mongodb.net/?retryWrites=true&w=majority&appName=Customers";

    // Create a client with the MongoClient object. pass in connection string and options object
    const client = new MongoClient(uri, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    });

    // run
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // connect to database and then to collection
        const db = client.db("Customers")
        const collection = db.collection("Customers")
        // post user object to collection
        await collection.insertOne(data);
        // return success response
        return Response.json("Success, new user created")

    }
    // catch and throw any errors
    catch (err) {
        throw new Error('Failed to connect, ' + err)
    }
}