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


// middleware?
router.use((req, res, next) => {

    next(); 
}); 


// this is '/search'
router.get('/', async(req, res) => {
    try{
        const {query} = req;

        // character is the query parameter
        // aka will return the character searched for
        const {character} = query;

        const char = await api.getWithQuery(character); 

        const selected = await _selectCharacterPrompt(char); 

        // [selected] not [...selected]
        const result = {
            searchTerm: character, 
            results:[selected] }


        const existSearch = await database.find('searchHistory', character);
        // console.log(existSearch); 

        if(existSearch){ 
            // if the search term exists in the database, update last searched field
            await database.update('searchHistory', character, {lastSearched: new Date()});

        }
        else{
            // if the search term doesn't exist in database, create a new search object
            await database.save('searchHistory', {searchTerm: character, searchCount: result.results.length, lastSearched: new Date()});
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

        const {params} = req;

        const{id} = params; 

        const background = await api.getWithId(id);
        
         // second

         const { searchTerm } = background;

         //finds document in database
         const searchDocument = await database.collection('searches').findOne({searchTerm});
 
        // second part
         if(searchDocument){
             //if there is selction key, add new selection to existing arr
             if(searchDocument.selections){
                 searchDocument.selections.push({id, display: background.title});
 
             }
             else{
                 // if there is no selection key, create a new arr with the new first selection
                 searchDocument.selection = [{id, display: background.title}];
             }
             // update the document in the database with the new selection/s
             await database.collection('searches').updateOne({searchTerm}, {$set: searchDocument});
         }

        // this is good 
        res.json(background); 
    }
    catch(error){
        res.status(500).json(error.toString()); 
    }

});
 

module.exports = router; 