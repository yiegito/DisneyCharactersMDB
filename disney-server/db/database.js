const {MongoClient} = require('mongodb');

const config = require('../config.json'); 

const mongo = () => {
    const mongoURL = `mongodb+srv://${config.username}:${config.password}@disneydatabase.ehsdber.mongodb.net/${config.database_name}?retryWrites=true&w=majority`; 
    let database = null; 
    async function connect() {
        try {
            // the database we connect to
            console.log(mongoURL); 
            const client = new MongoClient(mongoURL); 
            // connect
            await client.connect(); 

            // the database will be retrieved from atlas if there is data in there
            database = client.db(); 

            console.log('Connected to MongoDB'); 
        }
        catch(error){
            console.log(error); 
        } 
    }
    async function save(collectionName, data) {
        try {
            const collection = database.collection(collectionName);
            await collection.insertOne(data);
        } catch (error) {
            console.log(error);
        }
    }

    // find the searchTerm in MongoDB
    async function find(collectionName, term){
        try{

            const collection = database.collection(collectionName); 
            if(term){
                // finds the specific object by its search term
                return await collection.find({searchTerm: term}).next();
            }
            else{
                // if not found, then it will return all search terms
                return await collection.find({}).toArray(); 
            }
        }
        catch(error){
            console.log(error); 
        } 
    } 

    async function update(collectionName, term, data) {
        try {
            const collection = database.collection(collectionName);

            await collection.updateOne(
                {searchTerm: term},
                {$set: data}
            );
        } catch (error) {
            console.log(error);
        }
    }


    return {
        connect, 
        save,
        find, 
        update
    }; 
}; 

module.exports = mongo(); 