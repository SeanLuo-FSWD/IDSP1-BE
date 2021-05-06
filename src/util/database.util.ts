import { MongoClient } from "mongodb";

const uri = "const url = 'mongodb://127.0.0.1:27017'";

const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

let _database;

async function connectDB() {
    await client.connect();
    _database = client.db("townsquare");
}

function getDB () {
    return _database; 
}

function _attr() {
    return 123;
}


export { connectDB, getDB, _attr};