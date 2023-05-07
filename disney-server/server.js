const express = require('express'); 
const {MongoClient} = require('mongodb'); 

const app = express(); 
const port = 800; 

const mongoConnect = mongo(); 

const mongo = () => {
    const mongoURL = ''; 
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
    return {
        connect
    }; 
}

app.listen(port, async() => {
    console.log(`Server is now listening on port ${port}`); 

    await mongoConnect.connect(); 

})