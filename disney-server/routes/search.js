const router = require('express').Router(); 

const database = require('../db/database.js');
const api = require('../../disney-api/api.js'); 

 
const _selectCharacterPrompt = async (characters) => {
    if(characters.info.count === 1 ){
        return {display : `${characters.data.name}`, id: characters.data._id}
    }
    else {
        const displayCharacter = characters.data.map((character) => {
            return {display : `${character.name}`, id: character._id}
        });
    // console.log(characters.length); 
        return displayCharacter; 
    }
};



// this is '/search'
router.get('/', async(req, res) => {
    try{
        const {query} = req;
        console.log(query); 

        // character is the query parameter
        // aka will return the character searched for
        const {character} = query;

        const char = await api.getWithQuery(character); 

        const selected = await _selectCharacterPrompt(char); 

        // [selected] not [...selected]
        const result = {
            searchTerm: character, 
            results:[selected]
        }
            
        const dbName = "searchHistory"; 


        const existSearch = await database.find(dbName, character);
        // console.log(existSearch); 

        if(existSearch){ 
            // if the search term exists in the database, update last searched field
            await database.update( dbName, character, {lastSearched: new Date()});

        }
        else{
            // if the search term doesn't exist in database, create a new search object
            await database.save(dbName, {searchTerm: character, searchCount: result.results.length, lastSearched: new Date()});
        }
 
        // gets the search results and responds with json
        res.json(result); 

    }
    catch(error){
        res.status(500).json(error.toString()); 
    }

});


router.get('/:id/details', async(req, res) => {
    try{
        const dbName = "searchHistory"; 
        const {params, query} = req;
        // the character searched for or term
        const {term} = query; 

        const{id} = params; 

        const background = await api.getWithId(id); 
     
        //finds document in database
        const searchDocument = await database.find(dbName, term);

      
        // second part
        if(searchDocument){
            const newObj = {
                id: id,
                display: background.name
            }
            // if there is selction key, add new selection to existing arr
            if(searchDocument.selections){
                // this needs to be fixed...
                await database.update(dbName, term, {selections: [...searchDocument.selections, {id, display: background.name}]}); 
            }
            else{
                // if there is no selection key, create a new arr with the new first selection
                await database.update( dbName, term, {selections: [{id, display : background.name}]});
                  
            }
        }

        // this is good 
        res.json(background); 
    }
    catch(error){
        res.status(500).json(error.toString()); 
    }

});
 

module.exports = router; 