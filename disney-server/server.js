const express = require('express'); 

const app = express(); 
const port = 8888; 

const mongo = require('./db/database'); 

// this is needed in order to handle requests to '/search' 
const search = require('./routes/search.js'); 
app.use('/search', search)

const history = require('./routes/history.js'); 
app.use('/history', history)

app.listen(port, async() => {
    console.log(`Server is now listening on port ${port}`); 

    await mongo.connect(); 

})