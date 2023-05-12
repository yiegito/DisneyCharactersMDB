const express = require('express'); 
const {MongoClient} = require('mongodb'); 

const config = require('./config.json'); 

const app = express(); 
const port = 8888; 

// this is needed in order to handle requests to '/search' 
const search = require('./routes/search.js'); 
app.use('/search', search)


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
    async function save (collectionName, data){
        try{
            const collection = database.collection(collectionName); 
        }
        catch(error){
            console.log(error); 
        }
    
    }; 

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

    async function update(collectionName, term, data ) {
        try{

        }
        catch(error){
            console.log(error); 
        }

    }

    return {
        connect, 
        save,
        find, update
    }; 
}

const mongoConnect = mongo(); 

app.listen(port, async() => {
    console.log(`Server is now listening on port ${port}`); 

    await mongoConnect.connect(); 

})